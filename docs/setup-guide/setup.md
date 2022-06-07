# Development setup

Make sure you've already covered the [pre-requisites](pre-requisites.md).

These steps will take roughly an hour:

1. [Checkout](#checkout)
2. [Working with workspaces](#working-with-workspaces)
3. [Create your env file](#create-your-env-file)
4. [Setup hosts](#setup-hosts)
5. [Setup CodeArtifact](#setup-codeartifact)
6. [Get the CodeArtifact token](#get-the-codeartifact-token)
7. [Install dependencies](#install-dependencies)
8. [Testing all is well](#testing-all-is-well)

If you have any trouble

- double-check the documentation
- read any error messages carefully
- search the docs and Slack for the error messages
- finally, reach out on #guild-frontend

### Checkout

Checkout via SSH

```
git checkout git@github.com:Gousto/gousto-webclient.git
```

### Working with workspaces

Webclient is a Yarn 3 workspaces project, which means you run Yarn commands in either individual workspaces, at root
level, or across all workspaces.

> ℹ️ You can see the list of workspaces with `yarn workspaces list --json`. Note the `name` fields.

To run a command in the 'main' webclient, you need to run it in the `webclient` workspace:

```
yarn workspace webclient eslint
```

A faster way is to set up a bash alias. Inside your `~/.zshrc` file add the following line and reset your shell:

```
alias yw="yarn workspace"
```

Now in any Yarn workspaces project you can use `yw` as a shortcut, e.g. `yw webclient eslint`.

The remainder of the guide assumes you've set up the `yw` alias.

### Create your `.env` file

The application will read config from `src/apps/webclient/server/.env`, which is git-ignored.

Create a `.env` file using `.env.example` as a template. You will fill these in with the help of a teammate who has
'BabyPotato' AWS permissions to read AWS SSM secrets for the environment you're running against (typically `staging`).

The `.env` file specifies entries in the format `KEY=value` with one line per pair.

> ⚠️ If you fail to set this up you will see errors like
> `Error: No environment variable with key DATADOG_BROWSER_LOGS_CLIENT_TOKEN`

### Setup hosts

Add the following to your hosts file, so you can access the application on http://frontend.gousto.local:8080

```
127.0.0.1 frontend.gousto.local
```

> ❓Why this domain? Because of the way CORS and auth cookies are configured on lower environments.

### Setup CodeArtifact

This application uses some internal packages. These are downloaded from AWS CodeArtifact and require permissions to
access.

This step isn't specific to webclient; it will help you when working with our Node projects too.

You should start by following the Potatoes documentation for setting up a named AWS CLI profile, until given a choice of
AWS account:

[Confluence docs](https://gousto.atlassian.net/wiki/spaces/TECH/pages/3620536327/AWS+Access+through+OKTA#Accessing-the-AWS-CLI---setting-up-named-profiles)

When prompted to choose an AWS account, select `Gousto Artefacts`. This creates a local AWS profile called
`EngineerCodeArtifact-472493421475`. (The number is our primary AWS account ID)

We now want a bash function to quickly get an authorization token. Add the following to you `~/.zshrc`:

```shell
function ca-authenticate() {
  set -x
  export CODEARTIFACT_AUTH_TOKEN=$(aws codeartifact get-authorization-token --domain gousto --domain-owner 472493421475 --query authorizationToken --output text --profile EngineerCodeArtifact-472493421475)
  npm config set //gousto-472493421475.d.codeartifact.eu-west-1.amazonaws.com/npm/proxy-repository/:_authToken=$CODEARTIFACT_AUTH_TOKEN
}
```

> ℹ️ This function fetches an authentication token for CodeArtifact, then exports it as the variable
> `CODEARTIFACT_AUTH_TOKEN`. You can see how this is imported within `.yarnrc.yml`

Remember to source / reset your shell before calling the function.

### Get the CodeArtifact token

Now we have the means to get a token, let's go get one:

```shell
$ ca-authenticate
```

The following should print a base64 string:

```shell
echo $CODEARTIFACT_AUTH_TOKEN
```

You'll need to call this function again if your token expires and Yarn needs to re-fetch a private package.

### Install dependencies

Now let's install the node modules for all the workspaces:

```shell
yarn install
```

> ℹ️ Although this is a Yarn project we're not yet using plug-n-play. This may change in future.
> Package hoisting is currently disabled for compatibility with the webclient build process.

### Testing all is well

Verify project setup by running the main webclient unit tests:

```shell
yw webclient test:jest
```
