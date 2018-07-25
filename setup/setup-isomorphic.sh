#!/bin/bash

set -eo pipefail

cd src/nodeserver

# isomorphic: install
yarn install

# isomorphic: build
yarn run build

# e2e build
yarn run build:e2e
