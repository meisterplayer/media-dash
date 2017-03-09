# License

I guess we need a different license for this since we're using dashjs.

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
* [optional] **settings** :: *Object*  
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
