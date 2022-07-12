# Monorepo testing

June 2022

## Summary

Now we are decomposing the monolithic webclient into smaller components, we need rules for how these components are
tested, particularly accounting for dependencies.

## Status

Experimental

## Context

This monorepo will consist of three types of component:

- Apps, which are deployable programs
- Features, which implement user-facing features like pages
- Libraries, which are support code

Over time, features will probably gain their own separate deployments and bundles.

There are rules for how these components fit together:

- A library can import libraries
- A feature can import libraries
- An app can import libraries or features

```
Library ------------------+
                          |
Library --> Library       |
               |          v
            Feature ---> App
```

Any commit can touch any number of components in the monorepo

## Problem

Given a set of component changes, what automated tests should we re-run?

We know that we always want to run the end-to-end suite(s) in the staging pipeline, at least pending a change to the
wider "Gousto test strategy".

We have three other kinds of validation:

- Type-checking with TypeScript
- "Unit tests", tests run using Jest
- "Regression tests", tests run using Cypress

In theory unit tests validate individual files of code in isolation, often with dependencies mocked out (but not
always). Some Jest tests however may have a broader scope.

The regression tests are integration tests that validate code in the context of a browser, with network calls
stubbed.

What we want is

- ✅ reasonable confidence that our changes haven't broken downstream code
- ✅ a way to verify the changes we can before staging, to avoid blocking the pipeline with bad code
- ✅ optimisation to run as few tests as possible to achieve the above, for fast feedback

## Options

### Test all the things

If we run all types of tests, on all components, in builds at all stages, we'll have strong confidence. We'll also
have a prohibitively slow pipeline, due to the sheer scale of the tests. These tests are resistant to optimisation
and hard to move into newer frameworks - improving their speed will be a major investment.

In this model, a change to a feature library necessitates running a huge unit test suite that never
mounts or verifies the feature library component. Data flow to feature libraries is one-way, by design, so there's
no requirement to check that feature libraries do anything to their app 'environment'.

### Validate changed components only

The opposite philosophy is to only run these tests on parts that have changed, with the exception of type checks
which should verify integration between components.

In this model, if a library passes its unit tests, and fulfils the types of its call sites, it is deemed "good
enough" to trust in deployment.

However, what if the downstream code relies on - and tests - behaviour that is not defined in the upstream unit
tests? And what of libraries that are themselves only used in dev tools?

### Validate based on dependency

This is sometimes termed a 'recursive build'. If the build is ordered upstream-to-downstream this is also called a
'topological build'.

In this model a component is re-tested whenever it or any of its dependencies change. This provides an optimisation
by excluding any provably unaffected components in the graph.

However, it does imply that changing a feature module should re-run the parent application's unit tests. This is
undesirable and a large source of waste.

### Current approach

At the time of writing we have implemented "Validate changed components only" for unit tests

### Recursive with filtering

This is a mixed model, similar to 'recursive build' but with the proviso that feature modules cannot invalidate the
unit tests of the apps that call them.

```
Should I unit test this component? Yes if
- a library dependency changed

Should I typecheck this component? Yes if
- any component dependency changed

Should I regression check this component? Yes if
- any component dependency changed

Should we re-run e2e?
- Yes, always in staging
```

## Secondary problem: NPM dependencies

Another issue we have is the use of `node_modules`. These dependencies can change whenever the `yarn.lock` is altered
and can be hard to link to an effected component. Depending on Yarn configuration and how Webpack is set up to resolve
packages, it's not always obvious to see how certain transitive dependencies are touched by a lockfile change.

At the same time, lockfiles change regularly. If lockfile changes invalidated all unit test changes the CI process
might tend to slow down in practice.

## Approach

We want to maintain a balance between performance and confidence. We think we can try this approach:

### PR builds

- Recursive with filtering
- Lockfile changes alone do not force test re-runs

### Staging builds

- Initially, test everything each time
- Eventually:
  - Recursive with filtering
  - Lockfile changes force all tests to re-run
  - Nightly executions of whole test suite (acts as a backup and also surfaces problems with tests without blocking pipeline)

## Measure of success

We'll know this strategy was effective if

- PR builds remain performant
- Nightly executions of whole suite don't reveal many fall-throughs, if any
- It's clear to developers what the scope of their CI job will be
