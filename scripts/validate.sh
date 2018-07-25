#!/bin/bash

set -e

if [[ $ENVIRONMENT == "production" ]] || [[ $CI_MESSAGE == *"--skip-test"* ]]
then
  echo "exit early"
  exit 0
elif [[ $ENVIRONMENT == "staging" ]]
then
  git clone git@github.com:Gousto/gousto-utils.git
  gousto-utils/scripts/lease-sg -p 4444 --sgs platform-selenium-alb -e $ENVIRONMENT
  gousto-utils/scripts/lease-sg -e $ENVIRONMENT

  cd tests/e2e
  chmod a+x runtests.sh
  ./runtests.sh
fi
