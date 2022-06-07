# Development pre-requisites

### Node

Install [NVM](https://github.com/nvm-sh/nvm) on your system; this will then use the Node version specified in `.nvmrc`.
Apple M1 users should set the `.nvmrc` version to `14` - do not commit this change.

### Yarn

This is a Yarn 3 project. Install Yarn 1 on your system (e.g. `brew install yarn`), and it will bootstrap
from `src/.yarn/releases`.

### VPN connection

To make network requests to services on staging (the usual config) or a lower environment, you must be either in
the office or on the VPN.

### AWS CLI

You will use AWS CLI v2 to obtain a CodeArtifact token - this is required to install all the dependencies. If you are
a new starter ensure you have an account with `EngineerCodeArtifact` permissions.

### Shell

Instructions in this guide assume you are using `zsh` and are automatically sourcing `~/.zshrc`

### Editor

For consistent formatting, please set up your editor to support [EditorConfig](https://editorconfig.org/) and automatic
prettier formatting / eslint highlighting.

### Secrets

To run webclient against a deployed backend environment you will need some AWS SSM secrets for that environment. You'll
need someone on your team to help who has BabyPotato permissions and can send you these details securely.
