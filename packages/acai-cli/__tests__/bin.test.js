const execa = require('execa');
const acai = require('../bin');

jest.mock('@berries/acai', () => {
    return new Promise(resolve => {
        resolve({
            fixes: [],
            hotspots: []
        });
    });
});

describe('@berries/acai-cli/cli', () => {
    test('should throw if execution path is not a git repository', () => {
        expect(async () => await execa(acai)).toThrow();
    });

    test('should perform a scan on the directory executed in', async () => {
        const cwd = 'mocked git repository';
        expect(await execa(acai, { cwd }));
    });

    test('prints the results in human readable form as default', () => {});

    describe('--help', () => {
        test('should print all available options', () => {});
    });

    describe('--cwd', () => {
        test('should only take a string', () => {});

        test('throws of the given directory does not exist', () => {});

        test('should throw if configured directory is not a git repository', () => {});

        test('can be configured with the execution directory', () => {});
    });
});
