module.exports = {
  root: true,
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    tsconfigRootDir: __dirname
  },
  plugins: [
    '@typescript-eslint',
    '@library/feature-modules',
    'immutable',
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    // we'll restrict these to feature modules for now
    '@library/feature-modules/prevent-import': 0,
    'immutable/no-let': 0,
    'immutable/no-this': 0,
    'immutable/no-mutation': 0
  },
  overrides: [
    {
      files: ['src/modules/features/**/*.{js,ts,tsx,jsx}'],
      rules: {
        '@library/feature-modules/prevent-import': 2,
        'immutable/no-let': 2,
        'immutable/no-this': 2,
        'immutable/no-mutation': 2
      }
    },
  ],
  settings: {
    react: {
      version: '17.0.2'
    }
  }
}
