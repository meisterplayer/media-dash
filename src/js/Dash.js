import dashjs from 'dashjs';
import { setDashOptions } from './helpers/setDashOptions';
import packageJson from '../../package.json';

class Dash extends Meister.MediaPlugin {
    constructor(config, meister) {
        super(config, meister);

        this.dash = null;
        this.foundBitrates = false;
        this.gotFirstManifest = false;
        this.drmSupportList = [];
        this.hasDrmSupportList = false;
    }

    static get pluginName() {
        return 'Dash';
    }

    static get pluginVersion() {
        return packageJson.version;
    }

    isItemSupported(item) {
        return new Promise((resolve) => {
            if (item.type !== 'dash' && item.type !== 'mpd') {
                return resolve({
                    supported: false,
                    errorCode: Meister.ErrorCodes.WRONG_TYPE,
                });
            }

            if (!window.MediaSource) {
                return resolve({
                    supported: false,
                    errorCode: Meister.ErrorCodes.NOT_SUPPORTED,
                });
            }

            if (item.drm || item.drmConfig) {
                this.meister.one('drmKeySystemSupport', (supportedDRMSystems) => {
                    let supported = false;

                    // Dash supports every DRM system except Fairplay.
                    Object.keys(supportedDRMSystems).forEach((key) => {
                        if (!((key === 'com.apple.fps' && supportedDRMSystems[key]) ||
                        (key === 'com.apple.fps.1_0' && supportedDRMSystems[key]) ||
                        (key === 'com.apple.fps.2_0' && supportedDRMSystems[key]))) {
                            // We're currently not supporting clearkey
                            if (key !== 'org.w3.clearkey' && supportedDRMSystems[key]) {
                                supported = true;
                            }
                        }
                    });

                    return resolve({
                        supported,
                        errorCode: supported ? null : Meister.ErrorCodes.NO_DRM,
                    });
                });

                this.meister.trigger('requestDrmKeySystemSupport', {});
            } else {
                return resolve({
                    supported: true,
                });
            }
        });
    }

    process(item) {
        return new Promise((resolve, reject) => {
            this.player = this.meister.getPlayerByType('html5', item);

            if (this.player) {
                resolve(item);
            } else {
                reject(`${this.name}: Unable to play item ${item.src}, no player available.`);
            }
        });
    }

