/**
 * Scan repositories for bug hot spots.
 * @module @berries/acai/scanner
 */
'use strict';

const git = require('./adapter/git');
const commit = require('./commit');
const spots = require('./spots');

/**
 * @global
 * @namespace ScannerOptions
 * @property {number} [depth=Infinity] Scan depth or "how many commits in the past"
 * @property {RegExp} [pattern=/^(?:(?!branch.+into\s'master').)*\bfix(?:ed|es)?|close(?:s|d)?\b/i] An expression to match commit messages and excludes master merges
 * @property {string} [fileGlob=*] A glob pattern for which files should be considered
 * @property {number} [usage=80] Number in percent of top hot-spots that should be considered. The top 80% strips out the lower noise.
 * @property {string} [branchName=master] The branch name to scan
 */

/**
 * @global
 * @namespace ScannerResult
 * @property {Commit[]} fixes A list if found fix commits
 * @property {HotSpot[]} hotSpots A list of calculated hotSpots
 */

/**
 * Scan repository for hot-spots
 *
 * @param {string} repoPath Path to a repository
 * @param {ScannerOptions} [options={}] options Options to configure the scanner
 * @returns {Promise<ScannerResult>} The analysed scanner results
 */
module.exports = async function scanner(
    repoPath,
    {
        branchName = 'master',
        depth,
        fileGlob = '*',
        pattern = /^(?:(?!branch.+into 'master').)*\bfix(?:ed|es)?|close(?:s|d)?\b/i,
        usage = 80
    } = {}
) {
    const commits = await Promise.all(
        git
            .filterCommits(
                await git.getCommits(repoPath, branchName, depth),
                commitMessage => pattern.test(commitMessage)
            )
            .map(async commit => await git.getDescriptor(commit))
    );

    const usageAsNormalizedValue = usage / 100;
    const fixes = commit.filterByFileGlob(commits, fileGlob);
    const hotspots = spots.normalize(
        spots.onlyUseTopResults(spots.calculate(fixes), usageAsNormalizedValue)
    );

    return { fixes, hotspots };
};
