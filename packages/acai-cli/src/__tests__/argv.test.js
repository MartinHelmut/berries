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

        test('"cwd" option can be defined', () => {
            expect(argv('--cwd="foo/path"').cwd).toBe('foo/path');
        });

        test('"cwd" option can be defined by shortcut "d"', () => {
            expect(argv('-d="foo/path"').cwd).toBe('foo/path');
        });

        test('"format" option defines a default', () => {
            expect(argv().format).toBe('human');
        });

        test('"format" option can be defines by shortcut "F"', () => {
            expect(argv('-F human').format).toBe('human');
        });

        test('"branch" option can be defined', () => {
            expect(argv('--branch master').branch).toBe('master');
        });

        test('"branch" option can be defined by shortcut "b"', () => {
            expect(argv('-b master').branch).toBe('master');
        });

        test('"depth" option can be defined as a number', () => {
            expect(argv('--depth 10').depth).toBe(10);
        });

        test('"depth" option will be converted to a number', () => {
            expect(argv('--depth "10"').depth).toBe(10);
        });

        test('"depth" option can be defined by shortcut "D"', () => {
            expect(argv('-D 42').depth).toBe(42);
        });

        test('"files" option takes a single file glob', () => {
            expect(argv('--files **/*.js').files).toEqual(['**/*.js']);
        });

        test('"files" option can take multiple file globs', () => {
            expect(argv('--files **/*.js *.md').files).toEqual([
                '**/*.js',
                '*.md'
            ]);
        });

        test('"files" option can be defined by shortcut "f"', () => {
            expect(argv('-f **/*.cpp').files).toEqual(['**/*.cpp']);
        });
    });
});
