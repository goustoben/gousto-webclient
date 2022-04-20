# Local server config (run-time)
## Intent

- Configuration of server and client is configured by the same mechanisms as the deployed application
- Elimination (as much as possible) of local-development-specific logic within the application codebase

The goals above intend to make configuring this application simpler, easier and more understandable.

## Server config - deployed

With regards to config, the current state of webclient's server component is:

- no build-time config* - _enables us to re-use Docker images across environments_.
  - *the single exception is versioning the app at build-time
- ['deploy-time' config for secrets via SSM Parameter Store](https://github.com/Gousto/gousto-platform-deploy/blob/9c25143ac1c0e7fecc5b6e4188ec2630319c0938/cloudformation/common/README.md#L36-L46)
- ['deploy-time' config (not secrets)](https://github.com/Gousto/gousto-platform-deploy/blob/9c25143ac1c0e7fecc5b6e4188ec2630319c0938/cloudformation/common/README.md#L21-L34)

See the ADR [0001-configuration](../decisions/0001-configuration.md) for more information

## Server config - local

In order to align as closely as possible with how webclient is configured for deployed environments, we now configure the server as follows:

### Dotenv

[Dotenv](https://github.com/motdotla/dotenv) allows us to parse a local `.env` (`src/apps/webclient/server/.env`) file **without modifying our codebase**.

Dotenv sets environment variables for the node server **at runtime**, which are accessible via `process.env`.

_Note: accessing server environment variables is best done using the `getEnvConfig` function (`src/apps/webclient/src/utils/processEnv.ts`) as this ensures type-safety and other functionality_

This is done by using the [preload](https://github.com/motdotla/dotenv) method in our local development scripts

_Note: ENVIRONMENT must be set to local in this file when developing to allow for correct asset path construction._

```json
# package.json
{
  "scripts": {
    "dev-script-that-starts-server": "[dotenv options] node -r dotenv/config path/to/server.js"
  }
}
```

_Note: dotenv config is currently only applied to the `dev` and `server` scripts - this will be expanded in the near future_
