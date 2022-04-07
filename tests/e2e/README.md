# WebClient e2e test suite

The set of end-to-end tests to check the most important functionality. To be executed upon deployment to Production.

# FAQs

## How to run tests locally?

* Start the `chromedriver`

```
yarn chromedriver:start
```

* run tests in other terminal

```
yarn test:staging
```

That would run local checkout of tests against Staging environment (ensure VPN is activated).

## How to run single test?

In order to run just a `tests/systemTests/addTransactionalOrder.js` test execute following command in terminal:

```
yarn test:staging --test tests/systemTests/addTransactionalOrder.js
```

## How to run tests not in `headless` mode?

By default tests are executed in `headless` mode, which is not convenient when debugging.

In order to be able to observe progression of the test execution amend `config/env.staging.js` and ensure the `chromeOptions.args` array does not have `headless` argument.
