/**
 * Custom matcher for Jest
 */
'use strict';

expect.extend({
    toDispatch(received, expected) {
        const pass = received.mock.calls.some(({ type }) => type === expected);
        const uniqueActions = [
            ...new Set(received.mock.calls.map(([{ type }]) => type))
        ];
        const message = pass
            ? () =>
                  this.utils.matcherHint('.not.toDispatch') +
                  '\n\n' +
                  `Expected dispatch not be called with:\n` +
                  `  ${this.utils.printExpected(expected)}\n` +
                  `Received a set of:\n` +
                  `  ${this.utils.printReceived(uniqueActions)}`
            : () =>
                  this.utils.matcherHint('.toDispatch') +
                  '\n\n' +
                  `Expected dispatch to be called with:\n` +
                  `  ${this.utils.printExpected(expected)}\n` +
                  `Received a set of:\n` +
                  `  ${this.utils.printReceived(uniqueActions)}`;

        return { actual: received, message, pass };
    }
});
