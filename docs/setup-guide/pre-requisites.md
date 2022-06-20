# Development pre-requisites

## Shell

Instructions in this guide assume you are using `zsh` and are automatically sourcing `~/.zshrc`

## Node

Install [NVM](https://github.com/nvm-sh/nvm) on your system; this will then use the Node version specified in `.nvmrc`.

### M1 chip users

Apple M1 users should set the `.nvmrc` version to `14` - do not commit this change.

You should install the right Node binaries by first switching to Rosetta 2 shell:

```shell
arch -x86_64 zsh
nvm install v14.18.1
```

### XCode errors

When installing node with nvm, if you encounter `gyp: No Xcode or CLT version detected`, try reinstalling the XCode
Command Line Tools as follows:

```
# check XCode CLT directory location
xcode-select --print-path

# remove XCode CLT directory
sudo rm -rf $(xcode-select --print-path)

# reinstall XCode CLT
xcode-select --install
```

## Yarn

This is a Yarn 3 project. Install Yarn 1 on your system (e.g. `brew install yarn`), and it will bootstrap
from `src/.yarn/releases`.

## VPN connection

To make network requests to services on staging (the usual config) or a lower environment, you must be either in
the office or on the VPN.

## AWS CLI

You will use AWS CLI v2 to obtain a CodeArtifact token - this is required to install all the dependencies. If you are
a new starter ensure you have an account with `EngineerCodeArtifact` permissions.

## Editor

For consistent formatting, please set up your editor to support [EditorConfig](https://editorconfig.org/) and automatic
prettier formatting / eslint highlighting.

## Secrets

To run webclient against a deployed backend environment you will need some AWS SSM secrets for that environment. You'll
need someone on your team to help who has BabyPotato permissions and can send you these details securely.
