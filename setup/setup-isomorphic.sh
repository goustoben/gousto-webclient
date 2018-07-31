#!/bin/bash

cd src/nodeserver

# isomorphic: build
yarn run build

# e2e build
yarn run build:e2e
