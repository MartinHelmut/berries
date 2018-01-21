// const execa = require('execa');
// const acai = require('../bin');

jest.mock('@berries/acai', () => {
    return new Promise(resolve => {
        resolve({
            fixes: [],
            hotspots: []
        });
    });
});

describe('@berries/acai-cli/cli', () => {
    test('foo', () => expect(true).toBe(true));
});
