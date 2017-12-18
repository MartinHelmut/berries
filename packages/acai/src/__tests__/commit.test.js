'use strict';

const commit = require('../commit');

describe('commit', () => {
    describe('filterByFileGlob()', () => {
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
                }
            ];
        });

        test('returns all commits by wildcard glob', () => {
            const actual = commit.filterByFileGlob(commits, '*');
            expect(actual).toEqual(commits);
        });

        test('returns filtered commit list by glob', () => {
            const actual = commit.filterByFileGlob(commits, '**/*.txt');
            expect(actual).toHaveLength(2);
        });

        test('returns empty array if nothing matches', () => {
            const actual = commit.filterByFileGlob(commits, '**/*.wut');
            expect(actual).toEqual([]);
        });
    });
});
