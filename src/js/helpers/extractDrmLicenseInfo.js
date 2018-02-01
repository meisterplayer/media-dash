import { WIDEVINE_SCHEME_URI, PLAYREADY_SCHEME_URI } from '../constants';
import isDeviceControlCharacter from './isDeviceControlCharacter';

/**
 * Extracts the widevine license info.
 *
 * @param {object} widevineContentProtection
 * @returns {object}
 */
function extractWidevineLicenseInfo(widevineContentProtection) {
    const result = {
        drmServerUrl: null,
        kid: null,
    };

    if (widevineContentProtection.laurl && widevineContentProtection.laurl.licenseUrl) {
        result.drmServerUrl = widevineContentProtection.laurl.licenseUrl;
    }

    if (widevineContentProtection.KID || widevineContentProtection['cenc:default_KID']) {
        result.kid = widevineContentProtection.KID || widevineContentProtection['cenc:default_KID'];
    }

    return result;
}

/**
 * Extracts the PlayReady license info.
 *
 * @param {object} playreadyContentProtection
 * @returns
 */
function extractPlayreadyLicenseInfo(playreadyContentProtection) {
    const result = {
        drmServerUrl: null,
        kid: null,
    };

    if (playreadyContentProtection.pro && playreadyContentProtection.pro.__text) {
        const protectionInfo = window.atob(playreadyContentProtection.pro.__text);
        let filteredProtectionInfo = protectionInfo.substring(protectionInfo.indexOf('<'));
        filteredProtectionInfo = filteredProtectionInfo.split('').filter(char => !isDeviceControlCharacter(char.charCodeAt(0))).join('');

        const parser = new DOMParser();
        const parsedProtectionInfo = parser.parseFromString(filteredProtectionInfo, 'text/xml');

        const laURLElem = parsedProtectionInfo.getElementsByTagName('LA_URL');
        const kidElem = parsedProtectionInfo.getElementsByTagName('KID');

        if (laURLElem.length && laURLElem[0]) {
            result.drmServerUrl = laURLElem[0].textContent;
        }

        if (kidElem.length && kidElem[0]) {
            result.kid = kidElem[0].textContent;
        }
    }

    return result;
}

/**
 * Converst content protection uris to a standard we can use.
 *
 * @param {string} uri
 */
function getFormattedUri(uri) {
    // Make sure the urn:uuid: is also the same.
    const uppercasedUri = uri.toUpperCase();
    const uuid = uppercasedUri.replace('URN:UUID:', '');

    return `urn:uuid:${uuid}`;
}

/**
 * Extracts drm license info
 *
 * @export
 * @param {Array} contentProtections
 */
export default function extractDrmLicenseInfo(contentProtections) {
    const result = {
        playready: null,
        widevine: null,
    };

    contentProtections.forEach((contentProtection) => {
        if (getFormattedUri(contentProtection.schemeIdUri) === WIDEVINE_SCHEME_URI) {
            result.widevine = extractWidevineLicenseInfo(contentProtection);
        } else if (getFormattedUri(contentProtection.schemeIdUri) === PLAYREADY_SCHEME_URI) {
            result.playready = extractPlayreadyLicenseInfo(contentProtection);
        }
    });

    return result;
}
