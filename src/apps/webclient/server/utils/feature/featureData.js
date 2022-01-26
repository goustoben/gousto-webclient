export const PREFETCH_MENU_EXPERIMENT_NAME = 'prefetchMenu'

const featureData = new Map([
  [PREFETCH_MENU_EXPERIMENT_NAME, { percentage: 50 }],
])

export const getFeatures = () => featureData
