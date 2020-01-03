Gousto Web Client
====

#### master :shield: [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/master.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/master)
#### develop :hammer_and_pick: [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/develop.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/develop)
#### env-carrots :carrot: [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-carrots.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-carrots)
#### env-haricots [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-haricots.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-haricots)
#### env-radishes [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-radishes.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-radishes)
#### env-rockets :rocket: [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-rockets.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-rockets)

## Getting Started

* Your IDE is setup following the [Code editor setup](#code-editor-setup)
* You development box is setup following the [devbox-platform](https://github.com/Gousto/devbox-platform) instructions, which include:
  *  Setting client auth secrets and env variables
  *  Building the containerised application
  *  Running the application at http://frontend.gousto.local
  *  Watching the application for local development

## Deployment
### Deployment without a new route
1. Deploy into staging by raising a PR into `develop`
2. Once the staging deployment is successful, then deploy into production by raising a PR into `master`

### Deployment including a new route
Routing is handled by the old-stack [Gousto2Frontend](https://github.com/Gousto/Gousto2-FrontEnd) application, meaning new (root-level) routes must be added to the nginx config here and this should be deployed too.

1. Add a the new route in the [redirect rules config](https://github.com/Gousto/Gousto2-FrontEnd/blob/develop/ansible/roles/frontend/templates/nginx/redirect_rules.conf.j2), for example:
```
location = /my-new-route {
  include frontend-proxy.conf;
  proxy_pass $webclient$1;
}
```
2. Deploy [Gousto2Frontend](https://github.com/Gousto/Gousto2-FrontEnd)
3. Deploy Web Client following the steps above

## Testing
### Running unit tests

#### Jest
```shell
cd ~/code/goustowebclient/src
yarn test:jest
```

Additional commands:
- Run on one file: `yarn test:jest:one <filename>`
- Run a watcher on one file: `yarn test:jest:one:watch <filename>`
- Run a watcher on all files: `yarn test:jest:watch`

Note:
You may need to get the latest version of watchman to run Jest's watch mode.
```shell
brew install watchman
```

### Running end-to-end tests
You will need the following installed:
1. Java Runtime. Check if already installed with `java --version`, and if not, install using homebrew:
```shell
brew update
brew cask install java
```
2. Nightwatch/Selenium:
```shell
cd ~/code/goustowebclient/tests/e2e
yarn
node installLocal.js
```

#### Local environment
```shell
cd ~/code/goustowebclient/src
yarn build:e2e:local
cd ~/code/goustowebclient/tests/e2e
yarn test
```

#### Staging environment
```shell
cd ~/code/goustowebclient/src
yarn build:e2e
cd ~/code/goustowebclient/tests/e2e
yarn test:staging
```

To run a specific tag use:
`./node_modules/.bin/nightwatch --tag gousto`

Staging e2e tests run using a selenium server hosted on AWS. You may need to check the health of this server if the tests are not running properly - the `i-staging-selenium` EC2 instance.

## Webpack bundle analyzer

Your builds will generate now a file: public/stats.json (only in local)

### Installation

Only the first time: `yarn install -g webpack-bundle-analyzer`

### Usage

Run
`yarn bundle-analyzer`

It will spin up a server that reads from the stats.json file.

You can see the size of each part of your bundle and interact (zoom) with it by going to `http://127.0.0.1:8888/`

You can see sizes for raw, parsed or gzip. Find out more here:
https://www.npmjs.com/package/webpack-bundle-analyzer

## [Code editor setup](#code-editor-setup)
Please install [EditorConfig](https://editorconfig.org/) for your text editor or IDE, it basically support most if not all commonly used editors (Sublime Text, VS Code, Vim, Brackets, Atom, all JetBrains products and etc). The purpose of this plugin is to ensure that everyone pushes code with the same code indentation, spacing and some other less common known configs such as ensure all file to have a final new line. It is super simple to use, just install the plugin then you won't need to do anything else. The plugin will automatically apply indentation rules from the .editorconfig file in the root of the repo.

Why is this important? Imagine two developer working on the same file, one person has tab indentation with size of 4, and the other has space indentation with size of 2. Even if they change nothing in the shared file, just by running commands such as `format document` git will pick it up as all lines changed. This makes tracking and tracing changes very difficult (not mentioning how eye strain it is when it comes to code review).
