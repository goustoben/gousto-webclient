# Jest Migration Guide

These tests have been migrated directly across from the mocha test directory, using the same method as provided, with the source files removed. 
All tests are currently running in CI and must pass for your build to succeed. Please write any new tests within Jest!

A script has been provided that will try and help you through the migration process.

## Migrate Test Script

### Requirements:
- `jest-codemods` 
- `prettier`
These must be installed globally, for the script to find and use!

### How to run:
```shell
cd ~/code/goustowebclient/src
sh migrateTest.sh ./test/components/Component/Component.js
```

🃏
