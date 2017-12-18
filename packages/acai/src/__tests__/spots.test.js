'use strict';

const spots = require('../spots');

describe('spots', () => {
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
                time: 2,
                files: ['path/to/file.js', 'file.txt']
            },
            {
                message: 'fix 3',
                time: 3,
                files: ['file2.txt', 'another/file.py']
            }
        ];
    });

    describe('calculate()', () => {
        test('returns a list of files with scores', () => {
            const actual = spots.calculate(commits);
            expect(actual).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        file: expect.any(String),
                        score: expect.any(Number)
                    })
                ])
            );
        });

        test('returned list is sorted from large to low score', () => {
            const actual = spots.calculate(commits);
            const firstEntry = actual[0];
            const lastEntry = actual[actual.length - 1];
            expect(firstEntry.score).toBeGreaterThan(lastEntry.score);
        });

        test('older files are listed lower', () => {
            const actual = spots.calculate(commits);
            const firstEntry = actual.shift();
            const secondEntry = actual.shift();
            expect(firstEntry.file).toBe('another/file.py');
            expect(secondEntry.file).toBe('file.txt');
        });

        test('returns an empty array if no commits are passed', () => {
            expect(spots.calculate([])).toEqual([]);
        });
    });

    describe('normalize()', () => {
        test('to a range between 0 and 1', () => {
            const actual = spots.normalize(spots.calculate(commits));
            const firstEntry = actual.shift();
            const secondEntry = actual.shift();
            expect(firstEntry.score).toBeGreaterThan(secondEntry.score);
        });
    });

    describe('onlyUseTopResults()', () => {
        test('return all if no usage given', () => {
            const actual = spots.onlyUseTopResults(spots.calculate(commits));
            expect(actual).toHaveLength(4);
        });

        test('return top amount percent given by a number', () => {
            const actual = spots.onlyUseTopResults(
                spots.calculate(commits),
                0.3 // top 30%
            );
            expect(actual).toHaveLength(2);
        });

        test('return nothing if usage is zero', () => {
            const actual = spots.onlyUseTopResults(spots.calculate(commits), 0);
            expect(actual).toHaveLength(0);
        });

        test('first result is what it should be', () => {
            const actual = spots.onlyUseTopResults(
                spots.calculate(commits),
                0.5 // top 50%
            );
            expect(actual[0].file).toBe('another/file.py');
        });
    });
});
