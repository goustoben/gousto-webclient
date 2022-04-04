#!/usr/bin/env bash

export SETUP_FAILURE=false

cd src

# isomorphic: variables
npm config set gousto_webclient_environment_name "${ENVIRONMENT}"

