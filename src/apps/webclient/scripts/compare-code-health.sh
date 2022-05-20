#!/bin/bash
yarn test:jest:ci:coverage

./scripts/run-eslint-ci.sh .

git fetch origin develop && git diff --name-status origin/develop | node ./scripts/compare-code-health.js develop tmp/artifacts/code_health.json
