# Contributing

You want do something for this repo? Nice and easy! And of course: you
are the best!

## Contents

- [Issues](#issues)
  - [General](#general)
- [Working in the code](#working-in-the-code)
  - [Environment](#environment)
  - [Setup](#setup)
  - [Tests](#tests)
  - [Format check](#format-check)
  - [Show documentation](#show-documentation)
  - [Commit changes](#commit-changes)
  - [Recommended workflow for release](#recommended-workflow-for-release)
- [Be Nice](#be-nice)

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

- Perform a web / GitHub search to avoid creating a duplicate ticket.
- Include enough information to reproduce the problem.
- Mention the exact version of the project causing you problems, as well as any related software and versions (such as operating system, browser, etc.).
- Test against the latest version of the project (and if possible also the master branch) to see if the problem has already been fixed.

Once you have tried the above, create a GitHub issue notifying your bug report.

## Working in the code

If you want to contribute code, please:

- Follow the same [coding style](#format-check) as used in the project.
- Add an automated test that verifies your code change like described in the [Tests chapter](#tests).
- Write [good commit messages](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html), explain what your patch does, and why it is needed. How to is described in the [Commit changes chapter](#commit-changes).
- Keep it simple: Any patch that changes a lot of code or is difficult to understand should be discussed before you put in the effort.

Once you have tried the above, create a GitHub pull request with your changes changes and feel awesome 🎉.

### Environment

Tested with Node 10. Also this repository is organised as a monorepo and uses [Rush][rhurl].

### Setup

To work with this repository you need to have [Rush][rhurl] installed. A how too can be found at the [getting started with Rush page][rsurl]. You can check if everything worked fine by running:

```bash
$ rush -v

Rush Multi-Project Build Tool 5.10.3 (unmanaged) - https://rushjs.io

usage: rush [-h] [-d] <command> ...
rush: error: too few arguments
```

If this was successful you can Clone the repo and run the setup:

```bash
git clone git@github.com:MartinHelmut/berries.git && cd berries && rush update
```

There is also a list of [everyday commands for Rush][reurl].

### Tests

Tests are written in [Jest][jturl]. To run all tests execute

```bash
rush test
```

and to lint the code:

```bash
rush lint
```

### Format check

You can also run a prettier verification in all packages with:

```bash
rush format-check
```

### Show documentation

To create and serve the documentation run the following command **inside a specific package**:

```bash
rushx docs
```

### Commit changes

**This repo is is Commitizen-friendly!** ([read more][czcli])

Checkout a new branch, e.g.:

```shell
$ git checkout -b task/do-something
```

**There is no specific naming convention for branches.**

Add your changes and commit them with a nice and commitizen friendly message. This could look like:

```
feat(apps/website): add a new feature
```

When you did all your changes run

```bash
rush change
```

that will prompt you with some questions through the process of creating a change log entry.

And finally create a "Pull Request" on Github and be awesome! 😎

### Recommended workflow for release

1.  Make changes
2.  Commit those changes
3.  Create a change log entry with `rush change`
4.  Publish with `rush publish`
5.  **Done!**

## Be Nice

Please follow the defined [code of conduct](CODE_OF_CONDUCT.md).

[rhurl]: https://rushjs.io/
[rsurl]: https://rushjs.io/pages/intro/get_started/
[reurl]: https://rushjs.io/pages/developer/everyday_commands/
[czcli]: http://commitizen.github.io/cz-cli/
[jturl]: https://facebook.github.io/jest/
