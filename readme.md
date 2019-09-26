Gousto Web Client
====

master: [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/master.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/master)
develop: [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/develop.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/develop)
env-carrots: [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-carrots.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-carrots)
env-haricots: [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-haricots.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-haricots)
env-radishes: [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-radishes.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-radishes)

## Old documentation

Please find the documentation related to old Vagrant devbox here: https://github.com/Gousto/gousto-webclient/blob/develop/readme_legacy.md

## Getting Started
### Code editor setup
Please install [EditorConfig](https://editorconfig.org/) for your text editor or IDE, it basically support most if not all commonly used editors (Sublime Text, VS Code, Vim, Brackets, Atom, all JetBrains products and etc). The purpose of this plugin is to ensure that everyone pushes code with the same code indentation, spacing and some other less common known configs such as ensure all file to have a final new line. It is super simple to use, just install the plugin then you won't need to do anything else. The plugin will automatically apply indentation rules from the .editorconfig file in the root of the repo.

Why is this important? Imagine two developer working on the same file, one person has tab indentation with size of 4, and the other has space indentation with size of 2. Even if they change nothing in the shared file, just by running commands such as `format document` git will pick it up as all lines changed. This makes tracking and tracing changes very difficult (not mentioning how eye strain it is when it comes to code review).

## New Stack Development

### Pre-requisites
* Kubernetes development box is setup: https://github.com/Gousto/devbox-platform
* Check which version of node you have installed with `node -v` - make sure it is a version of 10 (most people in team are currently using 10.14) - to change node version `nvm install v10.14.1`
* Webclient application dependencies installed:
  * `yarn global add bower` followed by `bower install` for the ui-components library. Use `bower install --force` when updating the version of ui-components.
  * `yarn` for the remaining dependencies

### Terminal 1: Building

Make sure to have the devbox-platform running with all dependencies installed before starting this step. 

You need to build the application and run the watcher before running it into the devbox
```shell
cd ~/code/goustowebclient/src
yarn run watch
```

### Terminal 2: Starting (after the first terminal has completed building the bundles)

This will create the container images and deploy them into the devbox with a watcher for files syncronisation.
```shell
cd ~/code/goustowebclient
skaffold dev
```

**Note: by default skaffold uses polling to see if files have changed, this process can be very intensive and can drain
your battery. You can play with the polling timeout using `skaffold dev -i <poll-interval-in-ms>` (default value is `1000`).**

The site (only the new stack pages) should now be available at http://webclient.gousto.local

You can see the containers logs being redirected to this terminal (nginx and application), exit with `CTRL+C`

### [Local files needed](#local-files-needed)
You will need to copy the `env.json.example` to `env.json` in `/src/config` with the correct values for your environment.

You will also need to populate the checkout.com public key in `src/src/routes/Checkout/Components/CheckoutPayment/config.js`

Speak to members of your team to get these, or find them in circle ci.


### Run the webclient in the devbox for non-developers

You need to build the application and run it into the devbox
```shell
cd ~/code/goustowebclient/src
yarn run build:dev
cd ..
skaffold run
```

To remove the application
```shell
cd ~/code/goustowebclient
skaffold delete
```

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
3) deploy the webclient

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
Ensure that you have local files set up as described in the [Local files needed](#local-files-needed) section, and that the [endpoint.js](https://github.com/Gousto/gousto-webclient/blob/develop/src/src/config/endpoint.js) file is pointing to the environment APIs that you wish to test against.
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
