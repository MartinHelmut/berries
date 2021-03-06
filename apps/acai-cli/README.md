# @berries/acai-cli

<p align="center">
    <img
        src="https://raw.githubusercontent.com/MartinHelmut/berries/master/apps/acai-cli/logo.svg?sanitize=true"
        width="350"
        height="255"
        alt="Berries acai cli logo with three berries and two leafs shown."
    />
</p>

[![npm][npmimg]][npmurl]
[![Build Status][bsurl]][bsimg]
[![Coverage Status][csimg]][csurl]
[![lerna][lnimg]][lnurl]
[![Commitizen friendly][cfimg]][cfurl]
[![code style: prettier][ptimg]][pturl]

**Calculate bug spots in git repositories based on commit messages.**

This is the command line tool that uses the [@berries/acai][acurl] library to calculate a list of files that where bug prone in the recent past by applying a score value to the files. The older a commit for a file gets, the less priority it has. This prevents files that where fixed a long time ago to be forever on top of the list.

**Important note:** The results for the hot spots are only relevant for the project itself and can not be compared from one project to another (except you find a way to do it! 😉).

<p align="center">
    <img
        src="https://cdn.rawgit.com/MartinHelmut/berries/master/apps/acai-cli/usage-example.svg"
        width="620"
        height="378"
        alt="Animated usage example of the acai cli."
    />
</p>

## Table of contents

- [Environment](#environment)
- [Usage](#usage)
  - [Options](#options)
- [License](#license)

## Environment

- Provided automatically through Rush

## Usage

You can install the CLI globally with:

```bash
npm i @berries/acai-cli -g
```

and run the _acai-cli_ inside a git repository (other version control systems will be follow):

```bash
acai
```

or use npx/pnpx and run acai directly:

```bash
# npm
npx @berries/acai-cli

# pnpm
pnpx @berries/acai-cli
```

### Options

| Option    | Short | Description                                                                                                       |
| --------- | ----- | ----------------------------------------------------------------------------------------------------------------- |
| --help    | -h    | Show the help text for acai command line tool                                                                     |
| --version |       | Show the installed CLI version                                                                                    |
| --cwd     | -d    | Define a different git repository, e.g.: `$ acai -d "path/to/git/repo"`                                           |
| --format  | -F    | Define the output format. Available options: `human`                                                              |
| --branch  | -b    | Branch to run stats on, default branch is the currently selected                                                  |
| --depth   | -D    | Define how many commits in the past should be considered                                                          |
| --files   | -f    | One or more file patterns to match against. You can use [http://www.globtester.com][glurl] to test your patterns. |

## License

MIT

[npmurl]: https://www.npmjs.com/package/@berries/acai-cli
[npmimg]: https://img.shields.io/npm/v/@berries/acai-cli.svg
[bsurl]: https://travis-ci.org/MartinHelmut/berries.svg?branch=master
[bsimg]: https://travis-ci.org/MartinHelmut/berries
[csimg]: https://coveralls.io/repos/github/MartinHelmut/berries/badge.svg?branch=master
[csurl]: https://coveralls.io/github/MartinHelmut/berries?branch=master
[lnurl]: https://lernajs.io/
[lnimg]: https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg
[cfimg]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[cfurl]: http://commitizen.github.io/cz-cli/
[ptimg]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[pturl]: https://github.com/prettier/prettier
[acurl]: https://github.com/MartinHelmut/berries/tree/master/packages/acai
[glurl]: http://www.globtester.com/
