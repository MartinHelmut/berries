/**
 * Create formatter and access formatter options.
 * @module @berries/acai-cli/format
 */
'use strict';

/**
 * @global
 * @namespace Formatter
 */

/**
 * Initialize the formatter
 *
 * @function init
 * @memberOf Formatter
 */

/**
 * Add an item to the formatter stack
 *
 * @function add
 * @memberOf Formatter
 * @param {Object} item A acai scanner action
 */

/**
 * Clear the stack and return the current formatted scanner items
 *
 * @function flush
 * @memberOf Formatter
 * @returns {string} The formatted scanner result
 */

/**
 * Format an error message
 *
 * @function error
 * @memberOf Formatter
 * @param {Error} error An reported error message
 * @returns {(string|void)} The formatted error message
 */

/**
 * @global
 * @namespace FormatterOptions
 * @property {WritableStream} [stream=process.stdout] Stream to write the output
 */

const formatter = { human: require('./formatter/human') };
const formatOptions = Object.keys(formatter);

module.exports = {
    /**
     * @property {string[]} options List of format options
     */
    options: formatOptions,
    /**
     * Get a registered formatter
     *
     * @param {string} name A formatter name
     * @param {FormatterOptions} [options] Formatter options, @todo: currently not in use
     * @returns {Formatter} Returns a formatter object
     */
    getFormatter(name, options = { stream: process.stdout }) {
        if (typeof formatter[name] === 'undefined') {
            throw new Error(
                [
                    `The --format option "${name}" is unknown.`,
                    'Please use one of the following:',
                    formatOptions.join(', ')
                ].join(' ')
            );
        }
        return new formatter[name](options);
    }
};
