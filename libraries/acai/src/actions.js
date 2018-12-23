/**
 * Action names for the acai dispatcher.
 * @module @berries/acai/actions
 */
"use strict";

/**
 * Acai action types
 * @readonly
 * @enum {string}
 */
const types = {
  /** Logging messages */
  LOG: "LOG",
  /** Scanner starts */
  START: "START",
  /** Commit is created */
  COMMIT: "COMMIT",
  /** All commits are created */
  COMMITS: "COMMITS",
  /** Fixes are created */
  FIXES: "FIXES",
  /** Hot spots are calculated */
  HOTSPOTS: "HOTSPOTS",
  /** Scanner finished */
  END: "END"
};

/**
 * Acai logging levels
 * @readonly
 * @enum {string}
 */
const logLevels = {
  /** Really noisy messages */
  vendor: "vendor",
  /** System information */
  info: "info",
  /** Scanner warnings */
  warning: "warning",
  /** Errors */
  error: "error"
};

/**
 * @global
 * @namespace LogAction
 * @extends Action
 * @property {(string|Error)} payload A string or an error for logging
 * @property {{level: ('vendor'|'info'|'warning'|'error'), time: number}} meta Logging level and log time
 */

/**
 * Log action creater
 *
 * @param {(string|Error)} payload A string or an error for logging
 * @param {('vendor'|'info'|'warning'|'error')} level Logging level
 * @returns {LogAction}
 */
const log = (payload, level = logLevels.vendor) => ({
  type: types.LOG,
  payload,
  meta: { level, time: Date.now() }
});

/**
 * @global
 * @namespace StartAction
 * @extends Action
 * @property {number} payload Unix timestamp with start time
 */

/**
 * Start action creator
 *
 * @param {number} payload Start time as unix timestamp
 * @returns {StartAction}
 */
const start = payload => ({ type: types.START, payload });

/**
 * @global
 * @namespace CommitAction
 * @extends Action
 * @property {Commit} payload The created commit message descriptor
 * @property {{time: number}} Time created
 */

/**
 * Single commit created action
 *
 * @param {Commit} payload The created commit message descriptor
 * @returns {CommitAction}
 */
const commit = payload => ({
  type: types.COMMIT,
  payload,
  meta: { time: Date.now() }
});

/**
 * @global
 * @namespace CommitsAction
 * @extends Action
 * @property {Commit[]} payload All the created commit messages
 * @property {{time: number}} Time when all commits are created
 */

/**
 * All commits created action
 *
 * @param {Commit[]} payload All created commits
 * @returns {CommitsAction}
 */
const commits = payload => ({
  type: types.COMMITS,
  payload,
  meta: { time: Date.now() }
});

/**
 * @global
 * @namespace FixesAction
 * @extends Action
 * @property {Commit[]} payload All filtered commits
 * @property {{time: number}} Time when all commits are filtered
 */

/**
 * All commits with applied filters action
 *
 * @param {Commit[]} payload All filtered commits
 * @returns {FixesAction}
 */
const fixes = payload => ({
  type: types.FIXES,
  payload,
  meta: { time: Date.now() }
});

/**
 * @global
 * @namespace HotSpotAction
 * @extends Action
 * @property {HotSpot[]} payload All calculated hot spots
 * @property {{time: number}} Time when all hot spots are calculated
 */

/**
 * Calculated hot spots action
 *
 * @param {HotSpot[]} payload All calculated hot spots
 * @returns {HotSpotAction}
 */
const hotspots = payload => ({
  type: types.HOTSPOTS,
  payload,
  meta: { time: Date.now() }
});

/**
 * @global
 * @namespace EndAction
 * @extends Action
 * @property {number} payload Unix timestamp with end time
 */

/**
 * End action creator
 *
 * @param {number} payload End time as unix timestamp
 * @returns {EndAction}
 */
const end = payload => ({ type: types.END, payload });

module.exports = {
  log,
  start,
  commit,
  commits,
  fixes,
  hotspots,
  end,
  logLevels,
  types
};
