'use strict';

const commit = require('../commit');

describe('commit', () => {
    describe('filterByFilePatterns()', () => {
        let commits;
        beforeEach(() => {
            commits = [
                {
                    message: 'fix 1',
                    time: 1,
                    files: ['file.txt', 'another/file.py']
                },
                {
                    message: 'fix 2',
                    time: 1,
                    files: ['path/to/file.js']
                },
                {
                    message: 'fix 3',
                    time: 1,
                    files: ['file2.txt', 'another/file.txt']
                },
                {
                    message: 'fix 4',
                    time: 1,
                    files: ['file3.txt', 'readme.md']
                }
            ];
        });

        test('returns all commits by wildcard glob', () => {
            const actual = commit.filterByFilePatterns(commits, ['*']);
            expect(actual).toEqual(commits);
        });

        test('returns filtered commit list by glob', () => {
            const actual = commit.filterByFilePatterns(commits, ['**/*.txt']);
            expect(actual).toHaveLength(3);
        });

        test('is case insensitive', () => {
            const actual = commit.filterByFilePatterns(commits, ['**/*.TXT']);
            expect(actual).toHaveLength(3);
        });

        test('returns empty array if nothing matches', () => {
            const actual = commit.filterByFilePatterns(commits, ['**/*.wut']);
            expect(actual).toEqual([]);
        });

        test('can handle multiple patterns', () => {
            const actual = commit.filterByFilePatterns(commits, [
                '**/*.txt',
                '*.js'
            ]);
            expect(actual).toHaveLength(3);
        });
    });
});
