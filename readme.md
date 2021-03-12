Gousto Web Client
====

#### master :shield: [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/master.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/master)
#### develop :hammer_and_pick: [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/develop.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/develop)
#### env-carrots :carrot: [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-carrots.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-carrots)
#### env-haricots [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-haricots.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-haricots)
#### env-radishes [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-radishes.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-radishes)
#### env-rockets :rocket: [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-rockets.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-rockets)
#### env-beetroots [![CircleCI](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-beetroots.svg?style=svg&circle-token=26e1e6a6cfe8924476e0eaeb6442f4dfd6e2f160)](https://circleci.com/gh/Gousto/gousto-webclient/tree/env-beetroots)

## Getting Started

* Your IDE is setup following the [Code editor setup](#code-editor-setup)
* You development box is setup following the [devbox-platform](https://github.com/Gousto/devbox-platform) instructions, which include:
  *  Setting client auth secrets and env variables
  *  Building the containerised application
  *  Running the application at http://frontend.gousto.local
  *  Watching the application for local development

### Ignore bulk-change revisions (optional)

Because of a migration to prettier, there were several bulk formatting changes.  In order to make them not show up in your `git blame` invocations, you might want to invoke this command inside the repo, once only after cloning:

`git config blame.ignoreRevsFile .git-blame-ignore-revs`

### Run application for development 

Make sure you have dev-box running as well, `./run.sh dev` and then run

```
npm run watch
```

#### Run pointing to staging

**Note:** VPN is required to connect to staging before running dev-box and web-client.

Add a files called `config/staging-local.json5` and add the JSON below changing the values for the correct staging keys. This file will not be tracked as it is listed in our `.gitignore`.

```json5
{
  "apiToken": "inbound_frontend_access_key_goes_here",
  "authClientSecret": "frontend_service_secret",
  "checkout_pk": "checkout_pk_test_token_goes_here" ,
}
```

You can get these secrets from S3 for [`staging` from here](https://s3.console.aws.amazon.com/s3/object/s3-gousto-platform-beta?region=eu-west-1&prefix=staging/config/service/webclient.yml) (if you need another environment you change change `staging` in the url to the environment you need).

We use [`node-config`](https://github.com/lorenwest/node-config) to handle passing environment variable into webpack. `node-config` is a file based, and looks at files inside our `config` folder.

We have two variable we can set for `node-config` to pick up specific files. The first being  `NODE_CONFIG_ENV` which we set to match the environment (e.g. `development`, `radishes`, `staging`, `production`) and the second is `NODE_APP_INSTANCE` which we set to the where the app is running (`local`, `live`).

`node-config` will load each file, and if the keys match the later file to be loaded will overwrite the variable.

These are file and the order of how they are called: 

1. default environment variable. We keep all keys in here so its a singular place we can see all our variable. **Will always be loaded**.
   * `config/default.json5`

2. This is load based on the `NODE_CONFIG_ENV`, if not defined will not be loaded
   * e.g. `config/staging.json5`
   * `config/{NODE_CONFIG_ENV}.json5`

3. this is load based on the `NODE_APP_INSTANCE`, if not defined will not be loaded
   * e.g. `config/local.json5`
   * `config/{NODE_APP_INSTANCE}.json5`

4. This is load based on the `NODE_CONFIG_ENV` and `NODE_APP_INSTANCE`, if both are not defined will not be loaded
  * `config/staging-local.json5`
  * `config/{NODE_CONFIG_ENV}-{NODE_APP_INSTANCE}.json5`

5. This file can/will load variable from shell that are defined, this file is the last called and if the environment variables exist/defined it will overwrite that variable in the JSON file. **Will always be loaded**.
  * `config/custom-environment-variables.json5`

See [`node-config`](https://github.com/lorenwest/node-config) for more information.

## Deployment
### Deployment without a new route
1. Deploy into staging by raising a PR into `develop`
2. Once the staging deployment is successful, then deploy into production by raising a PR into `master`

### Deployment including a new route
Routing is handled by the old-stack [Gousto2Frontend](https://github.com/Gousto/Gousto2-FrontEnd) application, meaning new (root-level) routes must be added to the nginx config here and this should be deployed too.

1. Add the new route in the Gousto2-FrontEnd [redirect rules config](https://github.com/Gousto/Gousto2-FrontEnd/blob/develop/ansible/roles/frontend/templates/nginx/redirect_rules.conf.j2), for example:
```
location = /my-new-route {
  include frontend-proxy.conf;
  proxy_pass $webclient$1;
}
```
2. Add the new route in the devbox-platform [frontend config](https://github.com/Gousto/devbox-platform/blob/master/config/nginx/config/configs/frontend-redirect.conf), for example:
```
location = /my-new-route {
  include frontend-proxy.conf;
  proxy_pass $webclient:8080$request_uri;
}
```
3. To test the above locally you will have to rebuild the nginx docker image, more information can be found [here](https://github.com/Gousto/Gousto2-FrontEnd/blob/develop/readme.md)
4. Deploy [Gousto2Frontend](https://github.com/Gousto/Gousto2-FrontEnd)
5. Deploy Web Client following the steps above

## Testing
### Running unit tests

#### Jest
```shell
cd ~/code/goustowebclient/src
npm run test:jest
```

Additional commands:
- Run on one file: `npm run test:jest:one <filename>`
- Run a watcher on one file: `npm run test:jest:one:watch <filename>`
- Run a watcher on all files: `npm run  test:jest:watch`

Note:
You may need to get the latest version of watchman to run Jest's watch mode.
```shell
brew install watchman
```

### Running regression tests
```shell
cd goustowebclient/tests/regression
npm install
```

#### Running them in the CLI
For mobile
```shell
npm run test:mobile
```

For web
```shell
npm run test:web
```

#### Running them through the Cypress UI
For mobile
```shell
npm run test:debug:mobile
```

For web
```shell
npm run test:debug:web
```


All data should be mocked. Cypress has been configured to return a 404 for any real api calls.

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
npm ci
node installLocal.js
```

#### Local environment (for your local machine, even if you point to Staging)
First, have the application running and pointing to Staging

Then build the e2e tests:
```shell
cd ~/code/goustowebclient/src
npm run build:e2e:local
```
(always build after changes have been made in your code and these have been rebuilt, for instance when `npm run watch` finishes to pick up your changes)

Then run the e2e tests:
```shell
cd ~/code/goustowebclient/tests/e2e
npm test
```

#### Staging environment (only for CircleCI)
```shell
cd ~/code/goustowebclient/src
npm run build:e2e
cd ~/code/goustowebclient/tests/e2e
npm run test:staging
```

To run a specific tag (look at the end of the test files for the tags) use:
`npm run test -- --tag gousto`

Staging e2e tests run using a selenium server hosted on AWS. You may need to check the health of this server if the tests are not running properly - the `i-staging-selenium` EC2 instance.

## Webpack bundle analyzer

Your builds will generate now a file: public/stats.json (only in local)

### Installation

Only the first time: `npm install -g webpack-bundle-analyzer`

### Usage

Run
`npm run bundle-analyzer`

It will spin up a server that reads from the stats.json file.

You can see the size of each part of your bundle and interact (zoom) with it by going to `http://127.0.0.1:8888/`

You can see sizes for raw, parsed or gzip. Find out more here:
https://www.npmjs.com/package/webpack-bundle-analyzer

## [Code editor setup](#code-editor-setup)
Please install [EditorConfig](https://editorconfig.org/) for your text editor or IDE, it basically support most if not all commonly used editors (Sublime Text, VS Code, Vim, Brackets, Atom, all JetBrains products and etc). The purpose of this plugin is to ensure that everyone pushes code with the same code indentation, spacing and some other less common known configs such as ensure all file to have a final new line. It is super simple to use, just install the plugin then you won't need to do anything else. The plugin will automatically apply indentation rules from the .editorconfig file in the root of the repo.

Why is this important? Imagine two developer working on the same file, one person has tab indentation with size of 4, and the other has space indentation with size of 2. Even if they change nothing in the shared file, just by running commands such as `format document` git will pick it up as all lines changed. This makes tracking and tracing changes very difficult (not mentioning how eye strain it is when it comes to code review).

### Use of Prettier
This project is in the process of gradual migration to Prettier.  As such, only the files whitelisted under `src/.prettierignore` should be formatted with prettier.

This means that generally, you shouldn't configure your IDE to format every file on save: instead it should respect the `.prettierignore` file if it's possible.  Sorry for the inconvenience.

#### Migrating a new route

If you'd like to introduce prettier inside an unmigrated-yet route, please follow these steps:

1. Modify "files" section under "Make eslint rules agree with prettier" in
   `devbox-platform/code/gousto-webclient/src/.eslintrc.js`
2. Modify the end of devbox-platform/code/gousto-webclient/src/.prettierignore
3. In the top `src`, invoke `prettier -w src`
4. Review changes to catch any weirdness (due to automatic semicolon insertion
   or a human-visible change in a React component output)
5. Invoke `./scripts/compare-code-health.sh`
6. For each eslint warning, decide how to fix it:
   - bless: modify overrides in `.eslintrc.js` to say it's not an error
   - pacify: refactor code to make both prettier and eslint happy
   - suppress: add "// eslint-ignore-next-line <type>"
7. For test coverage warnings (due to changing amount of lines and thus
   percentages), find out how to increase the coverage
8. Check that the app behaves the same

*After* the merge into `develop`, add the commit's hash into `.git-blame-ignore-revs` so that the bulk change doesn't show up in people's `git blame` invocations. Unfortunately it requires two merges, because we haven't invented self-referencing commits yet.

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
