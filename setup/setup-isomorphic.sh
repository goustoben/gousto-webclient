#!/bin/bash

cd src

# isomorphic: build
yarn run build

# e2e build
yarn run build:e2e
