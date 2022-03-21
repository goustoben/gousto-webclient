import { fetch } from 'utils/fetch'
import logger from 'utils/logger'
import endpoint from 'config/endpoint'
import { useUserIdForOptimizely } from 'containers/OptimizelyRollouts/useOptimizely.hook'
import { getRequestHeaders } from './_utils'

export const sendClientMetric = async (name, value, unit = 'None', userId) => {
  const reqData = {
    client: 'web',
    name,
    value,
    unit
  }

  const headers = getRequestHeaders(userId)

  try {
    await fetch(null, `${endpoint('clientmetrics')}/metric`, reqData, 'POST', 'default', headers)
  } catch (e) {
    logger.warning({
      message: 'Failed to send client metric',
      extra: {
        name, value, unit
      },
      error: new Error('mock error')
    })
  }
}

export const useSendClientMetric = () => {
  const userId = useUserIdForOptimizely()

  return (name, value, unit) => sendClientMetric(name, value, unit, userId)
}
