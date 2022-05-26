# @library/monorepo-build

This library contains commands for our custom Yarn monorepo-build plugin. These are written in plain JavaScript as
they'll run in a context where we won't yet have TypeScript installed.

Owner: #frontend-foundations

## Yarn plugin

The Gousto monorepo-build plugin contains commands to help optimise building our modular webclient. For instance, only
executing linting and unit tests on code that has changed for a given commit.

The plugin is mounted in [monorepo-build.js](../../../../.yarn/plugins/gousto/monorepo-build.js) which takes care of
binding to the CLI. The CLI binding calls functions in this library and passes them a context object.

## Commands

### lint

Determines the linting necessary for the supplied workspace. If there is no linting required, outputs nothing. May
return `.` if workspace requires complete revalidation.

```bash
yarn monorepo-build lint --workspace=webclient --since=REF > lint-changes
if [ -s lint-changes ]; then
  # test -s returns true if file exists and has length > 0
  yarn workspace webclient eslint:ci $( cat lint-changes )
fi
```
