#!/bin/bash

AWS_ACCESS_KEY_ID=$BETA_AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY=$BETA_AWS_SECRET_ACCESS_KEY \
gousto env sglease $ENVIRONMENT --sgs platform-tools -p 4444
AWS_ACCESS_KEY_ID=$BETA_AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY=$BETA_AWS_SECRET_ACCESS_KEY \
gousto env sglease $ENVIRONMENT

CYPRESS_baseURL="${ENVIRONMENT}-frontend.${DOMAIN}"

cd tests/e2e
chmod a+x runcypresstestsmobile.sh
./runcypresstestsmobile.sh
