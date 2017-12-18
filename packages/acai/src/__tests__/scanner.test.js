'use strict';

jest.mock('nodegit');
const nodegit = require('nodegit');
const scanner = require('../scanner');

describe('scanner()', () => {
    beforeEach(() =>
        nodegit.__setHistory([
            'fix number one',
            'another commit',
            'another fix\nanother line'
        ])
    );

    afterEach(() => nodegit.__setHistory([]));

    test('returns a proper shaped object', async () => {
        const actual = await scanner('repo/path');
        expect(actual).toEqual(
            expect.objectContaining({
                fixes: expect.arrayContaining([
                    expect.objectContaining({
                        message: expect.any(String),
                        time: expect.any(Number),
                        files: expect.any(Array)
                    })
                ]),
                hotspots: expect.arrayContaining([
                    expect.objectContaining({
                        file: expect.any(String),
                        score: expect.any(Number)
                    })
                ])
            })
        );
    });
});
