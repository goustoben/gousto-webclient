#!/bin/bash

AWS_ACCESS_KEY_ID=$BETA_AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY=$BETA_AWS_SECRET_ACCESS_KEY \
gousto env sglease $ENVIRONMENT -t 30

export CYPRESS_baseUrl="https://${ENVIRONMENT}-frontend.gousto.info"
export CYPRESS_WAF_ACCESS_TOKEN="${WAF_ACCESS_TOKEN}"

cd tests/regression
chmod a+x runtestsmobile.sh
./runtestsmobile.sh
