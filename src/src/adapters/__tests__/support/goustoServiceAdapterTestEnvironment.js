import NodeEnvironment from 'jest-environment-node'
import path from 'path'

class GoustoServiceAdapterTestEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context)
    this.global.pactProvider = path.basename(path.dirname(context.testPath))
  }

  async setup() {
    await super.setup()
    this.global.adapterTest = true
  }
}

module.exports = GoustoServiceAdapterTestEnvironment
