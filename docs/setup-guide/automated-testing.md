# Local testing

This chapter is about running automated tests on your code. It's assumed you've already followed the [setup](setup.md).

- [Unit tests](#unit-tests)
- [Regression tests](#regression-tests)
- [End to end tests]

## Unit tests

We use Jest tests to validate JavaScript / TypeScript modules in isolation. Each Yarn workspace may have an associated
test suite.

### Main webclient

```shell
# To unit test to main webclient
yw webclient test:jest

# To watch tests
yw webclient test:jest:watch

# To watch one test
yw webclient test:jest:watch ./path/to/file.test.js
```

### Feature module / library

```shell
yw <feature module> test:unit
```

### Writing new unit tests

Tests have the file format `<source file name>.test.(js/ts/tsx)` and are typically grouped under a `__tests__` folder.

## Regression tests

We have a Cypress regression suite run from `tests/regression` that executes tests against a locally running webclient
in Electron. It contains a sub-pack for desktop and mobile screen sizes.

> ℹ️ The regression suite's job is to check that the webclient code will work in a 'real' browser. However any API
> calls are stubbed out.

To run the regression tests locally you must first start the [static build](running-locally.md#static-build) on port 80.

Then start Cypress:

```shell
# Desktop
yw gousto-regression test:debug:web

# Mobile
yw gousto-regression test:debug:mobile
```

These will run Cypress in "headed" mode. Skip the `:debug` for headless.

### Writing new regression tests

Currently regression tests are only supported for the main webclient.

Tests are specified in folders of the pattern `src/apps/webclient/**/__regression__` and named `<feature>.spec.(js/ts)`.

Regression tests can use a PageObject-style pattern; this is documented in the
[GOUSTO-TEST-BOTS](../../tests/regression/bots/GOUSTO-TEST-BOTS.md) guide.

## End to end suite

We have an e2e suite written in Nightwatch and implemented in `tests/e2e`

> ℹ️ The e2e suite tests webclient in a browser with non-stubbed API requests. It tests whether webclient works 'with'
> its dependencies

### Running locally

You must first start the [static build](running-locally.md#static-build) on port 80. Then begin Chromedriver:

```shell
yw gousto-e2e chromedriver:start
```

In another tab begin the test suite:

```shell
yw gousto-e2e test
```

### Staging execution

We run the e2e suite as part of the staging build, after deploying to the staging environment.

These tests run with Datadog monitoring, under the application named **gousto-webclient E2E staging - test**. Datadog
can inform you of any bad HTTP requests or JavaScript errors to help diagnose breakages in the pipeline.

### Changing the e2e suite

The e2e tests are found under `e2e/tests/systemTests`. Use the custom commands implemented in `e2e/commands`.

You can run your e2e changes against the current staging webclient by pushing to the branch `e2e-manual`:

```shell
git commit -m "e2e suite changes"
git checkout e2e-manual; git reset --hard (your branch); git push --force
git checkout (your branch)
```
