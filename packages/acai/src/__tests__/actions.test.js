'use strict';

const actions = require('../actions');

describe('actions', () => {
    describe('log', () => {
        test('returns a default payload', () => {
            expect(actions.log('message')).toEqual(
                expect.objectContaining({
                    type: actions.types.LOG,
                    payload: expect.any(String),
                    meta: expect.objectContaining({
                        level: actions.logLevels.vendor,
                        time: expect.any(Number)
                    })
                })
            );
        });

        test('returns a payload with different log level', () => {
            expect(actions.log('message', actions.logLevels.warning)).toEqual(
                expect.objectContaining({
                    type: actions.types.LOG,
                    payload: expect.any(String),
                    meta: expect.objectContaining({
                        level: actions.logLevels.warning,
                        time: expect.any(Number)
                    })
                })
            );
        });
    });

    describe('start', () => {
        test('returns a payload', () => {
            expect(actions.start(Date.now())).toEqual(
                expect.objectContaining({
                    type: actions.types.START,
                    payload: expect.any(Number)
                })
            );
        });
    });

    describe('commit', () => {
        test('returns a payload', () => {
            expect(actions.commit({ message: '', time: 0, files: [] })).toEqual(
                expect.objectContaining({
                    type: actions.types.COMMIT,
                    payload: expect.objectContaining({
                        message: expect.any(String),
                        time: expect.any(Number),
                        files: expect.any(Array)
                    }),
                    meta: expect.objectContaining({
                        time: expect.any(Number)
                    })
                })
            );
        });
    });

    describe('commits', () => {
        test('returns a payload', () => {
            expect(
                actions.commits([{ message: '', time: 0, files: [] }])
            ).toEqual(
                expect.objectContaining({
                    type: actions.types.COMMITS,
                    payload: expect.arrayContaining([
                        expect.objectContaining({
                            message: expect.any(String),
                            time: expect.any(Number),
                            files: expect.any(Array)
                        })
                    ]),
                    meta: expect.objectContaining({
                        time: expect.any(Number)
                    })
                })
            );
        });
    });

    describe('fixes', () => {
        test('returns a payload', () => {
            expect(
                actions.fixes([{ message: '', time: 0, files: [] }])
            ).toEqual(
                expect.objectContaining({
                    type: actions.types.FIXES,
                    payload: expect.arrayContaining([
                        expect.objectContaining({
                            message: expect.any(String),
                            time: expect.any(Number),
                            files: expect.any(Array)
                        })
                    ]),
                    meta: expect.objectContaining({
                        time: expect.any(Number)
                    })
                })
            );
        });
    });

    describe('hotspots', () => {
        test('returns a payload', () => {
            expect(actions.hotspots([{ file: '', score: 1 }])).toEqual(
                expect.objectContaining({
                    type: actions.types.HOTSPOTS,
                    payload: expect.arrayContaining([
                        expect.objectContaining({
                            file: expect.any(String),
                            score: expect.any(Number)
                        })
                    ]),
                    meta: expect.objectContaining({
                        time: expect.any(Number)
                    })
                })
            );
        });
    });

    describe('end', () => {
        test('returns a payload', () => {
            expect(actions.end(Date.now())).toEqual(
                expect.objectContaining({
                    type: actions.types.END,
                    payload: expect.any(Number)
                })
            );
        });
    });
});
