# Local testing

This chapter is about running automated tests on your code. It's assumed you've already followed the [setup](setup.md).

- [Unit tests](#unit-tests)
- [Regression tests]
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

### Writing new regression tests

Currently regression tests are only supported for the main webclient.

Tests are specified in folders of the pattern `src/apps/webclient/**/__regression__` and named `<feature>.spec.(js/ts)`.

Regression tests can use a PageObject-style pattern; this is documented in the
[GOUSTO-TEST-BOTS](../../tests/regression/bots/GOUSTO-TEST-BOTS.md) guide.

## End to end suite

( to do )
