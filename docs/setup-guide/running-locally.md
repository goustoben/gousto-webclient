# Running locally

Make sure you've already covered the [setup](setup.md).

There are several ways to run webclient, depending on your needs. They have different tradeoffs.

- [With HMR (client only)](#with-hmr)
- [Storybook](#storybook)
- [Static build](#static-build)
- [Watching client and server](#watching-client-and-server)
- [Dockerised (local build)](#dockerised-local-build)
- [With G2FE](#with-g2fe)

### With HMR

This is the most common choice

- we build and execute the whole app
- we build the server once, then run it once
- we build the client code with HMR
- client changes force a refresh in the browser

The benefit is that it's quick to see client-side changes in the browser. The tradeoffs are that the bundle is large,
overall performance is slow, and server-side changes require a process restart.

```shell
# First run? Begin by creating the manifest.json
yw webclient build:client

# In one tab, start the main webclient in development mode
yw webclient dev

# Access the app on frontend.gousto.local:8080
```

### Storybook

You might not actually need to run the whole app to see your changes. The newer feature modules support Storybook-based
development, where you can test parts of or even entire pages in Storybook.

The benefit is that this flow can be very quick for testing client-side changes in a feature module.

```shell
yw <feature module name> dev
```

### Static build

This runs the client and server without any kind of watching or HMR enabled. It's mostly used for running regression
tests because it creates an app that runs a lot quicker.

If you try running the regression tests against a non-static build they will take upwards of half an hour. Whereas with
the static build they take around five minutes.

```shell
yw webclient build
yw webclient start:with-static
```

This serves the app on **port 80**.

### Watching client and server

If you are working on server-side changes you may find it awkward to continuously exit and restart the HMR build. This
run option provides a better workflow if you are making changes to the Node backend.

```shell
# In terminal tab 1
yw webclient watch:client

# First run? Wait for it to create the manifest.json

# In terminal tab 2
yw webclient watch:server

# In terminal tab 3
yw webclient dev:server
```

This serves the app on **port 80**.

### Dockerised (local build)

> ⚠️ This approach is DEPRECATED

```shell
# Build a Docker image
./run.sh build

# Execute
./run.sh run

# Need to rebuild? Delete the image first
docker image rm webclient
```

### With G2FE

G2FE is the legacy PHP frontend application that currently sits over webclient and the other frontend apps. It's going
away in 2022, so you only need this if

- you're working on a G2FE that expects cookies or some other state from webclient
- you're working on the `legacy.js` bundle in webclient, which is used to render the header and footer in G2FE

Simply follow the [static build](#static-build) process so the app is serving on port 80, then navigate
to http://frontend.gousto.local:80
