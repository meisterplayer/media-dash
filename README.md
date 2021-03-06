# Dash Plugin #

A plugin for the Meister.js video player that allows playback of DASH streams.

### How do I get set up? ###

When initializing the player add `dash` with it's own configuration to the configuration object.

```JavaScript
var player = new Meister("#querySelector", {
    dash: {
        lowMemoryMode: false,
        dvrEnabled: true,
        dvrThreshold: 300,
        settings: {
            liveDelayFragmentCount: 8,
            stableBufferTime: 30,
        }
    }
});
```

### Configuration ###

Options are required unless marked as [optional]. For more detailed information on the various dashjs settings please refer to the official dashjs [documentation](http://cdn.dashjs.org/latest/jsdoc/module-MediaPlayer.html).

* [optional] **lowMemoryMode** :: *Boolean*  
    A special preset of settings that allow for smoother playback on lower memory devices. Defaults to false.
* [optional] **dvrEnabled** :: *Boolean*  
    Allow use of the DVR window if one is present. By passing false all streams are considered as just livestreams. Defaults to true.
* [optional] **dvrThreshold** :: *Number*  
    Content with a window longer than this threshold is considered as having a DVR window. Defaults to 300 (5 minutes).
* [optional] ***Deprecated!*** **settings** :: *Object*  
    Settings for the internal dashjs object. These values are applied last, so they will override any presets from the lowMemoryMode.
    * [optional] **abandonLoadTimeout** :: *Number*  
        See [docs](http://cdn.dashjs.org/latest/jsdoc/module-MediaPlayer.html#setAbandonLoadTimeout__anchor).
    * [optional] **bandwidthSafetyFactor** :: *Number*  
        See [docs](http://cdn.dashjs.org/latest/jsdoc/module-MediaPlayer.html#setBandwidthSafetyFactor__anchor).
    * [optional] **bufferPruningInterval** :: *Number*  
        See [docs](http://cdn.dashjs.org/latest/jsdoc/module-MediaPlayer.html#setBufferPruningInterval__anchor).
    * [optional] **bufferTimeAtTopQuality** :: *Number*  
        See [docs](http://cdn.dashjs.org/latest/jsdoc/module-MediaPlayer.html#setBufferTimeAtTopQuality__anchor).
    * [optional] **bufferTimeAtTopQualityLongForm** :: *Number*  
        See [docs](http://cdn.dashjs.org/latest/jsdoc/module-MediaPlayer.html#setBufferTimeAtTopQualityLongForm__anchor).
    * [optional] **bufferToKeep** :: *Number*  
        See [docs](http://cdn.dashjs.org/latest/jsdoc/module-MediaPlayer.html#setBufferToKeep__anchor).
    * [optional] **fastSwitchEnabled** :: *Boolean*  
        See [docs](http://cdn.dashjs.org/latest/jsdoc/module-MediaPlayer.html#setFastSwitchEnabled__anchor).
    * [optional] **fragmentLoaderRetryAttempts** :: *Number*  
        See [docs](http://cdn.dashjs.org/latest/jsdoc/module-MediaPlayer.html#setFragmentLoaderRetryAttempts__anchor).
    * [optional] **fragmentLoaderRetryInterval** :: *Number*  
        See [docs](http://cdn.dashjs.org/latest/jsdoc/module-MediaPlayer.html#setFragmentLoaderRetryInterval__anchor).
    * [optional] **liveDelay** :: *Number*  
        See [docs](http://cdn.dashjs.org/latest/jsdoc/module-MediaPlayer.html#setLiveDelay__anchor).
    * [optional] **liveDelayFragmentCount** :: *Number*  
        See [docs](http://cdn.dashjs.org/latest/jsdoc/module-MediaPlayer.html#setLiveDelayFragmentCount__anchor).
    * [optional] **longFormContentDurationThreshold** :: *Number*  
        See [docs](http://cdn.dashjs.org/latest/jsdoc/module-MediaPlayer.html#setLongFormContentDurationThreshold__anchor).
    * [optional] **richBufferThreshold** :: *Number*  
        See [docs](http://cdn.dashjs.org/latest/jsdoc/module-MediaPlayer.html#setRichBufferThreshold__anchor).
    * [optional] **stableBufferTime** :: *Number*  
        See [docs](http://cdn.dashjs.org/latest/jsdoc/module-MediaPlayer.html#setStableBufferTime__anchor).
    * [optional] **useSuggestedPresentationDelay** :: *Boolean*  
        See [docs](http://cdn.dashjs.org/latest/jsdoc/module-MediaPlayer.html#useSuggestedPresentationDelay__anchor).
* [optional] **onDashInitialized** :: *Function<dashjs>*  
    Callback called when a dash.js instance has been initialized. The function is called with the dash.js instance as the only argument. This will eventually replace the settings object as this provides more direct access. See the Dash.js [docs](http://cdn.dashjs.org/latest/jsdoc/module-MediaPlayer.html) for more information on the various settings.

Item options
------------

The following options can be added per item

### startFromLive *[Boolean]* (default: false) ###

Start from the live edge this will bring the player as close as possible to the live edge.

``` JavaScript
meisterPlayer.setItem({
    src: 'https://example.com/secure/stream/manifest.mpd',
    startFromLive: true,
    type: 'mpd'
});
```

### startFromBeginning *[Boolean|Object]* (default: false) ###

Start from the beginning of the live stream. (VOD streams will always begin from the beginning).

``` JavaScript
meisterPlayer.setItem({
    src: 'https://example.com/secure/stream/manifest.mpd',
    startFromBeginning: true,
    type: 'mpd'
});
```

Or you can give an object with an offset to start from a offset

``` JavaScript
meisterPlayer.setItem({
    src: 'https://example.com/secure/stream/manifest.mpd',
    startFromBeginning: {
        offset: 10, // Start from the "beginning" with an offset of 10 seconds
    },
    type: 'mpd'
});
```
