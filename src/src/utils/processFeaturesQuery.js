import { featuresSet } from 'actions/features'

const getFeatureValues = (query, keyword = 'features') => {
  const regex = new RegExp(`${keyword}\\[([\\w-]+)\]`)

  return Object.keys(query)
    .filter(key => regex.test(key))
    .map(key => {
      const feature = regex.exec(key)[1]
      if (feature.trim() !== '') {
        return ({
          feature,
          value: query[key],
        })
      }

      return null
    })
    .filter(feature => feature !== null)
}

function setFeatures(store, list, value, experiment = false) {
  const isArray = Array.isArray(list)
  const featuresArr = []

  if (isArray) {
    list.forEach(item => {
      featuresArr.push({ feature: item, value, experiment })
    })
  } else {
    featuresArr.push({ feature: list, value, experiment })
  }

  store.dispatch(featuresSet(featuresArr))
}

const processExperimentsQuery = (query, store) => {
  const experiments = query['experiments[]']
  if (experiments) setFeatures(store, experiments, true, true)

  const featureValues = getFeatureValues(query, 'experiments')
    .map(({ feature, value }) => ({ feature, value, experiment: true }))

  store.dispatch(featuresSet(featureValues))
}

const processFeaturesQuery = (query, store) => {
  if (query && store) {
    const enabledFeatures = query['features[]']
    const disabledFeatures = query['disabledFeatures[]']

    if (enabledFeatures) setFeatures(store, enabledFeatures, true)
    if (disabledFeatures) setFeatures(store, disabledFeatures, false)

    const featureValues = getFeatureValues(query)

    featureValues.push({ feature: 'landingOrder', value: true })

    store.dispatch(featuresSet(featureValues))

    processExperimentsQuery(query, store)
  }
}

export default processFeaturesQuery
