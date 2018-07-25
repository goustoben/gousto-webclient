#!/bin/bash

cd src/nodeserver
if [[ $CIRCLE_BRANCH == "develop" ]]
then
  npm run test:jest:ci:coverage
else
  npm run test:jest:ci
fi
