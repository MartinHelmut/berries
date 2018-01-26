/**
 * Query options from the command line and setup the "yargs" package.
 * @module @berries/acai-cli/argv
 */
'use strict';

/**
 * yargs the modern, pirate-themed successor to optimist.
 * @external yargs
 * @see {@link https://github.com/yargs/yargs}
 */

const yargs = require('yargs');
const { options: formatOptions } = require('./format');

module.exports = function getConfiguredArgv(input) {
    const { argv } = yargs(input)
        .detectLocale(false)
        .usage('Usage: $0 [options]')
        .options({
            cwd: {
                alias: 'd',
                description: 'Set the path to a repository',
                type: 'string'
            },
            format: {
                alias: 'F',
                choices: formatOptions,
                default: 'human',
                description: 'Return format for the scanner output'
            },
            branch: {
                alias: 'b',
                default: 'human',
                description: 'Branch to run stats on, default is master'
            },
            help: {
                alias: 'h',
                description: 'Show this help'
            },
            version: {
                description: 'Show version'
            }
        })
        .example(
            '$ $0',
            'If executed inside a git repository this is all you need'
        )
        .example('$ $0 --cwd="path/to"', 'If executed outside a git repository')
        .showHelpOnFail(false, 'Use --help to show all available options')
        .strict();
    return argv;
};
