/**
 * The git adapter to handle git managed repositories.
 * @module @berries/acai/adapter/git
 */
'use strict';

/**
 * Asynchronous native Node bindings to libgit2
 * @external nodegit
 * @see {@link http://www.nodegit.org/api/}
 */
const nodegit = require('nodegit');

/**
 * @callback commitFilterCallback The callback to filter commit messages
 * @param {string} commitMessage Git commit message
 * @returns {boolean}
 */

module.exports = {
    /**
     * Get commit message messages.
     *
     * @param {string} repoPath The path to the repository
     * @param {string} branchName The target branch name
     * @param {number} [depth=Infinity] How much commits in the past should be considered
     * @returns {Promise<Object>} Returns a promise resolving to an array of commit objects
     */
    async getCommits(repoPath, branchName, depth) {
        const repo = await nodegit.Repository.open(repoPath);
        await repo.checkoutBranch(branchName);
        const commit = await repo.getMasterCommit();
        const history = commit.history();
        const commits = [];
        let depthIndex = 0;

        return new Promise((resolve, reject) => {
            if (depth && typeof depth === 'number') {
                history.on('commit', commit => {
                    depthIndex++;
                    commits.push(commit);

                    if (depthIndex >= depth) {
                        resolve(commits);
                        history.stop();
                    }
                });
            }

            history.on('error', reject);
            history.on('end', resolve);
            history.start();
        });
    },
    /**
     * Return filtered commit messages
     *
     * @param {Object[]} commits A list of adapted commit messages
     * @param {commitFilterCallback} fn A pattern to match the commit message
     * @returns {Object[]} An array of filtered commit messages
     */
    filterCommits(commits, fn) {
        return commits.filter(commit => fn(this.getCommitMessage(commit)));
    },
    /**
     * Get the changed files for the commit
     *
     * @private
     * @todo: Check if file still in HEAD
     * @param {Object} commit A commit object
     * @returns {Promise<string[]>} Returns a promise resolving to an array file paths
     */
    async getCommitFiles(commit) {
        return (await commit.getDiff()).reduce(async (accFiles, diff) => {
            // @todo: The `await diff.patches()` here takes almost 95% of the time the whole program needs.
            // Maybe I could execute `git diff-tree --no-commit-id --name-only -r ${commit.sha()}` directly on
            // a commit reference to speet it up?
            const files = (await diff.patches()).map(patch =>
                patch.oldFile().path()
            );
            return [...(await accFiles), ...files];
        }, []);
    },
    /**
     * Return the first paragraph of the commit messages
     *
     * @private
     * @param {Object} commit A git commit message object
     * @returns {string} The first commit message paragraph
     */
    getCommitMessage(commit) {
        return commit.message().split('\n')[0];
    },
    /**
     * Get an object representation of the commit message
     *
     * @private
     * @param {Object} commit The adapted commit message
     * @returns {Promise<Commit>} A promise resolving to the commit descriptor
     */
    async getDescriptor(commit) {
        return {
            message: this.getCommitMessage(commit),
            time: commit.timeMs(),
            files: await this.getCommitFiles(commit)
        };
    }
};
