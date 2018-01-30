'use strict';

// @todo: This whole file is just stuffed together in a hurry, so, it should be refactored 👷

const nodegit = {};
let registry = {
    master: {}
};
let commitHistory = {};
let currentBranch = 'master';
let interval = null;
let index = 0;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function __setHistory(branch, history) {
    // Reset data on history set
    clearInterval(interval);
    registry[branch] = {};
    commitHistory[branch] = [];
    index = 0;
    // Create event emitted commit history
    let date = Date.now();
    commitHistory[branch] = history
        .map(item => {
            return {
                message() {
                    return item;
                },
                timeMs() {
                    date = date - 84600000;
                    return date;
                },
                async getDiff() {
                    return Promise.resolve(
                        Array(getRandomInt(1, 10))
                            .fill(null)
                            .map(() => {
                                return {
                                    async patches() {
                                        return Promise.resolve(
                                            Array(getRandomInt(1, 5))
                                                .fill(null)
                                                .map(() => ({
                                                    oldFile: () => ({
                                                        path: () => 'file.js'
                                                    })
                                                }))
                                        );
                                    }
                                };
                            })
                    );
                }
            };
        })
        .reverse();
}

const History = {
    on(event, callback) {
        registry[currentBranch][event] = (...args) => {
            if (event === 'end') {
                clearInterval(interval);
            }
            return callback(...args);
        };
    },
    start() {
        interval = setInterval(() => {
            const cm = commitHistory[currentBranch][index];
            if (cm instanceof Error) {
                registry[currentBranch].error(cm);
            }
            cm
                ? registry[currentBranch].commit &&
                  registry[currentBranch].commit(cm)
                : registry[currentBranch].end(commitHistory[currentBranch]);
            index++;
        }, 10);
    },
    stop() {
        clearInterval(interval);
    }
};

const Commit = {
    history() {
        return History;
    }
};

const Repository = {
    async open(repoPath) {
        return Promise.resolve(this);
    },
    async checkoutBranch(branchName) {
        currentBranch = branchName;
        return Promise.resolve();
    },
    async getMasterCommit() {
        return Promise.resolve(Commit);
    }
};

nodegit.Repository = Repository;
nodegit.__setHistory = __setHistory;

module.exports = nodegit;
