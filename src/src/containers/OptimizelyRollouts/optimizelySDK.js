import optimizelySdk, { enums } from '@optimizely/optimizely-sdk'
import optimizelyRollouts from '../../config/head/optimizelyRollouts'

export const timeout = 5000

class OptimizelySDK {
  optimizelyRolloutsInstance = null

  validInstance = false

  loading = false

  async getOptimizelyInstance() {
    if (!this.hasInstance()) {
      this.loading = true
      this.optimizelyRolloutsInstance = optimizelySdk.createInstance({
        sdkKey: optimizelyRollouts[__ENV__] || optimizelyRollouts.staging, //eslint-disable-line
        logLevel: __ENV__ === 'local' ? enums.LOG_LEVEL.INFO : enums.LOG_LEVEL.ERROR,
        eventBatchSize: 10,
        eventFlushInterval: 1000,
      })
      try {
        const { success } = await this.optimizelyRolloutsInstance.onReady({ timeout })
        this.validInstance = success
      } catch (err) {
        this.validInstance = false
      } finally {
        this.loading = false
      }
    }

    return this.optimizelyRolloutsInstance
  }

  hasInstance() {
    return !!this.optimizelyRolloutsInstance
  }

  hasValidInstance() {
    return this.validInstance
  }

  isLoading() {
    return this.loading
  }
}

const instanceSDK = new OptimizelySDK()

export const instance = instanceSDK
export const hasValidInstance = () => instanceSDK.hasValidInstance()
export const hasInstance = () => instanceSDK.hasInstance()
export const getOptimizelyInstance = () => instanceSDK.getOptimizelyInstance()
export const isLoading = () => instanceSDK.isLoading()
