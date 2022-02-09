const fs = require('fs')

const srcFileAliases = fs
  .readdirSync('./src', { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  // We load `style` manually to highligh that its a shared alias
  .filter((dirent) => dirent.name !== 'style')
  .map(({ name }) => {
    return [name, './src/' + name]
  })

const componentFileAliases = fs
  .readdirSync('./src/components', { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map(({ name }) => {
    return [name, './src/components/' + name]
  })

/*
 HACK
 Extracting the ruleset into its own variable and using them as a base to
 override for for Typescript files.
 Doing this feels a bit hacky, but it's a start.
 */
const ruleDefinitions = {
  "array-bracket-spacing": 0,
  "array-callback-return": 1,
  "arrow-parens": 0,
  "camelcase": 1,
  "class-methods-use-this": 1,
  "comma-dangle": 0,
  "comma-spacing": 0,
  "comma-style": 1,
  "computed-property-spacing": 0,
  "consistent-return": 1,
  "curly": 1,
  "dot-notation": 1,
  "eol-last": 1,
  "eqeqeq": 1,
  "function-paren-newline": 0,
  "global-require": 1,
  "guard-for-in": 1,
  "implicit-arrow-linebreak": 0,
  "import/extensions": [
    "error",
    "ignorePackages",
    {
      "js": "never",
      "jsx": "never",
      "ts": "never",
      "tsx": "never"
    }
  ],
  "import/named": 2,
  "import/namespace": 2,
  "import/newline-after-import": 0,
  "import/no-cycle": 0, // takes 90+ seconds to run due to size of codebase
  "import/no-default-export": 1,
  "import/no-dynamic-require": 1,
  "import/no-extraneous-dependencies": 1,
  "import/no-self-import": 1,
  "import/no-unresolved": 2,
  "import/prefer-default-export": 0,
  "indent": [2, 2, { "ignoredNodes": ["JSXElement"] }],
  "jsx-a11y/anchor-has-content": 1,
  "jsx-a11y/anchor-is-valid": 1,
  "jsx-a11y/click-events-have-key-events": 1,
  "jsx-a11y/label-has-associated-control": 1,
  "jsx-a11y/label-has-for": 1,
  "jsx-a11y/no-noninteractive-element-interactions": 1,
  "jsx-a11y/no-static-element-interactions": 1,
  "jsx-quotes": 1,
  "key-spacing": 1,
  "keyword-spacing": 1,
  "lines-between-class-members": 1,
  "max-len": 0,
  "new-cap": 1,
  "new-parens": 1,
  "newline-before-return": 2,
  "no-async-promise-executor": 1,
  "no-await-in-loop": 1,
  "no-confusing-arrow": 1,
  "no-continue": 1,
  "no-control-regex": 1,
  "no-else-return": 0,
  "no-extra-boolean-cast": 2,
  "no-floating-decimal": 1,
  "no-lonely-if": 1,
  "no-mixed-operators": 1,
  "no-mixed-spaces-and-tabs": 1,
  "no-multi-assign": 1,
  "no-multi-spaces": 2,
  "no-multiple-empty-lines": [2, { "max": 1 }],
  "no-nested-ternary": 1,
  "no-param-reassign": 1,
  "no-plusplus": [2, { "allowForLoopAfterthoughts": true }],
  "no-prototype-builtins": 1,
  "no-restricted-globals": 1,
  "no-restricted-properties": 1,
  "no-restricted-syntax": 1,
  "no-return-assign": 1,
  "no-return-await": 1,
  "no-sequences": 1,
  "no-shadow": [
    2,
    {
      "allow": ["resolve", "reject", "done", "cb", "e", "err", "error", "mapStateToProps"]
    }
  ],
  "no-spaced-func": 1,
  "no-sparse-arrays": 2,
  "no-tabs": 1,
  "no-throw-literal": 1,
  "no-trailing-spaces": 1,
  "no-undef": 2,
  "no-underscore-dangle": [
    1,
    {
      "allow": ["__initialState__"]
    }
  ],
  "no-unneeded-ternary": 1,
  "no-unused-expressions": 1,
  "no-unused-vars": [1, { "argsIgnorePattern": "^_" }],
  "no-use-before-define": "off",
  "no-useless-escape": 1,
  "no-useless-return": 1,
  "no-var": 1,
  "no-whitespace-before-property": 1,
  "nonblock-statement-body-position": 1,
  "object-curly-newline": 0,
  "object-curly-spacing": 0,
  "object-property-newline": 1,
  "object-shorthand": 1,
  "one-var": 1,
  "one-var-declaration-per-line": 1,
  "operator-linebreak": 1,
  "padded-blocks": 2,
  "prefer-arrow-callback": 1,
  "prefer-const": 1,
  "prefer-destructuring": 1,
  "prefer-object-spread": 1,
  "prefer-promise-reject-errors": 1,
  "prefer-template": 1,
  "quote-props": 1,
  "quotes": 1,
  "radix": 1,
  "react/default-props-match-prop-types": 1,
  "react/destructuring-assignment": 1,
  "react/display-name": 1,
  "react/forbid-prop-types": 1,
  "react/jsx-closing-tag-location": 1,
  "react/jsx-curly-brace-presence": 1,
  "react/jsx-curly-newline": 1,
  "react/jsx-curly-spacing": 0,
  "react/jsx-filename-extension": 0,
  "react/jsx-fragments": ["off", "element"],
  "react/jsx-indent": 1,
  "react/jsx-indent-props": 0,
  "react/jsx-key": 1,
  "react/jsx-no-target-blank": [1, { "enforceDynamicLinks": "always" }],
  "react/jsx-one-expression-per-line": 1,
  "react/jsx-props-no-multi-spaces": 1,
  "react/jsx-props-no-spreading": 1,
  "react/jsx-wrap-multilines": 1,
  "react/no-access-state-in-setstate": 1,
  "react/no-array-index-key": 1,
  "react/no-children-prop": 2,
  "react/no-deprecated": 1,
  "react/no-did-update-set-state": 0, // React says it's ok to do this: https://github.com/yannickcr/eslint-plugin-react/issues/1707
  "react/no-find-dom-node": 1,
  "react/no-redundant-should-component-update": 1,
  "react/no-string-refs": 1,
  "react/no-typos": 1,
  "react/no-unescaped-entities": 1,
  "react/no-unused-prop-types": 2,
  "react/no-unused-state": 1,
  "react/prop-types": 2,
  "react/require-default-props": 1,
  "react/self-closing-comp": 1,
  "react/sort-comp": 1,
  "react/state-in-constructor": 1,
  "react/static-property-placement": 1,
  "react/style-prop-object": 1,
  "semi" : [2, "never"],
  "space-before-function-paren": 1,
  "space-in-parens": 0,
  "space-unary-ops": 0,
  "switch-colon-spacing": 1,
  "symbol-description": 1,
  "vars-on-top": 1
}

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    'import/resolver': {
      // Resolving to our webpack config didn't work within the time-box
      // for this change, but is the preferred solutions.
      // "webpack": {
      //   config: {
      //     paths: [path.resolve(__dirname, './config/webpack.client.js')],
      //   }
      // },
      node: {
        paths: ['.'],
      },
      alias: {
        map: [
          ['store', './src/store.js'],
          ['jsdom', './fallbacks/jsdom'],
          ['goustouicomponents', './libs/goustouicomponents/src/main'],
          ['zest', './libs/goustouicomponents/dist'],
          ['design-language', './libs/goustouicomponents/dist/design-language'],
          ['server', './server'],
          ['styles', './libs/goustouicomponents/dist/styles'],
          ['styles', './src/styles'],
          ['fixtures', '../../../tests/regression/fixtures'],
          ...srcFileAliases,
          ...componentFileAliases,
        ],
        extensions: ['.js', '.ts', '.tsx', '.css'],
      },
    },
  },
  rules: ruleDefinitions,
  env: {
    jasmine: true,
    jest: true,
  },
  "globals": {
    "document": true,
    "navigator": true,
    "require": false,
    "window": true,
    "__DEV__": false,
    "__PROD__": false,
    "__SERVER__": false,
    "__CLIENT__": false,
    "__ENV__": false,
    "__DOMAIN__": false,
    "__CLIENT_PROTOCOL__": false,
    "__CLOUDFRONT_URL__": false,
    "__CHECKOUT_PK__": false,
    "__RECAPTCHA_RAF_PUBK__": false,
    "__RECAPTCHA_RAF_PVTK__": false,
    "__API_TOKEN__": false,
    "__AUTH_CLIENT_SECRET__": false,
    "__AUTH_CLIENT_ID__": false,
    "ga": false,
    "hj": true,
    "after": true,
    "Cypress": true,
    __CIRCLE_BUILD_NUM__: true,
    __STORYBOOK__: false,
  },
  plugins: ['prettier'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'airbnb',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:react-hooks/recommended',
      ],
      globals: { Atomics: 'readonly', SharedArrayBuffer: 'readonly' },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint', 'prettier', 'react'],
      rules: {
        ...ruleDefinitions, ...{
          '@typescript-eslint/ban-ts-comment': 'warn',
          '@typescript-eslint/no-empty-function': 1,
          '@typescript-eslint/no-var-requires': 1,
          '@typescript-eslint/no-use-before-define': ['warn'],
          '@typescript-eslint/explicit-module-boundary-types': 'off'
        },
      }
    },
    {
      files: ['**/*.test.js'],
      env: {
        jest: true,
      },
      rules: {
        'react/display-name': 0,
        'react/jsx-props-no-spreading': 0,
      },
    },
    {
      files: ['**/__regression__/**/*.js'],
      globals: {
        Cypress: 'readonly',
        cy: 'readonly',
        before: 'readonly',
      },
    },
    {
      // Make eslint rules agree with prettier.
      files: [
        'src/routes/Checkout/**/*.js',
        'src/routes/Home/**/*.js',
        'src/routes/Payment/**/*.js',
        'src/routes/Signup/**/*.js',
        'src/routes/ShowcaseMenu/**/*.js',
        'src/middlewares/tracking/dataLayerTracker/*.js',
        'src/routes/BoxPrices/**/*.js',
        "src/performanceTracker/**/*.js",
        'src/routes/Menu/**/*.js',
        'src/routes/Menu/**/*.ts',
        'src/routes/Menu/**/*.tsx',
      ],
      rules: {
        'prettier/prettier': 'error',
        'operator-linebreak': [
          1,
          'after',
          {
            overrides: {
              '?': 'before',
              ':': 'before',
            },
          },
        ],
        indent: 0,
        'newline-per-chained-call': 0,
        'no-confusing-arrow': 0,
        'react/jsx-indent': 0,
        'react/jsx-one-expression-per-line': 0,
        'react/jsx-wrap-multilines': 0,
        'react/jsx-curly-newline': 0,
      },
    },
  ],
}
