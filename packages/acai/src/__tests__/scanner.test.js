'use strict';

jest.mock('nodegit');
const nodegit = require('nodegit');
const scanner = require('../scanner');
const actions = require('../actions');

describe('scanner()', () => {
    beforeEach(() =>
        nodegit.__setHistory('master', [
            'fix number one',
            'another commit',
            'another fix\nanother line'
        ]));

    afterEach(() => nodegit.__setHistory('master', []));

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
                ]),
                time: expect.any(Number)
            })
        );
    });

    describe('actions', () => {
        test('dispatches', async () => {
            const dispatch = jest.fn();
            await scanner('repo/path', { dispatch });

            expect(dispatch.mock.calls.length).toBeGreaterThan(0);
            expect(dispatch).toDispatch(actions.START);
            expect(dispatch).toDispatch(actions.COMMITS);
            expect(dispatch).toDispatch(actions.FIXES);
            expect(dispatch).toDispatch(actions.HOTSPOTS);
            expect(dispatch).toDispatch(actions.END);
        });
    });
});
