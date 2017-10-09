import '@meisterplayer/meister-mock';
import Dash from '../src/js/Dash';

const PLUGIN_NAME = 'Dash';
const TEST_TYPES_DEFAULT = [
    { type: 'mpd', supported: true },
    { type: 'dash', supported: true },
    { type: 'smooth', supported: false },
    { type: 'mss', supported: false },
    { type: 'random', supported: false },
];

const TEST_TYPES_SMOOTH = TEST_TYPES_DEFAULT.map(({ type, supported }) => {
    let newSupported = supported;
    if (type === 'smooth' || type === 'mss') {
        newSupported = true;
    }

    return { type, supported: newSupported };
});

describe('Dash class', () => {
    test(`pluginName should be ${PLUGIN_NAME}`, () => {
        expect(Dash.pluginName).toBe(PLUGIN_NAME);
    });

    test('pluginVersion should return a version string', () => {
        // Version should match the SemVer pattern (e.g. 2.11.9)
        expect(Dash.pluginVersion).toMatch(/\d+\.\d+\.\d+/);
    });
});

describe('Dash', () => {
    let getPlayerByTypeMock;
    let triggerMock;
    let oneMock;
    let meisterInstanceMock;
    let dashConfigMock;

    let PLAYER_MOCK;
    let ITEM_MOCK;

    const SRC_STUB = 'https://stream_example.com/dash';
    const TYPE_STUB = 'dash';

    let dash;

    beforeEach(() => {
        getPlayerByTypeMock = jest.fn();
        triggerMock = jest.fn();
        oneMock = jest.fn();

        meisterInstanceMock = {
            getPlayerByType: getPlayerByTypeMock,
            trigger: triggerMock,
        };

        dashConfigMock = {};
        PLAYER_MOCK = {};
        ITEM_MOCK = { type: TYPE_STUB, src: SRC_STUB };

        global.Meister.MediaPlugin.prototype.one = oneMock;

        dash = new Dash(dashConfigMock, meisterInstanceMock);
    });

    describe('isItemSupported', () => {
        describe('without mediaSource default configuration', () => {
            TEST_TYPES_DEFAULT.forEach((typeObject) => {
                test(`It should resolve ${typeObject.type} items with supported: false`, async () => {
                    const ITEM_STUB = { src: SRC_STUB, type: typeObject.type };

                    const result = dash.isItemSupported(ITEM_STUB);
                    await expect(result).resolves.toEqual({
                        supported: false,
                    });
                });
            });
        });

        describe('with mediaSource', () => {
            beforeEach(() => {
                global.MediaSource = true;
            });

            afterEach(() => {
                delete global.MediaSource;
            });

            describe('default configuration', () => {
                TEST_TYPES_DEFAULT.forEach((typeObject) => {
                    test(`It should resolve ${typeObject.type} items with supported: ${typeObject.supported}`, async () => {
                        const ITEM_STUB = { src: SRC_STUB, type: typeObject.type };

                        const result = dash.isItemSupported(ITEM_STUB);
                        await expect(result).resolves.toEqual({
                            supported: typeObject.supported,
                        });
                    });
                });
            });

            describe('Smooth enabled', () => {
                beforeEach(() => {
                    dashConfigMock = {
                        enableSmooth: true,
                    };

                    dash = new Dash(dashConfigMock, meisterInstanceMock);
                });
                TEST_TYPES_SMOOTH.forEach((typeObject) => {
                    test(`It should resolve ${typeObject.type} items with supported: ${typeObject.supported}`, async () => {
                        const ITEM_STUB = { src: SRC_STUB, type: typeObject.type };

                        const result = dash.isItemSupported(ITEM_STUB);
                        await expect(result).resolves.toEqual({
                            supported: typeObject.supported,
                        });
                    });
                });
            });
        });
    });
});
