# 0001-Configuration

01 2022

## Summary

Addressing how we configure Webclient (both client and server applications).

# Status

Accepted

## Context / Problem Statement

Our configuration is extremely complex. We have a lot of different ways of introducing configuration into our application currently, and these also vary depending on which environment (local/staging etc.) the app is running in.

We are using a combination of build time, deploy time and runtime configuration.

Because of the complexity of how we configure the app it is:

- Difficult to accurately configure the app as it is on a different environment
- Difficult to onboard
- Difficult to simplify
- Necessary to re-build the app for each deployed environment

## Options

1. ECS build-time configuration
    * Values injected into the CloudFormation templates, via Parameter Store and CloudFormation stack outputs
    * Baked into the deployment
    * Secure
    * Change only with new deployment
3. ECS container run / Server Start
    * Values read from a service, like SSM Parameter Store
    * Change with each new instance of the server starting
    * Secure
4. Server runtime
    * Values read from a service, like SSM Parameter Store or a 3rd party configuration service
    * Secure
    * Adds time on request / response round trip, depending on the caching strategy
    * Requires a service to be built alongside the server
5. Client bootstrap
    * Values read from a service, or a separately deployed JS file, or read from the server
    * Values can come from the server or otherwise
    * not secure (visible in the client)
    * Can be changed with each new instance of the client app
6. Client runtime
    * Values read from a service, or a separately deployed JS file, or read from the server
    * Values can come from the server or otherwise
    * not secure (visible in the client)
    * values can be changed with each new request

## Decision

A combination of:

- ECS build-time configuration - retrieve config from Parameter Store at deploy-time for the server
- Client runtime
    - Infer as much as possible about the operating environment from `window.location` to remove unnecessary config
    - Pass **public** configuration from server to client
- Build-time - there is a single acceptable exception for build-time configuration - app version. We need to build this into the app in order to configure the app's `publicPath`, for our source-maps and observability configuration.

## Measure of success

- The application can be moved from one environment to another without the need for changes to the built application code.
- The application doesn't noticeably degrade in performance
- The application code is easier to understand and reason about
- The application follows the principles for configuration found at [Twelve factor app: Configuration](https://12factor.net/config)
