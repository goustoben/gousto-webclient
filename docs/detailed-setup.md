## Getting Started

* Your IDE is setup following the [Code editor setup](#code-editor-setup)
* If running locally, ensure the correct version of node is installed. See [Node Version Management](#node-version-management).

### Run application for development

**Note: local development will consume staging services by default**
To point a local instance of the application to a different environment requires the following steps:

1. Update value of `LOCAL_SERVICE_HOSTNAME` in [./src/apps/webclient/src/config/service-environment/service-url.ts](file:///./src/apps/webclient/src/config/service-environment/service-url.ts) to point to the correct environment.
2. Rebuild the application.
3. Run the application!
4. (Don't forget to change it back before you merge!)


[See it on GitHub](https://github.com/Gousto/gousto-webclient/blob/c57dfd00365277e8daf72f539d677de976846f3a/src/apps/webclient/src/config/service-environment/service-url.ts#L14)


### Step 1: [Create a .env file for run-time server configuration](./config/server-config.md)

- Create a file named `.env` in `src/apps/webclient/server`
- Use `src/apps/webclient/server/.env.example` as a template
- Key/value pairs in the format `KEY=value`
- Get the values by asking someone with BabyPotato permissions to get the AWS SSM secrets for the backend environment
  you want to run against (typically staging)

_Note: this file is gitignored as it may contain secrets_

### [Step 2: Add an entry to](#hosts-file) [your local host file](https://support.acquia.com/hc/en-us/articles/360004175973-Using-an-etc-hosts-file-for-custom-domains-during-development)

Append the following entry to your local host file if you don't already have it, you can open this file using `sudo code /etc/hosts` (VSCode), `sudo vim /etc/hosts` ([VIM](https://dev.to/jeremy/how-to-exit-vim-11dm)) or the editor of your choice.
```
127.0.0.1 frontend.gousto.local
```

### Step 3: Run development environment

**Note:** VPN is required to connect to staging before running web-client.

Webclient can either be run without G2FE as a standalone on port 80, or as part of the whole FE stack with G2FE.

To access the service simply navigate to `frontend.gousto.local:8080` or if running with G2FE as well, simply navigate to `frontend.gousto.local`.

#### Running Webclient with HMR

* `yarn dev` (in `src/apps/webclient`) will build the server and then run it with HMR enabled.
  You'll see output from the server build initially and then the server will start, as it starts the HMR middleware will be invoked and this will build the client for the first time and should result in HMR being enabled for the client. (This process can take upwards of two minutes the first time you do it, so please be patient)
  *PLEASE NOTE*: Using this option does not have a watch on the server files or use nodemon so changes to the server will involve restarting and rebuilding. It might be possible to start the server with nodemon and have changes update automatically but this is not currently included.

There are three other ways to run Webclient. The service can be run in docker, or run outside which will be faster.

**You will need these options to run Webclient alongside G2FE**

A script in the repo root called `./run.sh` has been created to help with all of these scenarios.

## Running webclient without HMR, watching server and client
The default development setup does not enable watching/reloading server changes. This can be achieved by doing the following:
```
# In terminal tab 1
$ yarn watch:client

# In terminal tab 2
$ yarn watch:server

# In terminal tab 3
$ yarn dev:server

**Please note when using the production build, the server will listen on port 80.**
```
#### Option One [Deprecated]
* `./run.sh build` will build a Docker image using the checked out files to run the Webclient service.
* `./run.sh run` will run that image in a Docker container.

  To rebuild the app when running with `./run.sh run` do the following
- rebuild the image by doing `docker image rm webclient` and then re-execute `./run.sh build`.

#### Option Two [Deprecated]
* `./run.sh build` will build a Docker image using the checked out files to run the Webclient service.
* `./run.sh dev --docker` will run the image in a Docker container, but bind mounts in your local repo over the top. You can use this to develop code without installing Yarn or node etc. It will be a little slower than native development.

When running with `./run.sh dev --docker` the app will rebuild by itself thanks to `yarn watch`.

#### Option Three [Deprecated]
* `./run.sh dev --host` will build and run the service on the host. This will require node installed. This command has a Yarn command if you are in the `src/` folder - you can use `yarn dev`.

**If you are switching from running it with `dev --docker` to `dev --host` or vice versa you'll have to run `yarn rebuild node-sass` before running again as the node-sass binaries are compiled against a specific CPU architecture and OS which differ from within the Docker container and outside it.**
**Alternatively just rm your node_modules folder, `dev --docker` will reinstall for you. With `dev --host` you'll have to run `yarn install` yourself**

All files that this script uses can be found under the folder `dev-env`.

## [Node version management](#node-version-management)

We use nvm to control the version of node devs use and there is an `.nvmrc` in the repo root that should be picked up by nvm and states the current version of node we use. So using a node version manager such as nvm or fnm (if you use fish shell) to install node is advised.

### Installing nvm
Follow the [official installation guidance](https://github.com/nvm-sh/nvm#installing-and-updating).

### Configuring automatic version selection (zsh)
To ensure the correct version of node when issuing terminal commands from inside the project directory tree, you can add a hook into your ~/.zshrc file after nvm directory is setup.

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

### Troubleshooting

#### Compilation issues when installing a new version of node via `nvm`

**When installing node with nvm**, if you encounter `gyp: No Xcode or CLT version detected`, try reinstalling XCode Command Line Tools as follows:

```
# check XCode CLT directory location
xcode-select --print-path

# remove XCode CLT directory
sudo rm -rf $(xcode-select --print-path)

# reinstall XCode CLT
xcode-select --install
```

**`nvm install node` fails to install on macOS Big Sur M1 Chip**

The problem manifests itself with lots of compilation warnings in terminal window.

To fix the issue one needs to switch to Rosetta 2 shell:

```
arch -x86_64 zsh
```

and then install node as usual:


```
nvm install v14.18.1
```

### fnm (alternative to nvm)
Copy and paste the output of `fnm env --use-on-cd` into `~/.config/fish/conf.d/fnm.fish`. See more [here](https://github.com/Schniz/fnm).

## Ignore bulk-change revisions (optional)

Because of a migration to prettier, there were several bulk formatting changes.  In order to make them not show up in your `git blame` invocations, you might want to invoke this command inside the repo, once only after cloning:

`git config blame.ignoreRevsFile .git-blame-ignore-revs`

## Adding a new API endpoint
API endpoints are specified in the Service manifest which can be found here: `src/apps/webclient/src/config/service-environment/service-manifest.ts`

Unless you specifically know that the new endpoint is an exception to the rule, such as `core`, `loggingmanager` and `webclient`, please use the above format / follow the structure of other APIs in the block.
Overrides can be provided in the `src/apps/webclient/src/config/service-environment/service-url.ts` file.

## Deployment
### Deployment without a new route
1. Deploy into staging by raising a PR into `develop`
2. Once the staging deployment is successful, then deploy into production by raising a PR into `master`

### Deployment including a new route
Routing is handled by the old-stack [Gousto2-Frontend](https://github.com/Gousto/Gousto2-FrontEnd) application, meaning new (root-level) routes must be added to the nginx config here and this should be deployed too.

See the [G2FE readme](https://github.com/Gousto/Gousto2-FrontEnd) for how to add a new route to the frontend.

## Testing - advanced

#### Running regression tests against a deployed environment
Prepend any of the run commands above setting the environment variable `CYPRESS_baseUrl` to test a deployed version of the webclient
_Please note - if the environment that you wish to test requires VPN access, you will also need to be on the VPN_

```shell
CYPRESS_baseUrl=https://rockets-www.gousto.info yarn test:debug:web
```

All data should be mocked. Cypress has been configured to return a 404 for any real api calls.

### Running end-to-end tests

First, have the application running and pointing to Staging

Then run the e2e tests:

```shell
cd tests/e2e
yarn test
```

#### Staging environment
```shell
cd ../tests/e2e

# Start chromedriver
yarn chromedriver:start

# Separate terminal window
yarn test:staging
```

To run a specific tag (look at the end of the test files for the tags) use:
`yarn test -- --tag gousto`

## [Code editor setup](#code-editor-setup)

Please install [EditorConfig](https://editorconfig.org/) for your text editor or IDE, it basically supports most if not all commonly used editors (Sublime Text, VS Code, Vim, Brackets, Atom, all JetBrains products and etc). The purpose of this plugin is to ensure that everyone pushes code with the same code indentation, spacing and some other less common known configs such as ensure all file to have a final new line. It is super simple to use, just install the plugin then you won't need to do anything else. The plugin will automatically apply indentation rules from the .editorconfig file in the root of the repo.

Why is this important? Imagine two developers working on the same file, one person has tab indentation with size of 4, and the other has space indentation with size of 2. Even if they change nothing in the shared file, just by running commands such as `format document` git will pick it up as all lines changed. This makes tracking and tracing changes very difficult (not mentioning how eye strain it is when it comes to code review).

### Use of Prettier
This project is in the process of gradual migration to Prettier. As such, only the files whitelisted under `src/apps/webclient/.prettierignore` should be formatted with prettier.

This means that generally, you shouldn't configure your IDE to format every file on save: instead it should respect the `.prettierignore` file if it's possible.  Sorry for the inconvenience.

#### Migrating a new route

If you'd like to introduce prettier inside an unmigrated-yet route, please follow these steps in `src/apps/webclient`:

1. Modify "files" section under "Make eslint rules agree with prettier" in
   `.eslintrc.js`
2. Modify the end of `.prettierignore`
3. Invoke `prettier -w src`
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
