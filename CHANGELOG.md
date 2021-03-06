# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [5.8.0](https://github.com/meisterplayer/media-dash/compare/v5.7.3...v5.8.0) (2019-06-25)


### Bug Fixes

* **time:** Correctly report live status and DVR window for more streams ([5ec7fc0](https://github.com/meisterplayer/media-dash/commit/5ec7fc0))


### Features

* **config:** Make dash.js instance available for configuration ([ee96cd7](https://github.com/meisterplayer/media-dash/commit/ee96cd7))



### [5.7.3](https://github.com/meisterplayer/media-dash/compare/v5.7.2...v5.7.3) (2019-06-04)


### Bug Fixes

* **live:** Remove arbitrary 30 second buffer when seeking to live ([193ef6f](https://github.com/meisterplayer/media-dash/commit/193ef6f))



<a name="5.7.2"></a>
## [5.7.2](https://github.com/meisterplayer/media-dash/compare/v5.7.1...v5.7.2) (2018-12-17)


### Bug Fixes

* **playback:** Remove redundant pause/play call on playerplay ([503d7d4](https://github.com/meisterplayer/media-dash/commit/503d7d4))



<a name="5.7.1"></a>
## [5.7.1](https://github.com/meisterplayer/media-dash/compare/v5.7.0...v5.7.1) (2018-02-07)


### Bug Fixes

* **ads:** Fix issue where initialising dash before load() would result in a 404 error ([e9af800](https://github.com/meisterplayer/media-dash/commit/e9af800))



<a name="5.7.0"></a>
# [5.7.0](https://github.com/meisterplayer/media-dash/compare/v5.6.0...v5.7.0) (2018-02-05)


### Features

* **dash:** Downgrade back to 2.4.1 due to issues with live content ([a3ecfb2](https://github.com/meisterplayer/media-dash/commit/a3ecfb2))



<a name="5.6.0"></a>
# [5.6.0](https://github.com/meisterplayer/media-dash/compare/v5.5.1...v5.6.0) (2018-02-05)


### Features

* **drm:** Extract DRM info from the manifest ([5688a13](https://github.com/meisterplayer/media-dash/commit/5688a13))



<a name="5.5.1"></a>
## [5.5.1](https://github.com/meisterplayer/media-dash/compare/v5.5.0...v5.5.1) (2017-11-30)


### Features

* **localization:** Add localization ([c13a7c7](https://github.com/meisterplayer/media-dash/commit/c13a7c7))



<a name="5.5.0"></a>
# [5.5.0](https://github.com/meisterplayer/media-dash/compare/v5.4.0...v5.5.0) (2017-10-02)


### Features

* **dashjs:** Update dashjs to v2.6.0 ([09518eb](https://github.com/meisterplayer/media-dash/commit/09518eb))
* **playback:** Add flag to enable experimental Smooth support ([fa67809](https://github.com/meisterplayer/media-dash/commit/fa67809))



<a name="5.4.0"></a>
# [5.4.0](https://github.com/meisterplayer/media-dash/compare/v5.3.0...v5.4.0) (2017-08-21)


### Bug Fixes

* **startFromBeginning:** Fix issue where startFromBeginning was not correctly triggered ([62e9797](https://github.com/meisterplayer/media-dash/commit/62e9797))


### Features

* **startFromBeginning:** Add option to set an offset to the startFromBeginning property ([64b78a2](https://github.com/meisterplayer/media-dash/commit/64b78a2))



<a name="5.3.0"></a>
# [5.3.0](https://github.com/meisterplayer/media-dash/compare/v5.2.0...v5.3.0) (2017-07-13)


### Features

* **time:** Add duration and currentTime property accessors ([ef49656](https://github.com/meisterplayer/media-dash/commit/ef49656))



<a name="5.2.0"></a>
# [5.2.0](https://github.com/meisterplayer/media-dash/compare/v5.1.1...v5.2.0) (2017-06-27)


### Features

* **pluginVersion:** Add pluginVersion to class ([9dd58d3](https://github.com/meisterplayer/media-dash/commit/9dd58d3))



<a name="5.1.1"></a>
## [5.1.1](https://github.com/meisterplayer/media-dash/compare/v5.1.0...v5.1.1) (2017-06-21)


### Bug Fixes

* **startFromBeginning:** Fix issue where startFromBeginning was always triggered ([2b21ad2](https://github.com/meisterplayer/media-dash/commit/2b21ad2))



<a name="5.1.0"></a>
# [5.1.0](https://github.com/meisterplayer/media-dash/compare/v5.0.1...v5.1.0) (2017-06-20)


### Features

* **error:** Throw error when fragment download errors occurs ([aff285f](https://github.com/meisterplayer/media-dash/commit/aff285f))
* **item:** add startFromLive and startFromBeginning ([9db5769](https://github.com/meisterplayer/media-dash/commit/9db5769))
