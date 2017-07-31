import '@meisterplayer/meister-mock';
import Dash from '../src/js/Dash';

const PLUGIN_NAME = 'Dash';
const SUPPORTED_TYPES = ['dash', 'mpd'];

describe('Dash class', () => {
    test(`pluginName should be ${PLUGIN_NAME}`, () => {
        expect(Dash.pluginName).toBe(PLUGIN_NAME);
    });

    test('pluginVersion should return a version string', () => {
        // Version should match the SemVer pattern (e.g. 2.11.9)
        expect(Dash.pluginVersion).toMatch(/\d+\.\d+\.\d+/);
    });
});

describe('The rest of the test suite', () => {
    test('It should be written', () => {
        const test = { testsWritten: false };

        expect(test).toEqual({ testsWritten: true });
    });
});
