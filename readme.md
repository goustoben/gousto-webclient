# Gousto Web Client

Webclient is the Node/React app that serves www.gousto.co.uk. It's owned by [guild-frontend](https://gousto.slack.com/archives/C52LRFWBY).

- [Quick start](#quick-start)
- [Pre-requisites](#pre-requisites)
- [Tests](#tests)
- [Detailed setup](#detailed-setup)
- [Code analysis](#code-analysis)
- [Project history](#project-history)

Further documentation

- [Architecture decision records](docs/decisions)

## Quick start

```bash
# 1. clone this repo
$ git clone git@github.com:Gousto/gousto-webclient.git

# 2. move to the source directory
$ cd gousto-webclient/src

# 3. Add a development-local.json5 config file and setup your hosts file
# See Pre-requisites below

# 4. Install all dependencies
$ yarn install

# 5. Start the main webclient in development mode
# For hot module reload see [Detailed guide](./docs/detailed-setup.md) to setup.
$ yarn build:client
$ yarn dev
```

## Pre-requisites

* You'll need to have Yarn installed - if you install Yarn 1 (`npm install yarn -g`), it will bootstrap Yarn 3 from `.yarn/releases/yarn-3.1.1.cjs`
* You'll need to have a `development-local.json5` config file for everything to run correctly [Follow this guide](./docs/detailed-setup.md#step-1-add-a-secrets-file-to-point-to-the-staging-environment)
* You will have to run the site on `frontend.gousto.local` you can do this by [Setting up your local hosts file to run webclient](./docs/detailed-setup.md#step-2-add-an-entry-to-your-local-host-file)
* You'll need to have [nvm](https://github.com/nvm-sh/nvm) installed. See  [Node version management](./docs/detailed-setup.md#node-version-management) for further details.
  * Note: Apple M1 owners - you'll need to set node to version `14` in `.nvmrc`. Be careful not to commit this change.
* If you're not in the office you'll need to be connected to the VPN

## Tests

### Unit tests

```bash
# run unit tests
$ cd src
$ yarn run test:jest

# watch all unit tests
$ yarn run test:jest:watch

# watch one unit test
$ yarn run test:jest:watch ./path/to/file.test.js
```

### Cypress (regression) tests

```bash

# 1. Build and run the webapp (server and client)
$ cd src
$ yarn dev

# 2. In a new terminal window open Cypress tests
$ cd ../tests/regression

# 3. Run the tests in the command line
# Desktop
$ yarn test:web
#Mobile
$ yarn test:mobile

# 4. Problems? Debug by running the tests in the Cypress test runner
# Desktop
$ yarn test:debug:web
# Mobile
$ yarn test:debug:mobile
```

## Detailed setup
For a more detailed guide to running Webclient and its supporting tests, including how to get it running with
Gousto2-Frontend please see the [Detailed guide](docs/detailed-setup.md)

## Code analysis

### Run code health locally
Create a CircleCI access token (“Personal API Tokens” https://circleci.com/account/api) and set it as environment
variable:
```
export CIRCLECI_ACCESS_TOKEN=XXXX
```
Then in `src` run:
```
./scripts/compare-code-health.sh
```

### Webpack bundle analyzer

In top `src`, invoke `GW_ENABLE_BUNDLE_ANALYZER=1 yarn build`. It will
generate a file `src/public/stats.json`.

Invoke `yarn bundle-analyzer`. It will open a browser window at
http://127.0.0.1:8888 with the size stats for each bundle and its dependencies.

## Axe - accessibility testing engine

In local development, open the browser window at
http://frontend.gousto.local:8080/?axe=1 in order to enable Axe. This will show
the accessibility-related warnings on the pages.

## Project history

Gousto-Webclient was originally ported from Gousto2-Frontend. You can view the Git history of the JS code at:
https://github.com/Gousto/Gousto2-FrontEnd/blob/750691d7/src/nodeserver/src
