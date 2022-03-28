# Local server config (run-time)

As part of FEF's BODA epic, the way we configure webclient locally is being re-evaluated.

**Links**
[FEF BODA Epic](https://gousto.atlassian.net/browse/FEF-264)
[Potatoes BODA docs](https://gousto.atlassian.net/wiki/spaces/TECHPOTATOES/pages/3682730007/BODA+Build+Once+Deploy+Anywhere)

## Intent

- Configuration of server and client is configured by the same mechanisms as the deployed application
- Elimination (as much as possible) of local-development-specific logic within the application codebase

The goals above intend to make configuring this application simpler, easier and more understandable.

## Server config - deployed

With regards to config, the end-state that we'd like to achieve with webclient's server component is:

- no build-time config - _enables us to re-use Docker images across environments_
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

### Node-config

We're currently also using [node-config](https://github.com/node-config/node-config) for the majority of our **build-time** configuration (the `.json5` files)

**This is something that FEF is actively working towards removing, in favor of the Dotenv solution above**

Whilst we complete the remaining BODA work there unfortunately will be a period where both config methods will coexist, but we expect that to be short-lived.
