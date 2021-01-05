import { gtm } from './gtm'
import { trustpilot } from './trustpilot'

const head = {
  gtm,
  trustpilot,
  defaultMeta: require('./defaultMeta').default,
  fbTracking: require('./fbTracking').default,
  pingdom: require('./pingdom').default,
  favicon: require('./favicon').default,
  mobileMeta: require('./mobileMeta').default,
  optimizely: require('./optimizely').default
}

/* eslint-disable-next-line import/no-default-export */
export default head
