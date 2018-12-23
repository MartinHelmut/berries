/**
 * Formatter for humans.
 * @module @berries/acai-cli/formatter/human
 */
"use strict";

/**
 * Elegant terminal spinner.
 * @external ora
 * @see {@link https://github.com/sindresorhus/ora}
 */

const ora = require("ora");
const actions = require("@berries/acai/src/actions");

const TO_LONG_FOR_ONE_SCREEN = 30;

module.exports = class HumanFormatter {
  /**
   * Initialize human the formatter
   *
   * @param {FormatterOptions} options Format options
   */
  constructor({ stream }) {
    this.result = { fixes: [], hotspots: [], time: 0 };
    this.spinner = ora({
      text: "Calculating bug spots",
      spinner: "dots",
      color: "green",
      stream
    }).start();

    this.timer = setTimeout(() => {
      this.spinner.color = "yellow";
      this.spinner.text = "Okay, this will take some time";
    }, 10000);
  }
  /**
   * Add an item to the formatter stack
   *
   * @param {Object} item A log item provided by the acai scanner
   */
  add({ type, payload }) {
    switch (type) {
      case actions.types.START:
        this.result = Object.assign({}, this.result, {
          time: payload
        });
        break;
      case actions.types.HOTSPOTS:
        this.result = Object.assign({}, this.result, {
          hotspots: payload
        });
        break;
      case actions.types.FIXES:
        this.result = Object.assign({}, this.result, {
          fixes: payload
        });
        break;
      case actions.types.END:
        this.result = Object.assign({}, this.result, {
          time: payload - this.result.time
        });
        break;
      default:
        return;
    }
  }
  /**
   * Clear the stack and return the current formatted scanner items
   *
   * @returns {string} The formatted scanner result
   */
  flush() {
    const { hotspots } = this.result;
    const successMessage = this._getSuccessMessage();
    const output = this._getOutputMessage();

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.spinner.succeed(successMessage);

    return hotspots.length > TO_LONG_FOR_ONE_SCREEN
      ? `${output}${successMessage} Top results are on top of the list.`
      : output;
  }
  /**
   * Format an error message
   *
   * @param {Error} error An reported error message
   * @returns {(string|void)} Can optionally return a printable error message
   */
  error(error) {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.spinner.fail(error.message);
  }
  /**
   * Generate and return the success message
   *
   * @private
   * @returns {string} Success message
   */
  _getSuccessMessage() {
    const { fixes, hotspots, time } = this.result;
    const timeInSeconds = (time / 1000).toFixed(2);

    return `Found ${fixes.length} fix(es) in ${
      hotspots.length
    } file(s) (in ${timeInSeconds}s).`;
  }
  /**
   * Return the generated output list of hot fixes
   *
   * @private
   * @returns {string} Output list
   */
  _getOutputMessage() {
    const { hotspots } = this.result;
    const maxLenght = hotspots.reduce((length, spot) => {
      const spotLength = String(spot.score).length;
      return length < spotLength ? spotLength : length;
    }, 0);

    return hotspots.length > 0
      ? `\nShow ${hotspots.length} hot spots:\n  ${"Score".padEnd(
          maxLenght
        )}   File\n${hotspots
          .map(
            ({ score, file }) =>
              `  ${String(score).padEnd(maxLenght)} - ${file}`
          )
          .join("\n")}\n\n`
      : "";
  }
};
