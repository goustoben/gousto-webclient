# Smoke tests for routing infra changes

Note: these tests are not intended to be long-living and are also **not intended to be merged into develop/paster**.

These smoke tests should dramatically reduce our requirement for manually testing infrastructure changes in combination with webclient's existing test suites (e2e, regression)

## What's covered by these tests

These tests ensure **proxy behavior**, **direct routing** and **interactivity** is as expected for:

- All static sites
- Webclient pages not covered by e2e tests

## What's not covered (and should be manually tested)

There is currently an issue with the following tests:

- myDetails
- subscriptionSettings
- blog

## Prerequisites

- Duplicate and rename `cypress.env.example.json` -> `cypress.env.json`
- Add your email address and password for the desired environment (this file is `.gitignored`)
- Install dependencies from the root of the project `yarn workspace smoke-tests install`

## Running smoke tests

### With UI:

`yarn workspace smoke-tests cypress:open`

### Headlessly:

`yarn workspace smoke-tests test`
