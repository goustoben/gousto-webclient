module.exports = {
  root: true,
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended'
  ],
  overrides: [
    {
      files: ['src/modules/features/**/*.{js,ts,tsx,jsx}'],
      rules: {
        'custom-rules/prevent-import': 2
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    tsconfigRootDir: __dirname
  },
  plugins: ['@typescript-eslint', '@library/custom-rules'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@library/custom-rules/prevent-import': 2,
  },
  settings: {
    react: {
      version: '17.0.2'
    }
  }
}
