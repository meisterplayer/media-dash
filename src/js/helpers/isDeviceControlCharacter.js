const DEVICE_CONTROL_CHARACTER_START = 0;
const DEVICE_CONTROL_CHARACTER_END = 31;

/**
 * Checks if the character code is a device control character.
 *
 * @export
 * @param {number} characterCode
 * @returns {boolean}
 */
export default function isDeviceControlCharacter(characterCode) {
    return (characterCode >= DEVICE_CONTROL_CHARACTER_START && characterCode <= DEVICE_CONTROL_CHARACTER_END);
}
