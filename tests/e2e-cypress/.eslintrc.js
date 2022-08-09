module.exports = {
  extends: ['../../.eslintrc.js', 'prettier'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.js', '.d.ts'],
      },
    },
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
}
