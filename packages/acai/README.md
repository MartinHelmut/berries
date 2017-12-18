# @berries/acai

<p align="center">
    <img
        src="logo.svg"
        width="350"
        height="255"
        alt="Berries acai logo with three berries and two leafs."
    />
</p>

[![Commitizen friendly][cfimg]][cfurl]
[![code style: prettier][ptimg]][pturl]

Calculate bugs in git repositories based on commit messages.

## Table of contents

* [Environment](#environment)
* [How to use](#how-to-use)
* [Disclaimer](#disclaimer)
* [License](#license)

## Environment

* Node >= 8
* NPM >= 5

## How to use

Lorem ipsum ...

## Disclaimer

This implementation was inspired by multiple other similar packages in different languages, e.g.:

* [bugspots][b1url] from [igrigorik][u1url] (Ruby)
* [python-bugspots][b2url] from [niedbalski][u2url] (Python)

The idea behind this tool came from a 2011 article by Google called ["Bug prediction by Google"][bpurl]. Later there was also a [case study going deeper into detail][csurl]. The whole idea to "predict bugs" on a code base was then stopped because of no real benefits to the developer (see also ["Issues with Google’s Bug Prediction Algorithm"][biurl]).

**So why still do it again?** I ported it to provide a node library on the one hand and a cli tool on the other to use it for further tooling to provide better results for this kind of "bug spot calculation". Not only name files that could contain bugs, but also show where bugs (like a [heatmap][hmurl]) in a file could appear and why they appeared in the past. The heatmap and "why" feature will be implemented in future releases.

## License

MIT

[cfimg]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[cfurl]: http://commitizen.github.io/cz-cli/
[ptimg]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[pturl]: https://github.com/prettier/prettier
[bpurl]: http://google-engtools.blogspot.de/2011/12/bug-prediction-at-google.html
[csurl]: https://static.googleusercontent.com/media/research.google.com/en/us/pubs/archive/41145.pdf
[biurl]: http://www.boyter.org/2015/07/issues-googles-bug-prediction-algorithm/
[b1url]: https://github.com/igrigorik/bugspots
[u1url]: https://github.com/igrigorik
[b2url]: https://github.com/niedbalski/python-bugspots
[u2url]: https://github.com/niedbalski
[hmurl]: https://en.wikipedia.org/wiki/Heat_map
