/**
 * Helper to manage Commit objects and execute certain operations on them.
 * @module @berries/acai/commit
 */
"use strict";

/**
 * A glob matcher in javascript. See {@link http://www.globtester.com/} for more information on how to test globs.
 * @external micromatch
 * @see {@link https://github.com/micromatch/micromatch}
 */
const micromatch = require("micromatch");

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
   * @param {string[]} patterns A minimatch compatible file glob
   * @returns {Commit[]} A filtered list of commit messages
   */
  filterByFilePatterns(commits, patterns) {
    if (patterns.length === 1 && patterns[0] === "*") {
      return commits;
    }
    return commits.reduce((result, fix) => {
      const files = micromatch(fix.files, patterns, { nocase: true });
      if (files.length === 0) {
        return result;
      }
      return [...result, Object.assign({}, fix, { files })];
    }, []);
  }
};
