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
  * [Run tests](#run-tests)
  * [Show documentation](#show-documentation)
  * [Commit changes](#commit-changes)
  * [Recommended workflow for release](#recommended-workflow-for-release)

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

The description should be as clear as possible. Sub-tasks could also be added by a task list.

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

### Environment

Tested with Node 8 and NPM 5 and up. Also this repository is organised as a monorepo and uses [lerna][lnurl].

### Setup

Clone the repo and run an install:

```shell
$ git clone git@github.com:MartinHelmut/berries.git && cd berries && npm install && npx lerna bootstrap
```

### Run tests

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

[lnurl]: https://github.com/lerna/lerna
[czcli]: http://commitizen.github.io/cz-cli/
[svurl]: https://github.com/conventional-changelog/standard-version