    load(item) {
        super.load(item);

        return new Promise((resolve) => {
            this.dash = dashjs.MediaPlayer().create(); //eslint-disable-line
            // disable the debug messages
            this.dash.getDebug().setLogToBrowserConsole(false);

            // When enabled, after an ABR up-switch in quality
            this.dash.setFastSwitchEnabled(true);

            // Increase default buffer
            this.dash.setLiveDelayFragmentCount(8);

            // Modify buffer pruning behaviour
            if (this.config.lowMemoryMode) {
                this.dash.setBufferPruningInterval(15);
                this.dash.setBufferTimeAtTopQuality(10);
                this.dash.setBufferTimeAtTopQualityLongForm(10);
                this.dash.setBufferToKeep(10);
            }

            // override settings with user based settings.
            if (this.config.settings) {
                setDashOptions(this.name, this.dash, this.config.settings);
            }

            // Items options alway overrule the config settings
            if (item.startFromLive) {

                // This puts the delay as close to the edge as possible.
                this.dash.setLiveDelayFragmentCount(0);
            }

            this.on('requestGoLive', this.goLive.bind(this));
            this.on('requestSeek', this.onRequestSeek.bind(this));
            this.on('_playerTimeUpdate', this._onPlayerTimeUpdate.bind(this));
            this.on('_playerSeek', this._onPlayerSeek.bind(this));
            this.on('requestBitrate', this.onRequestBitrate.bind(this));

            this.dash.on(dashjs.MediaPlayer.events.MANIFEST_LOADED, this.onManifestLoaded.bind(this)); //eslint-disable-line
            this.dash.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, this.onStreamInitialized.bind(this)); //eslint-disable-line
            this.dash.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_RENDERED, this.onQualityChanged.bind(this)); //eslint-disable-line
            this.dash.on(dashjs.MediaPlayer.events.ERROR, this.onError.bind(this)); //eslint-disable-line

            this.dash.on(dashjs.MediaPlayer.events.METRIC_ADDED, (e) => { //eslint-disable-line
                if (e.metric === 'HttpList' && e.value.type === 'MPD' && !this.gotFirstManifest) {
                    this.gotFirstManifest = true;
                    this.meister.trigger('showLoading', {
                        code: 'VIDEO_ACQUIRING_MANIFEST',
                    });
                }
            });

            this.didBeginSeek = false;

            // this.meister.playerPlugin.mediaElement.addEventListener
            this.on('playerLoadedMetadata', () => {
                if (!item.startFromBeginning || this.didBeginSeek) return;

                this.didBeginSeek = true;
                this.meister.trigger('requestSeek', {
                    relativePosition: 0,
                });
            });

            this.dash.initialize(this.player.mediaElement, item.src, false);

            this.one('playerPlay', () => {
                this.dash.pause();
                this.dash.play();
            });

            // Handle autplay
            this.one('requestPlay', () => {
                this.dash.play();
            });

            resolve();
        });
    }

    unload() {
        super.unload();
        this.gotFirstManifest = false;
        if (this.dash) this.dash.reset();
        this.foundBitrates = false;
        this.drmSupportList = [];
        this.hasDrmSupportList = false;
    }

    _onPlayerTimeUpdate() {
        let currentTime = this.dash.time();
        currentTime = currentTime < 0 ? 0 : currentTime;

        this.meister.trigger('playerTimeUpdate', {
            currentTime,
            duration: this.dash.duration(),
        });
    }

    _onPlayerSeek() {
        const currentTime = this.dash.time();
        const duration = this.dash.duration();
        const relativePosition = currentTime / duration;

        this.meister.trigger('playerSeek', {
            relativePosition,
            currentTime,
            duration,
        });
    }

    onError(event) {
        if (event.error === 'download') {
            // Make sure we are paused when we throw an error from a fragment.
            this.meister.error('Could not download fragment after retry\'s', 'DSH-0001');
            this.meister.pause();
        }
    }

    onManifestLoaded(manifestEvent) {
        if (!manifestEvent.data) return;

        // Extract time info
        let isLive = false;
        let hasDVR = false;
        let duration = manifestEvent.data.mediaPresentationDuration;

        if (!duration) {
            isLive = true;
        }

        if (manifestEvent.data.timeShiftBufferDepth > this.config.dvrThreshold) {
            // Store liveSync delay for later use
            this.liveSyncDelay = manifestEvent.data.minBufferTime;

            hasDVR = true;
            duration = manifestEvent.data.timeShiftBufferDepth;
        }

        // Make sure the user wants a DVR enabled stream.
        if (!this.config.dvrEnabled) {
            hasDVR = false;
        }

        this.meister.trigger('itemTimeInfo', {
            isLive,
            hasDVR,
            duration,
        });

        // Retrieve then KID from the manifestEvent.
        const adaptationSet = manifestEvent.data.Period.AdaptationSet;
        let kid = null;
        let contentProtection = null;

        // Make sure we got an AdaptationSet
        if (adaptationSet.ContentProtection) {
            contentProtection = adaptationSet.ContentProtection;
        } else {
            if (!adaptationSet.length) return;
            if (!adaptationSet[0].ContentProtection) return;

            contentProtection = adaptationSet[0].ContentProtection;
        }

        // Search for the default KID.
        for (let i = 0; i < contentProtection.length; i++) {
            const protection = contentProtection[i];

            if (!protection['cenc:default_KID']) continue; //eslint-disable-line

            kid = protection['cenc:default_KID'];
        }

        if (kid) {
            this.meister.trigger('drmKidAvailable', kid);
        }

        if (!this.hasDrmSupportList) {
            for (const protection of contentProtection) {
                // Is the scheme Widevine?
                if (protection.schemeIdUri === 'urn:uuid:EDEF8BA9-79D6-4ACE-A3C8-27DCD51D21ED') {
                    this.drmSupportList.push('com.widevine.alpha');
                } else if (protection.schemeIdUri === 'urn:uuid:9A04F079-9840-4286-AB92-E65BE0885F95') {
                    this.drmSupportList.push('com.microsoft.playready');
                }
            }
        }

        if (this.drmSupportList.length && !this.hasDrmSupportList) {
            this.hasDrmSupportList = true;
            this.meister.trigger('drmSupportedListAvailable', this.drmSupportList);
        }
    }

    onStreamInitialized() {
        // No need to rebroadcast bitrates.
        if (this.foundBitrates) return;

        const dashBitrates = this.dash.getBitrateInfoListFor('video');
        const bitrates = [];

        // Bitrate 0 means auto quality.
        bitrates.push({
            bitrate: 0,
            index: -1,
        });

        for (let i = 0; i < dashBitrates.length; i++) {
            const bitrate = dashBitrates[i];
            bitrates.push({
                bitrate: bitrate.bitrate,
                index: bitrate.qualityIndex,
            });
        }

        this.meister.trigger('itemBitrates', {
            bitrates,
            currentIndex: -1,
        });

        this.foundBitrates = true;
    }

    onQualityChanged(e) {
        if (e.mediaType !== 'video') return;

        const bitrateIndex = e.newQuality;
        const bitrates = this.dash.getBitrateInfoListFor('video');

        const newBitrate = bitrates.find((item) => item.qualityIndex === bitrateIndex);

        this.meister.trigger('playerAutoSwitchBitrate', {
            newBitrate: newBitrate.bitrate,
            newBitrateIndex: bitrateIndex,
        });
    }

    onRequestBitrate(e) {
        // -1 is for automatic switching.
        if (e.bitrateIndex === -1) {
            this.dash.setAutoSwitchQualityFor('video', true);
            // No need to broadcast switch to auto.
            return;
        }

        this.dash.setAutoSwitchQualityFor('video', false);
        this.dash.setQualityFor('video', e.bitrateIndex);

        let newBitrate = 0;
        const bitrates = this.dash.getBitrateInfoListFor('video');
        for (let i = 0; i < bitrates.length; i++) {
            if (e.bitrateIndex === bitrates[i].qualityIndex) {
                newBitrate = bitrates[i].bitrate;
                break;
            }
        }

        this.meister.trigger('playerSwitchBitrate', {
            newBitrate,
            newBitrateIndex: e.bitrateIndex,
        });
    }

    onRequestSeek(e) {
        let targetTime;

        if (Number.isFinite(e.relativePosition)) {
            targetTime = e.relativePosition * this.dash.duration();
        } else if (Number.isFinite(e.timeOffset)) {
            targetTime = this.dash.time() + e.timeOffset;
        } else if (Number.isFinite(e.targetTime)) {
            targetTime = e.targetTime;
        }

        // Check whether we are allowed to seek forward.
        if (!e.forcedStart && this.blockSeekForward && targetTime > this.dash.time()) { return; }

        if (Number.isFinite(targetTime)) {
            this.dash.seek(targetTime);
        }
    }

    goLive() {
        const duration = this.dash.duration();
        const liveTime = duration - 30;

        this.meister.currentTime = this.dash.getDVRSeekOffset(liveTime);
    }
}

Meister.registerPlugin(Dash.pluginName, Dash);
Meister.registerPlugin('dash', Dash);

export default Dash;
