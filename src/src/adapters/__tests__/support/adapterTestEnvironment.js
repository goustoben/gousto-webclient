const NodeEnvironment = require('jest-environment-node')


class AdapterTestEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup()
    this.global.adapterTest = true
  }
}

module.exports = AdapterTestEnvironment
