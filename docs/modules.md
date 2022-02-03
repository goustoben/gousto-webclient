# Module architecture

Webclient is gradually moving towards a modular architecture. This document explains

- [the context for why we're doing this](#context)
- [how modules fit together](#how-modules-fit-together)
- [rules for writing modules](#rules-for-writing-feature-modules)
- [scripts modules should provide](#scripts-modules-should-provide)

## Context

Webclient is a big project comprising approximately 360,000 lines of code at the time of writing. As a monolith it has
posed us several challenges for developer experience and CI scalability.

- You have to spin up the whole webclient, and have its backend (staging) data dependencies available, to get through
  to the part you are working on.
- You have to compile, test and lint over a million lines of code (with dependencies) every time you build or test in CI
- You have to run the entire regression test suite even when you change a simple line of text
- The whole thing has to be rebuilt and redeployed for even small changes

Cumulatively these make for a poor development experience. Modularisation is primarily about solving that, but it also
comes with other benefits, as it lets us mark out distinct areas of code with clear boundaries.

## How modules fit together

Inside `src` we follow this structure:

```
src
  apps
    > these are runnable applications
  modules
    features
      > these are internal packages for webclient features, owned by individual teams
    libs
      > these are pieces of common code that can be treated like internal libraries
```

Right now there is one `app`, `webclient`, which is where the bulk of development work still happens. We intend to change
this over the course of 2022. There is a single feature module, `recipe-tile`, which is part of a pilot programme with Kales.

At present, we ask teams to not yet add new modules without speaking to FEF.

### Dependency direction

- Apps cannot be dependencies of anything else
- Features may be dependencies of apps ONLY
- Libs may be dependencies of other modules, including libs (but avoid circular dependencies)

### Compilation & Deployment

As there is only one runnable app, `webclient`, we make it compile all the code. We don't have an intermediary step where
we compile feature modules, then compile that into the bundles. This will happen later as we explore "partial deployments"
to reduce deploy times.

### Testing and linting

Modules will have their own unit tests and linting. In the medium term they will have their own regression tests too.

### Local dev

Modules can either be tested within `webclient` (with the `dev` flow providing HMR) or tested with their own `dev` command.
We are looking at using Storybook to power the module dev workflow.

## Rules for writing feature modules

**Documentation:** a module must have a `README.md` that

- describes who owns the module
- describes what it does
- documents how to import it into webclient and use it
- provides a clear usage example

**Interfaces:** a module must interop with webclient in the following ways

- it must have a typed interface. We recommend that modules are written completely in TypeScript.
- it must export a React component
- it must use React as a **peer** dependency

**Isolation:** a feature module must be as self-contained as possible. **This is key to allowing us to optimise CI**.

- Avoid reading or writing data from the window, localStorage, or similar
- Any sharing of React context should be sparing and completely type safe.
- Use type safe props as much as possible

⚠️ **You are responsible for consuming external state in a type-safe way**

If a team deploys a change that breaks your code, and there was no way for them to detect your dependency on them via type
checking, that is **your team's** problem, **not** the team that shipped the change. It will be **your team's** responsibility
to fix forward.

## Scripts modules should provide

| Command   | Description                                    | Required                |
|-----------|------------------------------------------------|-------------------------|
| dev       | Spin up local dev environment for this feature | Yes, in feature modules |
| lint      | Lint files within module                       | Yes, all                |
| test-unit | Runs unit tests for module                     | Yes, all                |
