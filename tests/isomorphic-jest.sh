#!/bin/bash

cd src
if [[ $CIRCLE_BRANCH == "develop" ]]
then
  npm run test:jest:ci:coverage
else
  npm run test:jest:ci
fi
