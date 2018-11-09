import actions from 'actions'

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

function setFeatures(store, list, ...args) {
  const isArray = Array.isArray(list)

  return isArray
    ? list.forEach(item => {
      store.dispatch(actions.featureSet(item, ...args))
    })
    : store.dispatch(actions.featureSet(list, ...args))
}

const processExperimentsQuery = (query, store) => {
  const experiments = query['experiments[]']
  if (experiments) setFeatures(store, experiments, true, true)

  // select default menu if none provided
  if (!query['experiments[menu]']) {
    store.dispatch(actions.featureSet('menu', 'default', true))
  }

  getFeatureValues(query, 'experiments')
    .map(({ feature, value }) => store.dispatch(actions.featureSet(feature, value, true)))
}

const processFeaturesQuery = (query, store) => {
  if (query && store) {
    const enabledFeatures = query['features[]']
    const disabledFeatures = query['disabledFeatures[]']

    if (enabledFeatures) setFeatures(store, enabledFeatures, true)
    if (disabledFeatures) setFeatures(store, disabledFeatures, false)

    getFeatureValues(query)
      .map(({ feature, value }) => store.dispatch(actions.featureSet(feature, value)))

    store.dispatch(actions.featureSet('forceCollections', true))
    store.dispatch(actions.featureSet('landingOrder', true))

    processExperimentsQuery(query, store)
  }
}

export default processFeaturesQuery
