# @library/babel

This module exists to support importing base configuration and addons for Babel into standalone modules. This is so we can run any dev scripts that require transpilation in isolation from the rest of the application. Dev scripts may include starting Storybook or running module-specific Jest tests.

## Usage

In our root `package.json` (this will enable you to import into any module):

```
"devDependencies": {
  "@library/babel": "workspace:*"
}
```

In your feature-module `.babelrc.js`:

```
const config = require('@library/babel')

module.exports = config
```

You may want to extend the above with module-specific Babel config like so:

```
const config = require('@library/babel')

const additionalConfig = {
  // config here
}

module.exports = {
  ...config,
  ...additionalConfig,
}
```

## Updating

This shared Babel module is owned by Front-End Foundations. Please raise any changes through our squads slack channel: #squad-frontend-foundations



