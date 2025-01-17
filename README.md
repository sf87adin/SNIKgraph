# SNIK Graph

[![build](https://github.com/snikproject/snik-graph/actions/workflows/build.yml/badge.svg)](https://github.com/snikproject/snik-graph/actions/workflows/build.yml)
[![License: GNU GPLv3](https://img.shields.io/badge/license-GPL-blue)](LICENSE)
![TypeScript](https://badges.aleen42.com/src/typescript.svg)
[![Vite](https://badges.aleen42.com/src/vitejs.svg)](https://vitejs.dev/)

Visualization of the SNIK ontology using the Cytoscape.js graph library.
Live at <https://www.snik.eu/graph> (stable) and <https://snikproject.github.io/snik-graph/index.html> (master branch).
<!--Browse the code documentation [here](https://snikproject.github.io/snik-graph/index.html)!-->

## Installation and Preview

### Node

    git clone https://github.com/snikproject/snik-graph.git
    npm install
    cp js/config.dist.ts js/config.ts
    npm run preview

Open the displayed local link in a browser.

### Develping On Windows

Developing on Windows is not recommended but possible with the following adaptions:

* Instead of `cp js/config.dist.ts js/config.ts`, do `copy js\config.dist.ts js\config.ts` or use the Explorer to copy the file.
* There is [a bug in the underlying libraries](https://github.com/vitejs/vite/issues/10580) that prevents building SNIK Graph with Windows CRLF file endings. If your Git configuration automatically uses CRLF line endings on Windows you must currently convert them to LF.
* lint-staged fails on Windows with "Current directory is not a git directory!". Skip the Husky commit hook with `git commit --no-verify`.

### Docker

    git clone https://github.com/snikproject/snik-graph.git
    docker build . -t snik-graph
    docker run --network="host" snik-graph

Open <http://localhost:8043/> in a browser.

## Usage Requirements
Optimized for PC with mouse, does not work well on mobile devices.
Requires a browser with [ES6 module support](https://caniuse.com/es6-module).

## Documentation

* [Developer Documentation](https://snikproject.github.io/snik-graph/doc)
* [User Manual](https://www.snik.eu/graph/html/manual.html)
* [Layout Help](https://www.snik.eu/graph/html/layoutHelp.html)
* [Troubleshooting](https://www.snik.eu/graph/html/troubleshooting.html)
* [SNIK Project Homepage](https://www.snik.eu/)
* generate API documentation in the `docs` folder with `npm run doc`

## Development

### Scripts
* `npm run dev` dev server
* `npm run build` build into `dist`
* `npm run preview` serve the `dist` folder
* `npm run test` run unit tests
* `npm run doc` generate API documentation
* `npm run prepare` automatically run on `npm install`, prepare Husky Prettier commit hook

### Update
1. `git pull`
2. `npm update`
3. if there are new keys in the config file, you may need to copy `js/config.dist.js` to `js/config.js` again

Make sure it runs locally before updating on the server, see releasechecklist.md.

### Code Style
Specified in the [ESlint](.eslintrc.json) and [Prettier](.prettierrc) configuration files.
Husky will apply Prettier formating on every commit.

### LogLevels
* `trace`: very verbose information for debugging
* `debug`: information for debugging
* `info`: generally useful information, not only for developers (default)
* `warn`: for problems that are recoverable
* `error`: for errors that shut down the application

## Adaptation
If you like SNIK Graph and want to use it with different data, please open an issue.
If the website and the SPARQL endpoint are on different domains, you may need to [enable CORS in the SPARQL endpoint](http://vos.openlinksw.com/owiki/wiki/VOS/VirtTipsAndTricksCORsEnableSPARQLURLs).

## FAQ

### The devs told me a bug was fixed but it still occurs
Browsers may hold an old version of SNIK Graph in the cache.
Go to "Help" -> "About SNIK Graph" to see if you have the newest version and if not delete your browser cache.
If it still occurs, please update the issue if one already exists, if not please file an new issue using "Help" -> "Submit Feedback about the Visualization".

## License
SNIK Graph has a license with copyleft, the [GPLv3](LICENSE) for details.
We want to encourage reuse, modification, derivation and distribution as much as possible, so if that license is a problem for you please contact [Prof. Winter](https://www.people.imise.uni-leipzig.de/alfred.winter) and we try our best to find a solution.
