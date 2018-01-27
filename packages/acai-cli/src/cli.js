/**
 * Main acai cli module.
 * @module @berries/acai-cli/cli
 */
'use strict';

const path = require('path');
const scanner = require('@berries/acai');
const argv = require('./argv')(process.argv);
const { getFormatter } = require('./format');

// @todo: This is not the best way to do this, but it works for now. Still, this should be refactored!
// Right now I use it to use the formatter if initialized for the error handling.
let formatter = null;

async function main({ cwd = process.cwd(), format, branch, depth }) {
    const repo = path.resolve(cwd);

    formatter = getFormatter(format);

    if (!Number.isInteger(depth) && !depth) {
        throw new TypeError('Option --depth can only take integer values');
    }

    await scanner(repo, {
        dispatch: formatter.add.bind(formatter),
        branchName: branch,
        depth
    });

    console.log(formatter.flush());
}

main(argv).catch(err => {
    formatter ? formatter.error(err) : console.error(err);
    process.exit(1);
});
