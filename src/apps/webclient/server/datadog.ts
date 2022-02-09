import tracer from 'dd-trace'

import { DATADOG_ENABLED_ENVS } from '../src/middlewares/datadog/config'

export const getIsDatadogEnabled = () =>
  DATADOG_ENABLED_ENVS.some((enabledEnv) => __ENV__ === enabledEnv)

export const configureDDTracer = (): void => {
  if (getIsDatadogEnabled()) {
    const initializedTracer = tracer.init({
      service: 'gousto-webclient',
      env: __ENV__,
      version: __CIRCLE_BUILD_NUM__,
      sampleRate: 1,
    })

    initializedTracer.use('http', {
      blocklist: ['/ping'],
    })
  }
}
