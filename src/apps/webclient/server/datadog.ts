import tracer from 'dd-trace'

export const configureDDTracer = (): void => {
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
