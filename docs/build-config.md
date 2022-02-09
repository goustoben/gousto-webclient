Gousto Webclient build configuration
====================================

Gousto Weblient is both client and server applications. There are separate build scripts for the server and client builds, and separate build configurations for each, but they share environment variables that are declared and overridden through a few different methods.

Build scripts
--------------

The build scripts can be found in the `scripts` section in the `src/package.json` file

```
"build:client": "webpack --config config/webpack.client.js --config-name=client --bail",
"build:server": "webpack --config config/webpack.server.js --config-name=server --bail",
```

There is a parent build script that runs the server and client build scripts.

```
"build": "rm -rf dist/* && rm -rf public/* && NODE_CONFIG_ENV=\"${NODE_CONFIG_ENV:=production}\" /
    NODE_APP_INSTANCE=\"${NODE_APP_INSTANCE:=live}\" NODE_ENV=production run-p -l build:server build:client",
```

Developer desktop and deployed builds are built and executed as follows:

Developer desktop
-----------------

Running a development instance of Webclient on a developer machine is a two-step process kicked off by running the command `npm run dev`.
```
"dev": "NODE_CONFIG_ENV=development NODE_APP_INSTANCE=local npm run build:server && npm run start",
```

First, the server build is executed. Once it's completed, successfully, the server is started and then the client build is invoked via a KOA plugin from the server application code in: `src/server/main.js` which imports `src/src/config/globals.js` (which includes a lot of the injected environment variables).

HMR is enabled by default in development mode - each change in the **client** sourcecode a rebuild of the client module is triggered.

Deployed builds
---------------

Instances of Webclient that are built and deployed via CircleCI (see `.circleci/config.yml`), use the same build command as a local developer workstation but are preceded by the execution of the `setup/setup-common.sh` shell script:

```
...
      - run:
          name: Setup environment and npm variables for build
          command: source ~/.circlerc && setup/setup-common.sh
...
      command: source ~/.circlerc && NODE_CONFIG_ENV=${ENVIRONMENT} NODE_APP_INSTANCE="live" CIRCLE_BUILD_NUM=${CIRCLE_BUILD_NUM} npm run build
...
```

The deployed application code, client and server bundles and assets, are deployed as part of a Gousto Platform Service which is deployed to ECS (configuration for the service is in `service.yml`).


Environment Variables
=====================

Precedence:

1. command line argument overrides
2. package-json script
3. override in webpack configuration code
4. node-config (files)

Node Config (package)
---------------------
> Node-config organizes hierarchical configurations for your app deployments.
>
> It lets you define a set of default parameters, and extend them for different deployment environments (development, qa, staging, production, etc.).

