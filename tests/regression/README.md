# Regression test suite

- [Overview](#overview)
- [Development](#development)
  - [Web / mobile tests](#platform-dependent-tests)
  - [Mocking 3rd party JavaScript](#javascript-fixtures--mocking-3rd-party-javascript)
  - [Testing with feature toggles](#feature-toggles-and-testing)

## Overview

The Gousto regression tests exist to help us:

- Prove our code works as expected in any environment
- Prove our code works as expected under controlled but varying conditions
- Aid development without the need for access to external services

The regression tests are currently run on any deploy to staging / merge into develop.

Currently the regression tests equate to a healthy amount of integration tests that live alongside the functional code.

Please refer to [INTEGRATION-TESTS.md](./integration/INTEGRATION-TESTS.md) for some examples of alternative ways to
organise our integration tests that will aid development and long term maintenance.

> The Cypress tests are generally owned by squads and fit into the domain that the squad is responsible for.
> However, there should be a collective responsibility to keep our tests stable and address any erroneous test failures
> as and when they appear.

When running into any erroneously failing Cypress test that isn't obviously related to your changes:

Ask
- 1st: Is the test isolated from any external variability? (all API responses stubbed, 3rd parties mocked etc)
  - No: inform the squad of the issue and work to resolve it, stabilizing the test
  - Yes: continue
- 2nd: Have any new changes in this branch affected the test?
  - No: what external effects might be causing the test to fail? (timing, networks etc)
  - Yes: adjust the code or test accordingly!

## Development

### Platform dependent tests

The framework allows for tests to be written purely for `web` or `mobile`, using the new `withPlatformTags` method.

```javascript
import { withPlatformTags, MOBILE, WEB } from '../utils/tags'

describe('example', () => {
    it('this will run everywhere', () => {})

    withPlatformTags(MOBILE).it('this will only run on mobile', () => {})

    withPlatformTags(WEB).it('this will only run on web', () => {})

    withPlatformTags(MOBILE, WEB).it('this will run on mobile and web', () => {})
})
```

This is powered by Cypress's env variable functionality within the `npm` commands. If there is need for multiple tags
to be provided, they must be added as a comma seperated string, i.e. `'mobile,web'`.

## Javascript fixtures / Mocking 3rd party Javascript

We should try to isolate our tests from external changes wherever possible to avoid variability and in most cases to
speed them up.

We have the ability in our Cypress tests to mock our third party Javascript.

In the following example we mock Optimizely with a local copy isolating us from any changes that may have occurred in
the Optimizely service and preventing any unexpected variations in our tests:

```javascript
    cy.interceptThirdPartyJS(
        'https://cdn.optimizely.com/js/7728010866.js',
        '3rd-party-scripts/optimizely/js/7728010866.js',
    ).as('optimizely')

    cy.wait('@optimizely')
```

The helper command has the following signature:
```javascript
    cy.interceptThirdPartyJS(
        url, //: the url of the javascript to intercept
        localFile, //: the path to the mock javascript
    ).as(id, //: the identifier of the request to use in subsequent cy.wait(id) calls)
```
The `localFile` is relative to the `./fixtures/3rd-party-scripts` folder in the Cypress test folder.

### Maintaining 3rd party mocks.
Some of our 3rd party Javascript comes from SaaS providers and is prone to regular change. (i.e. Optimizely) so keeping
the files up to date may be necessary. The simplest way to do this is to keep an up to date copy of the remote version
alongside our tests by downloading it and saving it in the 3rd party fixtures folder.

We can keep multiple versions to satisfy various scenarios, within our tests.

## Feature toggles and testing

Inline with the above (we want to avoid external systems introducing unintended variation in our tests and making them
unstable). Currently we use Optimizely to create experiments and toggle features on and off. To control this in our
tests there are two options:

1. Use an existing local mock and override the feature / experiment in your tests using something like `setFeature` (Preferred)
2. Keep an additional fresh copy of the Optimizely script locally and use it in your tests

Ideally we want to keep the number of local Javascript mock files / fixtures to a minimum so please consider this when
working on testing experiments / features that live behind toggles and **please clean up the functional code and tests
after toggles become redundant**
