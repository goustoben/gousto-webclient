import optimizelyRollouts from 'config/head/optimizelyRollouts'
import optimizelySdk from '@optimizely/optimizely-sdk'

let optimizelyRolloutsInstance

export async function getOptimizelyInstance() {
  if (!optimizelyRolloutsInstance) {
    optimizelyRolloutsInstance = optimizelySdk.createInstance({
      sdkKey: optimizelyRollouts[__ENV__], //eslint-disable-line
    })
  }

  await optimizelyRolloutsInstance.onReady()

  return optimizelyRolloutsInstance
}
