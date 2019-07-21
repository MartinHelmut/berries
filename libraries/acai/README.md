# @berries/acai

<p align="center">
    <img
        src="https://raw.githubusercontent.com/MartinHelmut/berries/master/libraries/acai/logo.svg?sanitize=true"
        width="350"
        height="255"
        alt="Berries acai logo with three berries and two leafs."
    />
</p>

[![npm][npmimg]][npmurl]
[![Build Status][bsurl]][bsimg]
[![Coverage Status][csimg]][csurl]
[![lerna][lnimg]][lnurl]
[![Commitizen friendly][cfimg]][cfurl]
[![code style: prettier][ptimg]][pturl]

**Calculate bug spots in git repositories based on commit messages.**

This JavaScript library calculates a list of files that where bug prone in the recent past. The older a commit gets, the less priority it has. So the results change over time. This prevents files that where fixed a long time ago to be forever on top of the list. The results for the hot spots are only relevant for the project itself and can not be compared from one project to another (except you find a way to do it! 😎).

## Table of contents

- [Environment](#environment)
- [How to use the library](#how-to-use-the-library)
  - [Quick start](#quick-start)
  - [Options](#options)
- [Disclaimer](#disclaimer)
- [License](#license)

## Environment

- Provided automatically through Rush

## How to use the library

### Quick start

Install the library with:

```bash
# npm
npm install @berries/acai

# Yarn
yarn add @berries/acai

# pnpm
pnpm install @berries/acai
```

The simplest way to use the library to scan for bug spots in files could be explained in the following example:

```javascript
// index.js
(async () => {
  const scanner = require("@berries/acai");
  const results = await scanner("path/to/git/repository");
  console.log(results);
})();
```

Now run that file and it will print the results of that repository:

```bash
node ./index.js
```

The resulting object contains `fixes`, `hotspots` and `time`. The `fixes` property contains an array of objects including the commit message that is associated to a bugfix, a unix timestamp from when the commit is and all files (with relatives path from the root of the repository) that where touched with that commit. This could look like this:

```json
[
  {
    "message": "commit message that introduced a fix",
    "time": 1500000000000,
    "files": ["relative/path/to/file1.ext", "relative/path/file2.ext"]
  },
  {
    "message": "another bug was closed",
    "time": 1500000000001,
    "files": ["relative/path/file2.ext"]
  }
]
```

The `hotspots` property contains the calculated score associated to a file as array sorted from the highest score to the lowest:

```json
[
  {
    "file": "relative/path/file2.ext",
    "score": 1
  },
  {
    "file": "relative/path/to/file1.ext",
    "score": 0.9
  }
]
```

The `time` property contains the execution time for the calculation in milliseconds.

### Options

The second argument of the `scanner` function takes an options object:

| Option       | Default                                                                            | Description                                                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `branchName` | `<currently selected branch>`                                                      | The branch that should be used. **Attention**: If a specific branch name is given the library performs a real checkout in that repository.       |
| `depth`      | `Infinity`                                                                         | How many commits in the past should be consired.                                                                                                 |
| `files`      | `["*"]`                                                                            | Which files are relevant to check for fixes. This uses one or multiple file globs, see [http://www.globtester.com][glurl] to test your patterns. |
| `pattern`    | /^(?:(?!branch.+into 'master').)\*\bfix(?:ed&#124;es)?&#124;close(?:s&#124;d)?\b/i | A pattern to match against commit messages. The default one tries to exclude master merges.                                                      |
| `dispatch`   | `() => undefined`                                                                  | Listen to scanner actions. For more information read [listen for dispatched actions](../../docs/acai/dispatch.md)                                |

## Disclaimer

This implementation was inspired by multiple other similar packages in different languages, e.g.:

- [bugspots][b1url] from [igrigorik][u1url] (Ruby)
- [python-bugspots][b2url] from [niedbalski][u2url] (Python)

The idea behind this tool came from a 2011 article by Google called ["Bug prediction by Google"][bpurl]. Later there was also a [case study going deeper into detail][cgurl] as well as [Predicting Faults from Cached History][pfurl]. The whole idea to "predict bugs" on a code base was then stopped because of no real benefits to the developer (see also ["Issues with Google’s Bug Prediction Algorithm"][biurl]).

**So why still do it again?** I ported it to provide a node library on the one hand and a cli tool on the other to use it for further tooling to provide better results for this kind of "bug spot calculation". Not only name files that could contain bugs, but also show where bugs (like a [heatmap][hmurl]) in a file could appear and why they appeared in the past. The heatmap and "why" feature will be implemented in future releases.

## License

MIT

[npmurl]: https://www.npmjs.com/package/@berries/acai
[npmimg]: https://img.shields.io/npm/v/@berries/acai.svg
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
[glurl]: http://www.globtester.com/
[bpurl]: http://google-engtools.blogspot.de/2011/12/bug-prediction-at-google.html
[cgurl]: https://static.googleusercontent.com/media/research.google.com/en/us/pubs/archive/41145.pdf
[pfurl]: http://groups.csail.mit.edu/pag/pubs/predict-faults-icse2007.pdf
[biurl]: http://www.boyter.org/2015/07/issues-googles-bug-prediction-algorithm/
[b1url]: https://github.com/igrigorik/bugspots
[u1url]: https://github.com/igrigorik
[b2url]: https://github.com/niedbalski/python-bugspots
[u2url]: https://github.com/niedbalski
[hmurl]: https://en.wikipedia.org/wiki/Heat_map
