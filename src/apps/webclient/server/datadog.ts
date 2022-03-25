import tracer from 'dd-trace'

import { DATADOG_ENABLED_ENVS } from '../src/middlewares/datadog/config'
import { getEnvironment } from '../src/utils/isomorphicEnvironment'

export const getIsDatadogEnabled = () => {
  const currentEnv = getEnvironment()

  return DATADOG_ENABLED_ENVS.some((enabledEnv) => currentEnv === enabledEnv)
}

export const configureDDTracer = (): void => {
  if (getIsDatadogEnabled()) {
    const initializedTracer = tracer.init({
      service: 'gousto-webclient',
      env: getEnvironment(),
      version: __CIRCLE_BUILD_NUM__,
      sampleRate: 1,
    })

    initializedTracer.use('http', {
      blocklist: ['/ping'],
    })
  }
}
