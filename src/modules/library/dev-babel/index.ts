const base = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
    // "@emotion/babel-preset-css-prop",
  ],
  // "plugins": ["@emotion"]
}

module.exports = base
