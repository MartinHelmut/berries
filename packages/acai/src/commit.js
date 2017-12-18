/**
 * Helper to manage Commit objects and execute certain operations on them.
 * @module @berries/acai/commit
 */
'use strict';

/**
 * A glob matcher in javascript. See http://www.globtester.com/ for more information
 * @external minimatch
 * @see {@link https://github.com/isaacs/minimatch}
 */
const minimatch = require('minimatch');

/**
 * @global
 * @namespace Commit
 * @property {string} message A commit message for the matched pattern
 * @property {number} time The time of the commit as unix timestamp
 * @property {string[]} files A list of associated files to that commit
 */

module.exports = {
    /**
     * Filter commits by file glob
     *
     * @param {Commit[]} commits A list of commit messages
     * @param {string} fileGlob A minimatch compatible file glob
     * @returns {Commit[]} A filtered list of commit messages
     */
    filterByFileGlob(commits, fileGlob) {
        if (fileGlob === '*') {
            return commits;
        }
        return commits.reduce((result, fix) => {
            const files = fix.files.filter(
                minimatch.filter(fileGlob, { nocase: true })
            );
            if (files.length === 0) {
                return result;
            }
            return [...result, Object.assign({}, fix, { files })];
        }, []);
    }
};
