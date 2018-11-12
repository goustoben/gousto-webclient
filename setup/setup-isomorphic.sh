#!/bin/bash

cd src

# isomorphic: build
yarn run build

if [ $? -ne 0 ]
then
  export SETUP_FAILURE=true
  exit 1
fi

# e2e build
yarn run build:e2e
