function checkRange(number, min, max) {
    if (number < min) { return false; }
    if (number > max) { return false; }
    return true;
}

export function setDashOptions(name, dashjs, options = {}) {
    if (!dashjs) {
        throw new Error('Dashjs instance is required.');
    }

    const {
        abandonLoadTimeout,
        bandwidthSafetyFactor,
        bufferPruningInterval,
        bufferTimeAtTopQuality,
        bufferTimeAtTopQualityLongForm,
        bufferToKeep,
        fastSwitchEnabled,
        fragmentLoaderRetryAttempts,
        fragmentLoaderRetryInterval,
        liveDelay,
        liveDelayFragmentCount,
        longFormContentDurationThreshold,
        richBufferThreshold,
        stableBufferTime,
        useSuggestedPresentationDelay,
    } = options;

    if (Number.isFinite(abandonLoadTimeout)) {
        if (abandonLoadTimeout > 0) {
            dashjs.setAbandonLoadTimeout(abandonLoadTimeout);
        } else {
            console.error(`${name}: incorrect abandonLoadTimeout. Please use a number in seconds higher than 0.`);
        }
    }

    if (Number.isFinite(bandwidthSafetyFactor)) {
        if (checkRange(bandwidthSafetyFactor, 0, 1)) {
            dashjs.setBandwidthSafetyFactor(bandwidthSafetyFactor);
        } else {
            console.error(`${name}: incorrect bandwidthSafetyFactor. Please use a percentage between 0.0 and 1.`);
        }
    }

    if (Number.isFinite(bufferPruningInterval)) {
        if (bufferPruningInterval > 0) {
            dashjs.setBufferPruningInterval(bufferPruningInterval);
        } else {
            console.error(`${name}: incorrect bufferPruningInterval. Please use a number in seconds higher than 0.`);
        }
    }

    if (Number.isFinite(bufferTimeAtTopQuality)) {
        if (bufferTimeAtTopQuality > 0) {
            dashjs.setBufferTimeAtTopQuality(bufferTimeAtTopQuality);
        } else {
            console.error(`${name}: incorrect bufferTimeAtTopQuality. Please use a number in seconds higher than 0.`);
        }
    }

    if (Number.isFinite(bufferTimeAtTopQualityLongForm)) {
        if (bufferTimeAtTopQualityLongForm > 0) {
            dashjs.setBufferTimeAtTopQualityLongForm(bufferTimeAtTopQualityLongForm);
        } else {
            console.error(`${name}: incorrect bufferTimeAtTopQualityLongForm. Please use a number in seconds higher than 0.`);
        }
    }

    if (Number.isFinite(bufferToKeep)) {
        if (bufferToKeep > 0) {
            dashjs.setBufferToKeep(bufferToKeep);
        } else {
            console.error(`${name}: incorrect bufferToKeep. Please use a number in seconds higher than 0.`);
        }
    }

    if (fastSwitchEnabled) {
        dashjs.setFastSwitchEnabled(!!fastSwitchEnabled);
    }

    if (Number.isFinite(fragmentLoaderRetryAttempts)) {
        if (fragmentLoaderRetryAttempts > 0) {
            dashjs.setFragmentLoaderRetryAttempts(fragmentLoaderRetryAttempts);
        } else {
            console.error(`${name}: incorrect fragmentLoaderRetryAttempts. Please use a number in seconds higher than 0.`);
        }
    }

    if (Number.isFinite(fragmentLoaderRetryInterval)) {
        if (fragmentLoaderRetryInterval > 0) {
            dashjs.setFragmentLoaderRetryInterval(fragmentLoaderRetryInterval);
        } else {
            console.error(`${name}: incorrect fragmentLoaderRetryInterval. Please use a number in milliseconds higher than 0.`);
        }
    }

    if (Number.isFinite(liveDelay)) {
        if (liveDelay > 0) {
            dashjs.setLiveDelay(liveDelay);
        } else {
            console.error(`${name}: incorrect liveDelay. Please use a number in seconds higher than 0.`);
        }
    }

    if (Number.isFinite(liveDelayFragmentCount)) {
        if (liveDelayFragmentCount > 0) {
            dashjs.setLiveDelayFragmentCount(liveDelayFragmentCount);
        } else {
            console.error(`${name}: incorrect liveDelayFragmentCount. Please use a number higher than 0.`);
        }
    }

    if (Number.isFinite(longFormContentDurationThreshold)) {
        if (longFormContentDurationThreshold > 0) {
            dashjs.setLongFormContentDurationThreshold(longFormContentDurationThreshold);
        } else {
            console.error(`${name}: incorrect longFormContentDurationThreshold. Please use a number in seconds higher than 0.`);
        }
    }

    if (Number.isFinite(richBufferThreshold)) {
        if (richBufferThreshold > 0) {
            dashjs.setRichBufferThreshold(richBufferThreshold);
        } else {
            console.error(`${name}: incorrect richBufferThreshold. Please use a number in seconds higher than 0.`);
        }
    }

    if (Number.isFinite(stableBufferTime)) {
        if (stableBufferTime > 0) {
            dashjs.setStableBufferTime(stableBufferTime);
        } else {
            console.error(`${name}: incorrect stableBufferTime. Please use a number in seconds higher than 0.`);
        }
    }

    if (useSuggestedPresentationDelay) {
        dashjs.useSuggestedPresentationDelay(!!useSuggestedPresentationDelay);
    }
}

export default setDashOptions;
