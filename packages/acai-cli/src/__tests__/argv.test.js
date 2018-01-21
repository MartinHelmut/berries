'use strict';

const argv = require('../argv');

describe('argv', () => {
    describe('getConfiguredArgv()', () => {
        test('returns a configuration object', () => {
            const options = argv();
            expect(options).toEqual(
                expect.objectContaining({
                    help: expect.any(Boolean),
                    version: expect.any(Boolean)
                })
            );
        });

        test('"cwd" option is defined', () => {
            expect(argv('--cwd="foo/path"').cwd).toBe('foo/path');
        });

        test('"format" option defines a default', () => {
            expect(argv().format).toBe('human');
        });
    });
});
