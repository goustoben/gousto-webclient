# Regression test suite

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

This is powered by Cypress's env variable functionality within the `npm` commands. If there is need for multiple tags to be provided, they must be added as a comma seperated string, i.e. `'mobile,web'`.

# Javascript fixtures / Mocking 3rd party Javascript

We should try to isolate our tests from external changes wherever possible to avoid variability and in most cases to speed them up. 

We have the ability in our Cypress tests to mock our third party Javascript. 

In the following example we mock Optimizely with a local copy isolating us from any changes that may have occurred in the Optimizely service and preventing any unexpected variations in our tests: 

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

# Maintaining 3rd party mocks. 
Some of our 3rd party Javascript comes from SaaS providers and is prone to regular change. (i.e. Optimizely) so keeping the files up to date may be necessary. The simplest way to do this is to keep an up to date copy of the remote version alongside our tests by downloading it and saving it in the 3rd party fixtures folder. 

We can keep multiple versions to satisfy various scenarios, within our tests. 

# Features toggles and testing

Inline with the above (we want to avoid external systems introducing unintended variation in our tests and making them unstable). Currently we use Optimizely to create experiments and toggle features on and off. To control this in our tests there are two options: 

1. Use an existing local mock and override the feature / experiment in your tests using something like `setFeature` (Preferred)
2. Keep an additional fresh copy of the Optimizely script locally and use it in your tests

Ideally we want to keep the number of local Javascript mock files / fixtures to a minimum so please consider this when working on testing experiments / features that live behind toggles and **please clean up the functional code and tests after toggles become redundant**
