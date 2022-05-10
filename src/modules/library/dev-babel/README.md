# @library/dev-babel

Babel configuration for development tools (_not_ bundle compilation)

This module exists to support importing base configuration and addons for Babel into standalone modules. This is so we
can run any dev scripts that require transpilation in isolation from the rest of the application, such as

- Storybook
- module-specific Jest tests

## Usage

In our root `package.json` (this will enable you to import into any module):

```
"devDependencies": {
  "@library/dev-babel": "workspace:*"
}
```

In your feature-module `.babelrc.js`:

```
const config = require('@library/dev-babel')

module.exports = config
```

You may want to extend the above with module-specific Babel config like so:

```
const config = require('@library/dev-babel')

const additionalConfig = {
  // config here
}

module.exports = {
  ...config,
  ...additionalConfig,
}
```

## Updating

This shared Babel module is owned by Front-End Foundations. Please raise any changes through our squad's Slack
channel: #squad-frontend-foundations
