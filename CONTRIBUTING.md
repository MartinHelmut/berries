# Contributing

You want do something for this repo? Nice and easy! And of course: you
are the best!

## Contents

* [Issues](#issues)
    * [General](#general)
    * [Labels](#labels)
        * [Common labels](#common-labels)
        * [Type labels](#type-labels)
        * [Status labels](#status-labels)
* [Working in the code](#working-in-the-code)
    * [Environment](#environment)
    * [Setup](#setup)
    * [Tests](#tests)
    * [Format check](#format-check)
    * [Show documentation](#show-documentation)
    * [Commit changes](#commit-changes)
    * [Recommended workflow for release](#recommended-workflow-for-release)
* [Be Nice](#be-nice)

---

## Issues

### General

Issues have a specific pattern for the title:

```markdown
package-name: Here is the title
```

that could look like:

```markdown
acai-cli: Write documentation for tool
```

If you report a bug, please try to:

* Perform a web / GitHub search to avoid creating a duplicate ticket.
* Include enough information to reproduce the problem.
* Mention the exact version of the project causing you problems, as well as any related software and versions (such as operating system, browser, etc.).
* Test against the latest version of the project (and if possible also the master branch) to see if the problem has already been fixed.

Once you have tried the above, create a GitHub issue notifying your bug report.

### Labels

Right now there are three types of labels:

* Common labels
* Type labels
* Status labels

#### Common labels

| Label            | Use case                                                                                                 |
| ---------------- | -------------------------------------------------------------------------------------------------------- |
| good first issue | This label is set if the issue could be resolved by someone who does not know the project.               |
| help wanted      | If there is something where people with different knowledge could really help pushing the issue further. |

#### Type labels

| Label               | Description                                                 |
| ------------------- | ----------------------------------------------------------- |
| type: bug           | This label is used if the issue describes a bug.            |
| type: documentation | Write or change documentation for the project.              |
| type: draft         | Describes as a ongoing process a new berry library or tool. |
| type: feature       | Implements a new feature ot changes existing behaivior.     |
| type: question      | Something that should be discussed with others.             |

#### Status labels

| Label               | Status                                                                   |
| ------------------- | ------------------------------------------------------------------------ |
| status: blocked     | An issue is block of reasons that are mentioned inside the issue itself. |
| status: in progress | The one who is assigned works on that issue.                             |
| status: PR made     | An PR was made and the issue is in his final steps.                      |

**Note:** For _not started yet_ or _finished_ are no status labels required.

## Working in the code

If you want to contribute code, please:

* Follow the same [coding style](#format-check) as used in the project.
* Add an automated test that verifies your code change like described in the [Tests chapter](#tests).
* Write [good commit messages](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html), explain what your patch does, and why it is needed. How to is described in the [Commit changes chapter](#commit-changes).
* Keep it simple: Any patch that changes a lot of code or is difficult to understand should be discussed before you put in the effort.

Once you have tried the above, create a GitHub pull request with your changes changes and feel awesome 🎉.

### Environment

Tested with Node 8 and NPM 5 and up. Also this repository is organised as a monorepo and uses [lerna][lnurl].

### Setup

Clone the repo and run an install:

```shell
$ git clone git@github.com:MartinHelmut/berries.git && cd berries && npm install
```

To only bootstrap the application run:

```shell
npx lerna bootstrap
```

### Tests

Tests are written in [Jest][jturl]. To run all tests execute

```shell
$ npm test
```

and to lint the code:

```shell
$ npm run lint:js && npm run lint:css
```

### Format check

You can also run a prettier verification for all JS files in all packages with:

```shell
$ npm run fmt:check
```

This will list changes that would be made on commit (commit hook is installed with husky).

### Show documentation

To create and serve the documentation run the following command **inside a specific package**:

```shell
$ npm run docs
```

### Commit changes

**This repo is is Commitizen-friendly!** ([read more][czcli])

Checkout a new branch, e.g.:

```shell
$ git checkout -b task/do-something
```

**There is no specific naming convention for branches.**

Add your changes and run `npm run commit` to start the commitizen cli to create a proper commit message.

Create a "Pull Request" on Github and be awesome! 😎

### Recommended workflow for release

1. Make changes
2. Commit those changes with `npm run commit`
3. Make sure all tests turn green with `npm test`
4. Publish: `npm run publish`
5. **Done!**

For more information on building a release see [https://github.com/conventional-changelog/standard-version][svurl]

## Be Nice

Please follow the defined [code of conduct](CODE_OF_CONDUCT.md).

[lnurl]: https://github.com/lerna/lerna
[czcli]: http://commitizen.github.io/cz-cli/
[svurl]: https://github.com/conventional-changelog/standard-version
[jturl]: https://facebook.github.io/jest/
