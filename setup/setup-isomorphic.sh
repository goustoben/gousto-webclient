#!/bin/bash

export NODE_CONFIG_ENV=${ENVIRONMENT}
export NODE_APP_INSTANCE="live"

cd src

# isomorphic: build
npm run build

if [ $? -ne 0 ]
then
  export SETUP_FAILURE=true
  exit 1
fi

# e2e build
npm run build:e2e
