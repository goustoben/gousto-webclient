const productionConfig = require('./webpack.server')

const config = {
  ...productionConfig,
  entry: ['./server/development/main.js'],
}

module.exports = config
