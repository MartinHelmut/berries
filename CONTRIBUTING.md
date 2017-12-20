# Contributing

You want do something for this repo? Nice and easy! And of course: you
are the best!

## Contents

* [Environment](#environment)
* [Setup](#setup)
* [Run tests](#run-tests)
* [Show documentation](#show-documentation)
* [Commit changes](#commit-changes)
* [Recommended workflow for release](#recommended-workflow-for-release)

---

## Environment

Tested with Node 8 and NPM 5 and up. Also this repository is organised as a monorepo and uses [lerna][lnurl].

## Setup

Clone the repo and run an install:

```shell
$ git clone git@github.com:MartinHelmut/berries.git && npm install && npx lerna bootstrap
```

## Run tests

To run all tests execute

```shell
$ npm test
```

and to lint the code:

```shell
$ npm run lint
```

You can also run a prettier verification for all JS files in all packages with:

```shell
$ npm run fmt:check
```

This will list changes that would be made on commit (commit hook is installed with husky).

## Show documentation

To create and serve the documentation run the following command **inside a specific package**:

```shell
$ npm run docs
```

## Commit changes

**This repo is is Commitizen-friendly!** ([read more][czcli])

Checkout a new branch, e.g.:

```shell
$ git checkout -b task/do-something
```

**There is no specific naming convention for branches.**

Add your changes and run `npm run commit` to start the commitizen cli to create a proper commit message.

Create a "Merge Request" on GitHub and be awesome! 😎

## Recommended workflow for release

1. Make changes
2. Commit those changes with `npm run commit`
3. Make sure all tests turn green with `npm run test`
4. Publish: `npm run publish`
5. **Done!**

For more information on building a release see [https://github.com/conventional-changelog/standard-version][svurl]

[lnurl]: https://github.com/lerna/lerna
[czcli]: http://commitizen.github.io/cz-cli/
[svurl]: https://github.com/conventional-changelog/standard-version