[See this explanation in relation to the Webclient implementation](https://github.com/Gousto/gousto-webclient/blob/develop/docs/detailed-setup.md#quick-guide-to-node-config)

Server startup
--------------
The server uses a Docker entrypoint file `src/ecs_start.sh` as a starting point. This file is executed by Docker when the container is started.
Secrets are loaded into the environment via the ecs_start.sh and the secrets are read from the S3 file (see `src/ecs_start.sh`).

The location of the environment specific S3 file follows the following convention: `s3://s3-gousto-platform-[beta|production]/${ENVIRONMENT}/config/service/webclient.yml`
The files are currently manually uploaded to S3 by the Gousto team.

Configuration files
-------------------
JSON files representing an environment's configuration can be found in `src/config`, with `src/config/default.json5` being the fallback / default configuration.

The build overrides the default configuration by using the `NODE_ENV` (NODE_CONFIG_ENV?) environment variable to determine which configuration file to use i.e. `NODE_ENV=production` will use `src/config/production.json5`.

```JSON5
{
  "api_name": "",
  "api_token": "",
  "auth_client_id": "",
  "auth_client_secret": "",
  "build": "",
  "checkout_pk": "",
  "client_dev_server_enabled": false,
  "client_protocol": "",
  "cloudfront_url": "",
  "domain": "",
  "environment_name": "",
  "recaptcha_referral_private_key": "",
  "recaptcha_referral_public_key": "",
  "running_env": "",
  "endpoints": {
    //...
  }
}
```

api_name
--------
```
    string: production | staging | [environment name]
```
(aliased by `__API_ENV__`, `apiName` in the code).

Used to target the domain / address of the APIs - see `src/src/config/endpoint.js`

api_token
---------
```
    string: [Gousto api token]
```
(aliased by `__API_TOKEN__`, `apiToken` in the code).

Gousto API token.

Used in `src/src/utils/env.js` which is in turn imported in `src/src/utils/fetch.js` and is used to determine how the application gets access / makes downstream XHR API calls.

auth_client_id
--------------
```
    string: [Gousto auth client id]
```
(aliased by `__AUTH_CLIENT_ID__`, `authClientId` in the code).

Client ID, used to identify the client making calls to the Gousto API.

Used in `src/src/utils/env.js` which is in turn imported in `src/src/utils/fetch.js` and is used to determine how the application gets access / makes XHR API calls.

auth_client_secret
------------------
```
    string: [Gousto auth client secret]
```
(aliased by `__AUTH_CLIENT_SECRET__`, `authClientSecret` in the code).

Client Secret, used to securely authorise the client making calls to the Gousto API.

Used in `src/src/utils/env.js` which is in turn imported in `src/src/utils/fetch.js` and is used to determine how the application gets access / makes downstream XHR API calls.

build
-----
```
    string: 'production' | 'development'
```
Used to determine the type of build being targeted.

checkout_pk
-----------
```
    string: [Gousto checkout.com private key]
```
(aliased by `__CHECKOUT_PK__`, `checkoutPk`, `publicKey` in the code).

The private key used to sign checkout.com requests.

Used to make calls to 3rd party system Checkout.com in `src/src/routes/Checkout/Components/CheckoutPayment/CheckoutFrame/CheckoutFrame.js` through an import in of `src/src/routes/Checkout/Components/CheckoutPayment/config.js`

client_dev_server_enabled
-------------------------
```
    boolean: true | false
```
Not used in the code. (Can be removed)

client_protocol
---------------
```
    string: http | https
```
(Aliased by `__CLIENT_PROTOCOL__`, `clientProtocol` in the code).

HTTP protocol used when building urls, for calls out to the internet.

Referenced in `src/src/utils/media.js`, `src/src/routes/Menu/fetchData/fetchData.js`, `src/src/actions/login.js`

cloudfront_url
--------------
```
    string: [cloudfront url]
```
Assets location (via Cloudfront). Used as a variable in the server code via either: `src/server/template.js` or `src/server/processRequest.js`.

See `newAssetPath` & `getAssetRootUrl` in `src/src/utils/media.js`.

domain
------
```
    string: `gousto.co.uk` | `gousto.info`
```
(Aliased by `__DOMAIN__`, `domain` in the code).

The domain name of the deployed application. i.e. `gousto.co.uk`

Referenced in : `src/src/config/globals.js`, `src/src/actions/login.js`, `src/src/routes/Menu/fetchData/fetchData.js`

environment_name
----------------
```
    string: production | local
```
(Aliased by `__ENV__`, `envName` in the code).
Used throughout the application to differentiate between local and deployed ('production') builds.

Used as a key (`list['local] vs list['production']`) for optimizely configuration see: `src/server/head/optimizely.js`

More often used as a value to drive conditional logic, i.e. for logging.

Referenced ~20 files.

recaptcha_referral_private_key
------------------------------
```
    string: [Google recaptcha referral private key]
```
(Aliased by `__RECAPTCHA_RAF_PVTK__`, `recaptchaReferralPrivateKey` in the code).

Private key for accessing Google's recaptcha service.

Refernced in `src/src/utils/env.js` and used in `src/server/routes/user.js` (Refer a friend service only?)

recaptcha_referral_public_key
-----------------------------
```
    string: [Google recaptcha referral public key]
```
(Aliased by `__RECAPTCHA_RAF_PUBK__`, `recaptchaReferralPublicKey`  and `RECAPTCHA_PUBLIC_KEY` in the code).

Public key for accessing Google's recaptcha service.

Public key for Google's Recaptcha service and referenced in multiple files, used in four areas alongside the Recaptcha service:

1. Login
2. Refer a friend
3. Reset password
4. Checkout payment

running_env
-----------
```
    string: live | local
```
(Aliased by `__RUNNING_ENV__`, `runningEnv` in the code).

A key for the `endpoints` config.

Referenced in: `src/src/config/endpoints.js`

endpoints
---------
```
    object: {
        [endpoint_name]: {
            [endpoint_key]: [endpoint_value]
        }
    }
```
(Aliased by `__ENDPOINTS__`, `endpoints` in the code).

A collection of endpoints used throughout the application but referenced in `src/src/config/endpoints.js` (and `jest/.setupEndpoints.js`).

See `src/src/config/endpoints.js` for more details.

See the ADR on [Configuration](./decisions/0001-configuration.md)
