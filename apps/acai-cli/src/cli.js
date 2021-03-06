/**
 * Main acai cli module.
 * @module @berries/acai-cli/cli
 */
"use strict";

const path = require("path");
const scanner = require("@berries/acai");
const argv = require("./argv")(process.argv);
const { getFormatter } = require("./format");

// @todo: This is not the best way to do this, but it works for now. Still, this should be refactored!
// Right now I use it to use the formatter if initialized for the error handling.
let formatter = null;

async function main({ cwd = process.cwd(), format, branch, depth, files }) {
  const repo = path.resolve(cwd);

  formatter = getFormatter(format);

  if (depth && !Number.isInteger(depth)) {
    throw new TypeError("Option --depth can only take integer values");
  }

  await scanner(repo, {
    dispatch: formatter.add.bind(formatter),
    branch,
    depth,
    files
  });

  // eslint-disable-next-line no-console
  console.log(formatter.flush());
}

main(argv).catch(err => {
  // eslint-disable-next-line no-console
  formatter ? formatter.error(err) : console.error(err);
  process.exit(1);
});
