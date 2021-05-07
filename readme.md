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
* If running locally, install Node.js.

We use nvm to control the version of node devs use and there is an .nvmrc in the repo root that should be picked up by nvm and states the current version of node we use. So using a node version manager such as nvm or fnm (if you use fish shell) to install node is advised.
* Please see below the [Automatic Node Version Control](#automatic-node-version-control)

### Run application for development

### Step 1: Add a secrets file to point to the staging environment

**Note:** VPN is required to connect to staging before running dev-box and web-client.

Add a file called `development-local.json5` in `/src/config` and add the JSON below changing the values for the correct staging keys. This file will not be tracked as it is listed in our `.gitignore`.
This file is used by node-config (see below for more info).

```json5
{
  "api_name": "staging", //could be production if you wanted to point to production apis
  "domain": "gousto.local", //this is used in only one place currently, the help centre links
  "running_env": "local", //always local as you are not running on AWS
  "api_token": "inbound_frontend_access_key_goes_here",
  "auth_client_secret": "frontend_service_secret_goes_here",
  "checkout_pk": "checkout_pk_test_token_goes_here" ,
}
```

You can get these secrets from S3 for [`staging` from here](https://s3.console.aws.amazon.com/s3/object/s3-gousto-platform-beta?region=eu-west-1&prefix=staging/config/service/webclient.yml) (if you need another environment you can change `staging` in the url to the environment you need).

### Step 2: Add an entry to `/etc/hosts` file.

Add the following entry to /etc/hosts to point `frontend.gousto.local` to localhost, if you haven't already done so as part of the G2FE setup.

`127.0.0.1 frontend.gousto.local`

### Step 3: Run development environment

**Note:** VPN is required to connect to staging before running dev-box and web-client.

Webclient can either be run without G2FE as a standalone on port 8080, or as part of the whole FE stack with G2FE.

To access the service simply navigate to `frontend.gousto.local:8080` or if running with G2FE as well, simply navigate to `frontend.gousto.local`.

The service can be run in docker, or run outside. Running outside is faster for sure.

A script in the repo root called `./run.sh` has been created to help with all of these scenarios.

* `./run.sh build` will build a Docker image using the checked out files to run the Webclient service.
* `./run.sh run` will run that image in a Docker container.
* `./run.sh dev --docker` will run the image in a Docker container, but bind mounts in your local repo over the top. You can use this to develop code without installing npm or node etc. It will be a little slower than native development.
* `./run.sh dev --host` will build and run the service on the host. This will require node installed.

To rebuild the app when running in docker you can choose the following.
Either
   * rebuild the image by doing `docker image rm webclient` and then re-executing `./run.sh build`
   * if using bind mounts (`dev --docker`), do either of the following:
     * `docker-compose exec webclient npm run watch`
     * `docker compose exec webclient bash`, and run `npm run watch` same as you would when running locally.

**If you are switching from running it with `dev --docker` to `dev --host` or vice versa you'll have to run `npm rebuild node-sass` before running again as the node-sass binaries are compiled against a specific CPU architecture and OS which differ from within the Docker container and outside it.**

All files that this script uses can be found under the folder `dev-env`.

## Automatic Node Version Control
### ZSH
Sometimes NVM doesn’t set the correct default version, this is cause your terminal isn't looking for .nvm files and loading the correct version of node.

You can fix this by adding a hook into your ~/.zshrc after nvm directory is setup.
```shell
export NVM_DIR=~/.nvm
 [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

# place this after nvm initialization!
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

###FNM
Copy and paste the output of `fnm env --use-on-cd` into `~/.config/fish/conf.d/fnm.fish`. See more [here](https://github.com/Schniz/fnm).

## Ignore bulk-change revisions (optional)

Because of a migration to prettier, there were several bulk formatting changes.  In order to make them not show up in your `git blame` invocations, you might want to invoke this command inside the repo, once only after cloning:

`git config blame.ignoreRevsFile .git-blame-ignore-revs`

## Quick guide to `node-config`

We use [`node-config`](https://github.com/lorenwest/node-config) to handle passing environment variable into webpack. `node-config` is a file based, and looks at files inside our `src/config` folder.

We have two variables we can set for `node-config` to pick up specific files. The first being  `NODE_CONFIG_ENV` which we set to match the environment (e.g. `development`, `radishes`, `staging`, `production`) and the second is `NODE_APP_INSTANCE` which we set to the where the app is running (`local`, `live`).

`node-config` will load each file, and if the keys match the later file to be loaded will overwrite the variable.

These are the files, and the order of execution:

1. default environment variable. We keep all keys in here, so it's a singular place we can see all our variable. **Will always be loaded**.
   * `config/default.json5`

2. This is load based on the `NODE_CONFIG_ENV`, if not defined will not be loaded
   * e.g. `config/staging.json5`
   * `config/{NODE_CONFIG_ENV}.json5`

3. this is load based on the `NODE_APP_INSTANCE`, if not defined will not be loaded
   * e.g. `config/local.json5`
   * `config/{NODE_APP_INSTANCE}.json5`

4. This is load based on the `NODE_CONFIG_ENV` and `NODE_APP_INSTANCE`, if neither are defined will not be loaded
  * `config/staging-local.json5`
  * `config/{NODE_CONFIG_ENV}-{NODE_APP_INSTANCE}.json5`

5. This file can/will load variable from shell that are defined, this file is the last called and if the environment variables exist/defined it will overwrite that variable in the JSON file. **Will always be loaded**.
  * `config/custom-environment-variables.json5`

See [`node-config`](https://github.com/lorenwest/node-config) for more information.

## Adding a new API endpoint
API endpoints are now statically defined in config for each environment, that are loaded by node-config as detailed above.

Modify the environments block in these files `config/default.json5` and each of the team envs e.g. (`config/rockets.json5`)
This block is structured in the following way:
```json5
{
  "endpoints": {
    "<apiEnvironmentToPointTo>": {
      "services": {
        "<serviceName>": {
          "<versionAsInteger>": {
            clientSide: { //These are the urls used by a browser, they are identical as the browser is always accessing from outside of AWS
              "live": "https://<apiEnvironmentToPointTo>-api.<domainName>/<serviceName>/<versionString>",
              "local": "https://<apiEnvironmentToPointTo>-api.<domainName>/<serviceName>/<versionString>",
            },
            serverSide: { //These are the urls used by the server side call
              "live": "http://<apiEnvironmentToPointTo>-<serviceName>.<domainName>", //Used by a server deployed in AWS
              "local": "https://<apiEnvironmentToPointTo>-api.<domainName>/<serviceName>/<versionString>" //Used by a server running locally
            }
          }
        }
      }
    }
  }
}
```

Unless you specifically know that the new endpoint is an exception to the rule, such as `core`, `loggingmanager` and `webclient`, please use the above format / follow the structure of other APIs in the block.

## Deployment
### Deployment without a new route
1. Deploy into staging by raising a PR into `develop`
2. Once the staging deployment is successful, then deploy into production by raising a PR into `master`

### Deployment including a new route
Routing is handled by the old-stack [Gousto2-Frontend](https://github.com/Gousto/Gousto2-FrontEnd) application, meaning new (root-level) routes must be added to the nginx config here and this should be deployed too.

See the [G2FE readme](https://github.com/Gousto/Gousto2-FrontEnd) for how to add a new route to the frontend.

## Testing
### Running unit tests

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
The regression tests have their own `package.json` which can be found under tests/regression. All commands assume you are within that directory.

```shell
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
cd /tests/e2e
npm ci
node installLocal.js
```

#### Local environment (for your local machine, even if you point to Staging)
First, have the application running and pointing to Staging

Then build the e2e tests:
```shell
cd src
npm run build:e2e:local
```
Always build after changes have been made in your code.

Then run the e2e tests:
```shell
cd ~/code/goustowebclient/tests/e2e
npm test
```

#### Staging environment (only for CircleCI)
```shell
cd src
npm run build:e2e
cd ../tests/e2e
npm run test:staging
```

To run a specific tag (look at the end of the test files for the tags) use:
`npm run test -- --tag gousto`

Staging e2e tests run using a selenium server hosted on AWS. You may need to check the health of this server if the tests are not running properly - the `i-staging-selenium` EC2 instance.

## [Code editor setup](#code-editor-setup)
Please install [EditorConfig](https://editorconfig.org/) for your text editor or IDE, it basically support most if not all commonly used editors (Sublime Text, VS Code, Vim, Brackets, Atom, all JetBrains products and etc). The purpose of this plugin is to ensure that everyone pushes code with the same code indentation, spacing and some other less common known configs such as ensure all file to have a final new line. It is super simple to use, just install the plugin then you won't need to do anything else. The plugin will automatically apply indentation rules from the .editorconfig file in the root of the repo.

Why is this important? Imagine two developer working on the same file, one person has tab indentation with size of 4, and the other has space indentation with size of 2. Even if they change nothing in the shared file, just by running commands such as `format document` git will pick it up as all lines changed. This makes tracking and tracing changes very difficult (not mentioning how eye strain it is when it comes to code review).

### Use of Prettier
This project is in the process of gradual migration to Prettier.  As such, only the files whitelisted under `src/.prettierignore` should be formatted with prettier.

This means that generally, you shouldn't configure your IDE to format every file on save: instead it should respect the `.prettierignore` file if it's possible.  Sorry for the inconvenience.

#### Migrating a new route

If you'd like to introduce prettier inside an unmigrated-yet route, please follow these steps:

1. Modify "files" section under "Make eslint rules agree with prettier" in
   `src/.eslintrc.js`
2. Modify the end of `src/.prettierignore`
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
