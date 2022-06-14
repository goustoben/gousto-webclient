# Module architecture

Webclient is gradually moving towards a modular architecture. This document explains

- [Context](#context)
- [How modules fit together](#how-modules-fit-together)
  - [Dependency direction](#dependency-direction)
- [Compiling modules](#compiling-modules)
  - [node_modules and dependencies](#node_modules-and-dependencies)
- [Module tooling](#module-tooling)
  - [Testing and linting](#testing-and-linting)
  - [Local dev](#local-dev)
- [Feature module requirements](#feature-module-requirements)
  - [Feature module boilerplate](#feature-module-boilerplate)
  - [Feature module scripts](#feature-module-scripts)

## Context

Webclient is a big project comprising approximately 360,000 lines of code at the time of writing. As a monolith it has
posed us several challenges for developer experience and CI scalability.

- You have to spin up the whole webclient, and have all its backend (staging) data dependencies available, to get through
  to the part you are working on.
- You have to compile, test and lint over a million lines of code (with dependencies) every time you build or test in CI
- You have to run the entire regression test suite even when you change a simple line of text
- The whole thing has to be rebuilt and redeployed for even small changes

Cumulatively these make for a poor development experience. Modularisation is primarily about solving that, but it also
lets us mark out distinct areas of code with clear boundaries.

## How modules fit together

Inside `src` we follow this structure:

```
src
  apps
    > these are runnable applications
  modules
    features
      > these are internal packages for webclient features, owned by individual teams
    library
      > these are pieces of common code that can be treated like internal libraries
```

Right now there is one `app`, `webclient`, which is where the bulk of development work still happens. We intend to change
this over the course of 2022. There is a single feature module, `recipe-tile`, which is part of a pilot programme with Kales.

At present, we ask teams to not yet add new modules without speaking to FEF.

### Dependency direction

- Apps may depend on libs or features
- Features may depend on libraries
- Libraries _may_ depend on libraries, but it's advisable not to. Circular dependencies are prohibited.

## Compiling modules

As there is only one runnable app, `webclient`, we make it compile all the code. We don't have an intermediary step where
we compile feature modules, then compile that into the bundles. This will happen later as we explore "partial deployments"
to reduce deploy times.

Because of this, all the actual compilation logic for the bundles lives inside the `webclient` Webpack config. Any other
`.babelrc` or similar files you see are (currently) just for local development tools. The same applies for `tsconfig.json`.

### node_modules and dependencies

| ⚠️️ | This area is subject to change as the modularisation initiative continues |
| ------------- | ------------- |

#### Topology (how files are laid out)

For project management, Yarn workspaces allow us to have both workspace-level and top-level dependencies. Yarn can
either support `node_modules` or its own format called `pnp`. We are using the former for the moment.

Yarn supports an approach termed 'hoisting', where all the node_modules go into a single de-duplicated folder. This can
be faster, but to avoid altering the webpack config too much, we've started with hoisting disabled.

#### Production dependencies

The webclient webpack config is set up to discover dependencies in the webclient `node_modules` folder. It also loads
feature module code from workspaces.

But what happens when a feature module relies on, say, React? It has a reference to React, but this is resolved by the
webpack config from the webclient dependencies.

The `webclient` webpack config only pulls `node_modules` local to webclient. This means that, for example, if you have
a feature module that references `react`, webpack will pull that dependency from `src/apps/webclient/node_modules`,
rather than bundle a duplicate from the root level.

**Prod dependency resolution in feature modules:**
```
apps/webclient                                                  apps/webclient/node_modules
       |                                                                          ^
       +-- imports --> modules/features/foo                                       |
                                         |                                        | (webclient webpack .resolves config)
                                         +-- imports --> 'react'                  |
                                                            |                     |
                                                            +-- is bundled from --+
```

To make this relationship clear, feature modules will refer to these dependencies via `peerDependencies`. It's important
to be clear, though, that webpack doesn't "know" about peer dependencies. It just follows `require` statements in the
code it's given.

At some point we'll implement "partial builds" where modules are compiled in isolation, with the ability to inject
dependencies via webpack. This should simplify things.

#### Production dependencies... in development

What happens if we want to run a feature module in Storybook? It can't get a hold of, say, `React` in its own node_modules.
So it needs another location.

This is why things like `react` and `react-dom` are set as top-level `devDependencies`.

#### "Real" dev dependencies

Finally, we have 'true' dev dependencies for tooling and compilation. These are held as top level devDeps in the monorepo.

## Module tooling

### Testing and linting

Modules will have their own unit tests and linting. In the medium term they will have their own regression tests too.

### Local dev

Modules can either be tested within `webclient` (with the `dev` flow providing HMR) or tested with their own `dev` command.
We are using Storybook to power the module dev workflow.

## Feature module requirements

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

⚠️ **Inter-module dependencies must be expressed via typed contracts**

What this means is that if your module relies on external state or data, that must be discoverable via the type system.
Only by types can we use static analysis to determine if code should integrate - testing the whole thing integrates,
every time, eventually proves too time-consuming at scale.

This makes it **your** responsibility to express your needs via either a typed interface to your module, or using a typed
React context. If another team makes a change that "breaks" your code, because they couldn't use types to discover the
dependency, that will be treated as  **your team's** problem. It will be **your team's** responsibility to fix forward.

### Feature module boilerplate

| File              | Purpose(s)                                                                              |
|-------------------|-----------------------------------------------------------------------------------------|
| .babelrc          | Helps local dev tools like Storybook and Jest compile the module's code                 |
| README.md         | Describes what the feature is, who owns it, and how to use it                           |
| jest.config.js    | Supports running Jest tests for this module specifically                                |
| package.json      | Needed by Yarn to establish a **workspace**. The `name` field sets the workspace name.  |
| postcss.config.js | Needed by Webclient Webpack build                                                       |
| tsconfig.json     | Helps local dev tools like Storybook and Jest compile the module TS                     |

### Feature module scripts

| Command   | Description                                    | Required           |
|-----------|------------------------------------------------|--------------------|
| dev       | Spin up local dev environment for this feature | In feature modules |
| lint      | Lint files within module                       | Yes                |
| test:unit | Runs unit tests for module                     | Yes                |
| typecheck | Validates TypeScript in module                 | Yes                |
