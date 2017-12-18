'use strict';

// @todo: This whole file is just stuffed together in a hurry, so, it should be refactored 👷

const nodegit = {};
let registry = {};
let commitHistory = [];
let interval = null;
let index = 0;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function __setHistory(history) {
    // Reset data on history set
    clearInterval(interval);
    registry = {};
    index = 0;
    // Create event emitted commit history
    let date = Date.now();
    commitHistory = history
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
        registry[event] = (...args) => {
            if (event === 'end') {
                clearInterval(interval);
            }
            return callback(...args);
        };
    },
    start() {
        interval = setInterval(() => {
            const cm = commitHistory[index];
            if (cm instanceof Error) {
                registry.error(cm);
            }
            cm
                ? registry.commit && registry.commit(cm)
                : registry.end(commitHistory);
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
        return Promise.resolve();
    },
    async getMasterCommit() {
        return Promise.resolve(Commit);
    }
};

nodegit.Repository = Repository;
nodegit.__setHistory = __setHistory;

module.exports = nodegit;
