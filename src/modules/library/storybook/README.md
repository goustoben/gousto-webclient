# @library/storybook

This module exists to support importing base configuration and addons for storybook into standalone modules, so we can view & run stories in isolation from the rest of the application.

## Usage

In our root `package.json` (this will enable you to import into any module):

```
"devDependencies": {
  "@library/storybook": "workspace:*"
}
```

In your feature-module `.storybook/main.ts`:

(This is required so Storybook can resolve both configuration paths & story paths relative to your module when running it as a standalone set of components in Storybook)

```
import type { StorybookConfig } from '@storybook/react/types'
import { base, generateWebpackFinal } from '@library/storybook'

const path = require('path')

const config: StorybookConfig = {
  ...base,
  stories: [
    `../src/**/*.stories.*`,
  ],
  webpackFinal: generateWebpackFinal({ path: path.resolve(__dirname, '../src') }),
}

module.exports = config
```

In your feature-module `package.json`:

(This is if you want to run just your module in storybook, to run all modules run `yarn storybook` from root)

```
"scripts": {
  ...
  "dev": "yarn run --top-level start-storybook -p 6006
},
```

## Updating

This shared storybook module is owned by Front-End Foundations. Please raise any changes through our squads slack channel: #squad-frontend-foundations



