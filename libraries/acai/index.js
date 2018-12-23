/**
 * Main module import for the bug spot scanner
 *
 * @module @berries/acai
 * @see module:@berries/acai/scanner
 *
 * @example
 * // Quick usage: scan repository on master branch for bug hot spots.
 * const scanner = require('@berries/acai');
 * scanner('path/to/repository');
 */
module.exports = require("./src/scanner");
