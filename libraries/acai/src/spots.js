/**
 * Methods to calculate which files in changes are hot spots for bugs.
 * @module @berries/acai/spots
 */
"use strict";

/**
 * @global
 * @namespace HotSpot
 * @property {string} file A relative file path
 * @property {number} score The calculated bug score
 */

module.exports = {
  /**
   * Reduce results to top percent passed by usage
   *
   * @deprecated
   * @param {HotSpot[]} hotSpots A list if calculated hot-spots
   * @param {number} [usage=1] A percentage value as reduced number, 1 == 100%
   * @returns {HotSpot[]} Returns the reduced amount of hot-spots given by "usage"
   */
  onlyUseTopResults(hotSpots, usage = 1) {
    return hotSpots.filter(
      ({ score }) => score > hotSpots[0].score * (1 - usage)
    );
  },
  /**
   * Normalize the bug scores to a range from 0 to 1
   *
   * @param {HotSpot[]} hotSpots A list of calculated hot-spots
   * @returns {HotSpot[]} A list of hot-spots with normalized bug score values
   */
  normalize(hotSpots) {
    return hotSpots.map(({ file, score }) => ({
      file,
      score: score / hotSpots[0].score
    }));
  },
  /**
   * Calculate the hot-spots based on commit messages
   *
   * @param {Commit[]} commits A list of commits
   * @returns {HotSpot[]} The list of calculated hot-spots
   */
  calculate(commits) {
    const relativeTime = time => 1 / (1 + Math.exp(-12 * time + 12));
    const currentTime = Date.now();
    const oldestFixTime = (commits[commits.length - 1] || {}).time;
    let maxValue = 0;

    const results = commits.reduce((spots, { files, time }) => {
      files.forEach(file => {
        spots[file] = spots[file] || 0;
        spots[file] += relativeTime(
          1 - (currentTime - time) / (currentTime - oldestFixTime)
        );
        if (spots[file] > maxValue) {
          maxValue = spots[file];
        }
      });

      return spots;
    }, {});

    return Object.keys(results)
      .map(file => ({ file, score: results[file] }))
      .sort((a, b) => a.score - b.score)
      .reverse();
  }
};
