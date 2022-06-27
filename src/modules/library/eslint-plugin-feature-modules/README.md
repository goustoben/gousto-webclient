# @library/eslint-plugin-feature-modules

This module contains a custom eslint plugin for any FEF-defined feature module rules.

## Installation

All you should have to do is run `yarn` at the root of the repository to install the plugin. If you can't see the rules kicking in you may have to restart your IDE.

## Current ruleset

| Rule                          | Description                                                          | Type  |
| ----------------------------- | -------------------------------------------------------------------- | ----- |
| avoidZest                     | Please use Citrus instead of Zest - https://github.com/Gousto/citrus | Error |
| avoidImportFeatureIntoFeature | Importing features into other features is not allowed                | Error |

## Adding a new rule

ESLint custom plugins use an AST to traverse the code and analyse it for problems - see [this doc](https://eslint.org/docs/developer-guide/working-with-rules) for more information about implementing a new rule.

To test your rule you have some options:

1. You can write tests using `ESLintUtils.RuleTester` (see `src/rules/__tests__/preventImport.test.ts`)
2. You can use [AST explorer](https://astexplorer.net/) to interactively test new rules

We recommend using the explorer when working out your rule initially and writing a test for final & future validation.

## Issues

This shared module is owned by Front-End Foundations. Please raise any issues through our squad's Slack channel: #squad-frontend-foundations
