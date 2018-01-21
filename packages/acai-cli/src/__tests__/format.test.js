'use strict';

const format = require('../format');
const human = require('../formatter/human');

describe('format', () => {
    describe('getFormatter()', () => {
        test('returns a formatter option if defined', () => {
            const instance = format.getFormatter('human');
            expect(instance).toBeTruthy();
        });

        test('returns an instance of the requested formatter', () => {
            const instance = format.getFormatter('human');
            expect(instance).toBeInstanceOf(human);
        });

        test('throws an error if formatter is not defined', () => {
            expect(() => format.getFormatter('foobar')).toThrow();
        });
    });
});
