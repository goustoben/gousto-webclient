import { gtm } from './gtm'

const head = {
  gtm,
  defaultMeta: require('./defaultMeta').default,
  fbTracking: require('./fbTracking').default,
  pingdom: require('./pingdom').default,
  favicon: require('./favicon').default,
  mobileMeta: require('./mobileMeta').default,
  optimizely: require('./optimizely').default,
  queueit: require('./queueit').default
}

/* eslint-disable-next-line import/no-default-export */
export default head
