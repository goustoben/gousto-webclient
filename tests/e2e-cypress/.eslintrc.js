module.exports = {
  extends: '../../.eslintrc.js',
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
