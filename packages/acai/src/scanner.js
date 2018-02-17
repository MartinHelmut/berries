/**
 * Scan repositories for bug hot spots.
 * @module @berries/acai/scanner
 */
'use strict';

const git = require('./adapter/git');
const commit = require('./commit');
const spots = require('./spots');
const actions = require('./actions');

/**
 * @global
 * @namespace ActionMeta
 * @extends Object
 */

/**
 * @global
 * @namespace Action
 * @property {('LOG'|'START'|'COMMIT'|'COMMITS'|'FIXES'|'HOTSPOTS'|'END')} type Possible action types
 * @property {Object} payload The actual action payload defined by the action type
 * @property {ActionMeta} [meta] Secondary values tied to the action type
 */

/**
 * @global
 * @callback dispatchCallback A callback for external use of inner actions getting called
 * @param {Action} action Acai action for external usage
 */

/**
 * @global
 * @namespace ScannerOptions
 * @property {string} [branchName=<currently selected>] The branch name to scan
 * @property {number} [depth=Infinity] Scan depth or "how many commits in the past"
 * @property {string[]} [files=['*']] One or more glob patterns for which files should be considered
 * @property {dispatchCallback} [dispatch] An interface for external use of inner actions
 * @property {RegExp} [pattern=/^(?:(?!branch.+into\s'master').)*\bfix(?:ed|es)?|close(?:s|d)?\b/i] An expression to match commit messages and excludes master merges
 */

/**
 * @global
 * @namespace ScannerResult
 * @property {Commit[]} fixes A list if found fix commits
 * @property {HotSpot[]} hotSpots A list of calculated hotSpots
 * @property {Number} time Time in milliseconds the calculation run
 */

/**
 * Scan repository for hot-spots
 *
 * @param {string} path Path to a repository
 * @param {ScannerOptions} [options={}] options Options to configure the scanner
 * @returns {Promise<ScannerResult>} The analysed scanner results
 */
module.exports = async function scanner(
    path,
    {
        branch,
        depth,
        files = ['*'],
        dispatch = () => undefined,
        pattern = /^(?:(?!branch.+into 'master').)*\bfix(?:ed|es)?|close(?:s|d)?\b/i
    } = {}
) {
    const startTime = Date.now();
    dispatch(actions.start(startTime));

    const commits = await Promise.all(
        git
            .filterCommits(
                await git.getCommits({ path, branch, depth }),
                commitMessage => pattern.test(commitMessage)
            )
            .map(async commit => {
                const descriptor = await git.getDescriptor(commit);
                dispatch(actions.commit(descriptor));

                return descriptor;
            })
    );
    dispatch(actions.commits(commits));

    const fixes = commit.filterByFilePatterns(commits, files);
    dispatch(actions.fixes(fixes));

    const hotspots = spots.normalize(spots.calculate(fixes));
    dispatch(actions.hotspots(hotspots));

    const endTime = Date.now();
    const time = endTime - startTime;
    dispatch(actions.end(endTime));

    return { fixes, hotspots, time };
};
