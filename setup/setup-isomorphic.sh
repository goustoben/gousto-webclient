#!/bin/bash

set -eo pipefail

cd src

# isomorphic: install
yarn install

# isomorphic: build
yarn run build

# e2e build
yarn run build:e2e
