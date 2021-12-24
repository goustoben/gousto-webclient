Gousto Web Client
====

#### master :shield: [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/master.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/master)
#### develop :hammer_and_pick: [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/develop.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/develop)
#### env-carrots :carrot: [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-carrots.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-carrots)
#### env-haricots [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-haricots.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-haricots)
#### env-radishes [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-radishes.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-radishes)
#### env-rockets :rocket: [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-rockets.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-rockets)
#### env-beetroots [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-beetroots.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-beetroots)
#### env-parsnips (kale) [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-parsnips.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-parsnips)

## Quick start

```bash
# 1. clone this repo
$ git clone git@github.com:Gousto/gousto-webclient.git

# 2. move to the source directory
$ cd gousto-webclient/src

# 3. Add a development-local.json5 config file and setup your hosts file
# See Pre-requisites below

# 4. install node_modules
$ npm i

# 5. start the app in development mode
# For hot module reload see [Detailed guide](./detailed-setup.md) to setup.
$ npm run build:client  
$ npm run dev

```

## Pre-requisites
<!-- (TODO: Add a script to automate these steps behind npm run init --local) -->
<!--This should be covered by running `npm run init --local` but in the event it's not working ...-->
* You'll need to have a `development-local.json5` config file for everything to run correctly [Follow this guide](./detailed-setup.md#step-1-add-a-secrets-file-to-point-to-the-staging-environment)
* You will have to run the site on `frontend.gousto.local` you can do this by [Setting up your local hosts file to run webclient](./detailed-setup.md#step-2-add-an-entry-to-your-local-host-file)
* You'll need to have [nvm](https://github.com/nvm-sh/nvm) installed. See  [Node version management](./detailed-setup.md#node-version-management) for further details.
  * Note: Apple M1 owners - you'll need to set node to version `14` in `.nvmrc`. Be careful not to commit this change.
* If you're not in the office you'll need to be connected to the VPN

## Tests

### Unit tests
```bash
# run unit tests
$ cd src
$ npm run test:jest

# watch an unit tests
$ npm run test:jest:watch ./path/to/file.js
```

### Cypress tests

```bash

# 1. build and run the website (server and client)
$ cd src
$ npm run dev

# 2. in a new terminal window run Cypress tests
$ cd test/regression

# 3. install the dependencies for the Cypress tests if you need to
$ npm i

# 4a. then run the tests
# Desktop
$ npm run test:web
#Mobile
$ npm run test:mobile

# 4b. OR run the tests in the Cypress test runner
# Desktop
$ npm run test:debug:web
#Mobile
$ npm run test:debug:mobile


```

## Detailed guide
For a more detailed guide to running Webclient and its supporting tests, including how to get it running with Gousto2-Frontend please see the [Detailed guide](./detailed-setup.md)

## [Code Health](#code-health)
### Run code health locally
Create a CircleCI access token (“Personal API Tokens” https://circleci.com/account/api) and set it as environment variable:
```
export CIRCLECI_ACCESS_TOKEN=XXXX
```
Then in `src` run:
```
./scripts/compare-code-health.sh
```

## Webpack bundle analyzer

### Usage

In top `src`, invoke `GW_ENABLE_BUNDLE_ANALYZER=1 npm run build`. It will
generate a file `src/public/stats.json`.

Invoke `npm run bundle-analyzer`. It will open a browser window at
http://127.0.0.1:8888 with the size stats for each bundle and its dependencies.

## Axe - accessibility testing engine

In local development, open the browser window at
http://frontend.gousto.local:8080/?axe=1 in order to enable Axe. This will show
the accessibility-related warnings on the pages.

# Project history

Gousto-Webclient was originally ported from Gousto2-Frontend. You can view the Git history of the JS code at:
https://github.com/Gousto/Gousto2-FrontEnd/blob/750691d7/src/nodeserver/src
