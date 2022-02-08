module.exports = {
  root: true,
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: [
    '.eslintrc.js'
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
    '@typescript-eslint'
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    '@typescript-eslint/explicit-function-return-type': 'off'
  },
  settings: {
    react: {
      version: "17.0.2"
    }
  }
}
