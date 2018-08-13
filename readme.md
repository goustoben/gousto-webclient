Gousto Web Client
====

master: [![CircleCI](https://circleci.com/gh/Gousto/GoustoWebClient/tree/master.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/GoustoWebClient/tree/master)
develop: [![CircleCI](https://circleci.com/gh/Gousto/GoustoWebClient/tree/develop.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/GoustoWebClient/tree/develop)
env-carrots: [![CircleCI](https://circleci.com/gh/Gousto/GoustoWebClient/tree/env-carrots.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/GoustoWebClient/tree/env-carrots)
env-haricots: [![CircleCI](https://circleci.com/gh/Gousto/GoustoWebClient/tree/env-haricots.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/GoustoWebClient/tree/env-haricots)
env-radishes: [![CircleCI](https://circleci.com/gh/Gousto/GoustoWebClient/tree/env-radishes.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/GoustoWebClient/tree/env-radishes)

## Getting Started
### Pre-requisites
Please ensure the development box is setup: https://github.com/Gousto/Vagrant
```shell
yarn
```

## New Stack Development
### Terminal 1: Building

Although tasks can be run within the devbox, it's more performant to run tasks outside the devbox
```shell
cd ~/code/goustowebclient/src
npm run watch
```

### Terminal 2: Starting
```shell
cd ~/Vagrant && vagrant ssh
cd /var/www/goustowebclient/src
npm run start
```

The site should now be available at http://webclient.gousto.local


## Testing
### Installation
#### 1. Java Runtime

Confirm if you currently have a Java Runtime Environment with `java --version`. If you have no JRE, install using homebrew;

```shell
brew update
brew cask install java
```

#### 2. Nightwatch / Selenium
```shell
cd ~/code/goustowebclient/tests/e2e
npm i
node installLocal.js
```

### Running Unit Tests

## Jest
```shell
cd ~/code/goustowebclient/src
npm run test:jest
```

Additional commands:
- Run on one file: `npm run test:jest:one <filename>`
- Run a watcher on one file: `npm run test:jest:one:watch <filename>`
- Run a watcher: `npm run test:jest:watch`

Notes:
You may need to get the latest version of watchman to run Jest's watch mode.
```shell
brew install watchman
```

## Mocha
```shell
cd ~/code/goustowebclient/src
npm run test
```

### Running End-To-End tests
#### Local environment
```shell
cd ~/code/goustowebclient/src
npm run build:e2e:local
cd ~/code/goustowebclient/tests/e2e
npm run test
```

#### Staging environment
Please ensure the selenium server is up and running at the host, e.g. AWS
```shell
cd ~/code/goustowebclient/src
npm run build:e2e
cd ~/code/goustowebclient/tests/e2e
npm run test:staging
```

To run a specific tag use:
`./node_modules/.bin/nightwatch --tag gousto`

## Webpack bundle analyzer

Your builds will generate now a file: public/stats.json (only in local)

### Installation

Only the first time: `npm i -g webpack-bundle-analyzer`

### Usage

Run
`npm run bundle-analyzer`
or
`yarn run bundle-analyzer`

It will spin up a server that reads from the stats.json file.

You can see the size of each part of your bundle and interact (zoom) with it by going to `http://127.0.0.1:8888/`

You can see sizes for raw, parsed or gzip. Find out more here:
https://www.npmjs.com/package/webpack-bundle-analyzer
