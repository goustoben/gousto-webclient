Gousto Web Client
====

master: [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/master.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/master)
develop: [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/develop.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/develop)
env-carrots: [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-carrots.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-carrots)
env-haricots: [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-haricots.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-haricots)
env-radishes: [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-radishes.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-radishes)

## Getting Started
### Pre-requisites
Please ensure the development box is setup: https://github.com/Gousto/Vagrant

##Webclient only provisioning
### Pre-requisites
Please ensure the development box is setup: https://github.com/Gousto/Vagrant
Please ensure to have provisioned the Frontend: https://github.com/Gousto/Gousto2-FrontEnd

### Connect to the devbox
``` vagrant up && vagrant ssh ```

### Provision the Webclient
```cd /vagrant
./provision-service.sh goustowebclient webclient
```

## New Stack Development
### Terminal 1: Building

Although tasks can be run within the devbox, it's more performant to run tasks outside the devbox
```shell
cd ~/code/goustowebclient/src
yarn run watch
```

### Terminal 2: Starting
```shell
cd ~/Vagrant && vagrant ssh
cd /var/www/goustowebclient/src
yarn run start
```

The site should now be available at http://frontend.gousto.local (We use the Frontend as proxy to the NginX server)

## Deployment
### Proxy set
If you are creating a new route, please ensure to add the proper Proxypass rule in the Frontend: https://github.com/Gousto/Gousto2-FrontEnd/blob/develop/ansible/roles/frontend/templates/apache2_frontend.j2 
E.g. ```ProxyPass /mycoolpage {{ webclient_domain }}/mycoolpage```

### Frontend deployment
#### 1. No new route
In case it haven't been created a new route (see above) it would be possible to deploy the webclient only (opening a PR)
#### 2. New route
In case a new route has been created:
1) ensure to have properly set the proxy in the Frontend (see above) 
2) deploy the Frontend first
3) deploy the weclient

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
yarn
node installLocal.js
```

### Running Unit Tests

## Jest
```shell
cd ~/code/goustowebclient/src
yarn run test:jest
```

Additional commands:
- Run on one file: `yarn run test:jest:one <filename>`
- Run a watcher on one file: `yarn run test:jest:one:watch <filename>`
- Run a watcher: `yarn run test:jest:watch`

Notes:
You may need to get the latest version of watchman to run Jest's watch mode.
```shell
brew install watchman
```

## Mocha
```shell
cd ~/code/goustowebclient/src
yarn run test:mocha
```

### Running End-To-End tests
#### Local environment
```shell
cd ~/code/goustowebclient/src
yarn run build:e2e:local
cd ~/code/goustowebclient/tests/e2e
yarn run test
```

#### Staging environment
Please ensure the selenium server is up and running at the host, e.g. AWS
```shell
cd ~/code/goustowebclient/src
yarn run build:e2e
cd ~/code/goustowebclient/tests/e2e
yarn run test:staging
```

To run a specific tag use:
`./node_modules/.bin/nightwatch --tag gousto`

## Webpack bundle analyzer

Your builds will generate now a file: public/stats.json (only in local)

### Installation

Only the first time: `yarn install -g webpack-bundle-analyzer`

### Usage

Run
`yarn run bundle-analyzer`

It will spin up a server that reads from the stats.json file.

You can see the size of each part of your bundle and interact (zoom) with it by going to `http://127.0.0.1:8888/`

You can see sizes for raw, parsed or gzip. Find out more here:
https://www.npmjs.com/package/webpack-bundle-analyzer
