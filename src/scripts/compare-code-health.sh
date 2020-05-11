#!/bin/bash
npm run test:jest:ci:coverage

./scripts/run-eslint-ci.sh

git fetch origin develop && git diff --name-status | node ./scripts/compare-code-health.js develop tmp/artifacts/code_health.json
