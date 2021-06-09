# Gousto front end integration tests

(Also referred to as Gousto regression tests and likely functional front end tests!)

The purpose of the Gousto front end integration tests is to test Gousto's front end components working together in the browser, under a controlled environment.
It's an opportunity to test the front end code in a known state with controlled external behaviours, making edge-cases simple to test.

> Integration tests, verify that several units work together in harmony. They are the best balance of confidence and speed to write and run.
 
-- [Kent C Dodds, Testing Javascript](https://testingjavascript.com/)

## What the integration tests should do
The tests in the integration test suite should limit any variability so that they can be run consistently, giving the same results under the same conditions, while providing a valid test. 

It's important to try to make the tests as cheap to run as possible, by only testing the right surface area and stubbing any service or third party calls that aren't relevant to the tests, limiting any chance of network issues and speeding up the responses.

We should aim for a high level of coverage across all eventualities, in the integration tests and try to keep repetition to a minimum. 

To achieve these goals the tests can:
 - preload any initial state - using Redux there is a guide [here](https://www.cypress.io/blog/2018/11/14/testing-redux-store/)
 - mock services / stub service responses - see [cy.intercept](https://docs.cypress.io/api/commands/intercept) and [Network requests](https://docs.cypress.io/guides/guides/network-requests)
 - mock third party scripts (wherever possible) - again see `cy.intercept`

## Some patterns to help us with Cypress testing

In the integration tests folder there are examples using patterns that should help to keep the tests organised, less brittle, easy to read and maintain.

For example in this close to complete example: [menu-add-recipes-checkout.spec.js](./menu-add-recipes-checkout.spec.js) the test is using some Gousto test bots to execute routines. Specifically a Menu bot and a Checkout bot to interact with the Gousto web estate. 

The tests simply ask the *bot* to perform some routines and then ask the *bot* to confirm an expected behaviour from the system. You can think of bots as a drop in replacement for manual testers!

### Gousto test bots
Gousto test bots are pretty much the same as page objects but with a little bit more character!

The idea is simply that tests can ask bots to perform some simple routines on the Gousto website. Some examples: 

```JavaScript
    // visit the /menu url
    menuBot.visitMenu() 
    
    // enter a postcode, confirm it and enter your delivery frequency
    menuBot.enterDeliveryPreferences() 
    
    // select the first four visible recipes and checkout
    menuBot.selectFourRecipes() 

    // confirm the value of the order within 10 seconds
    checkoutAccountBot.confirmOrderPrice('£34.99', { timeout: 10000 })
```

Page Objects aren't everyone's cup of tea: [see](https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/), and they aren't ideal for all uses cases, more on that in a [guide to Gousto test bots](../bots/GOUSTO-TESTS-BOTS.md) which explains the simple pattern used, how it solves some common problems and how to build and extend Gousto test bots. 

### Gousto API drop in replacement

All Gousto test bots have access to a living fake representation of the the Gousto API. This is a simple collection of fixtures organised to closely relate to the hierarchy of the real Gousto API, wrapped in its own interface with some helper functions. 

The test bots can use the fake API to stub out responses in readiness for specific scenarios to be tested. 

Some examples.

```JavaScript
    // return the standard 200 for the request to /brand/v1/menu-headers [GET]
    menubot.api.brand.v1["menu-headers"].fakeOK()

    // return the standard 200 for the request to /deliveries/v1/days [GET]
    menubot.api.deliveries["v1.0"].days.fakeOK()

    // return the standard 200 for the request to /delivery_day/:day/stock [GET]
    menubot.api.delivery_day.$day.stock.fakeOK()
```

More information on building and interacting with the Gousto Fake API can be found [here](../fixtures/api/GOUSTO_FAKE_API.md)

## Why all this abstraction?

The value of extracting common routines from the tests and encapsulating them in test bots might not be immediately obvious and may look like a maintenance overhead. However, some of the benefits this pattern offers are as follows:

- Bots can be owned by individual squads and focused on a domain or subdomain
- Tests can then be owned by the whole front end team/guild and utilise bots to cross boundaries in tests
- A more natural language when using bots makes the tests easier to read and much lighter weight.
- When the underlying implementation of a website behaviour changes, the tests don't have to because the bot interface stays the same 
- Autocompletion on existing bots should make writing a new test using existing routines trivial for any developer
- Bots can be used for component, integration, end to end and smoke tests to perform the same actions.
- A living Fake API should be simple to map to an existing API estate 
- the Fake API should allow its underlying implementation to move from fixture files to something like [PollyJs](https://netflix.github.io/pollyjs/#/) without changing the bots or the test. Just drop in a new API with the same interface. 
- Autocompletion for Fake APIs should make existing test stubs more visible and easier to prevent mistakes
- having a defined API makes it simpler and more fun to write and maintain test cases ... like this

![interacting with the Gousto Fake API](../docs/assets/gousto-api-completion.gif)

## What next?
Assuming there is a positive response to these patterns:

- adopt Gousto test bots and the Gousto Fake API in all future tests
- migrate existing Cypress tests to this pattern
- expose data-testing selectors in functional code to test bots constructors 
- move to Cypress for any End to End tests (using the already defined bots and routines)
- move to Cypress for smoke testing in non-prod / production environments (using the already defined bots and routines)
- move to Cypress for some component testing reducing Jest integration and possibly unit tests
- add visual testing into Cypress and utilise the bot routines to drive them
- replace the current fixture based Gousto Fake API for something like [PollyJs](https://netflix.github.io/pollyjs/#/) and record test stubs regularly, enforcing a strict contract between the test stubs and the integration tests. 

## Some potentially useful tips for speeding up the creation of tests in Cypress: 

- [Cypress Recorder](https://github.com/KabaLabs/Cypress-Recorder) is a nice Chrome extension that helps by recording the steps you take in Chrome and creates the Cypress commands. Great for creating skeleton test implementations and building them out
- [Exporting network requests groups as HAR files](https://developer.chrome.com/docs/devtools/network/reference/#export) allows us to record all the network activity from a browser session into a single file which we can analyse using something like the [Google HAR file analyzer](https://toolbox.googleapps.com/apps/har_analyzer/) and then imported as a fixture into the Gousto Fake API
