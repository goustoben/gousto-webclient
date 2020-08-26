import optimizelyRollouts from 'config/head/optimizelyRollouts'
import optimizelySdk from '@optimizely/optimizely-sdk'

class OptimizelySDK {
  optimizelyRolloutsInstance = null

  validInstance = false

  loading = false

  async getOptimizelyInstance() {
    if (!this.hasInstance()) {
      this.loading = true
      this.optimizelyRolloutsInstance = optimizelySdk.createInstance({
        sdkKey: optimizelyRollouts[__ENV__], //eslint-disable-line
      })
      try {
        const {success} = await this.optimizelyRolloutsInstance.onReady({timeout: 5000})
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
