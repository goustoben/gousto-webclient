#!/bin/bash

func() {
  npm run --silent eslint -f json > eslint-results.json

  local eslint_exit_code=$?

  node ./scripts/display-eslint-results.js

  printf 'Main eslint process exited with code %d\n' "$eslint_exit_code"

  exit $eslint_exit_code
}

func
