#!/bin/bash

AWS_ACCESS_KEY_ID=$BETA_AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY=$BETA_AWS_SECRET_ACCESS_KEY \
gousto env sglease $ENVIRONMENT --sgs platform-tools -p 4444 -t 30
AWS_ACCESS_KEY_ID=$BETA_AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY=$BETA_AWS_SECRET_ACCESS_KEY \
gousto env sglease $ENVIRONMENT -t 30

cd tests/e2e
chmod a+x runtestsmobile.sh
./runtestsmobile.sh
