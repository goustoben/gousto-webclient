export default function featuresLoadedFromStore({ enable, disable, set = {}, features = {}, experiments = {} } = {}, store) { // eslint-disable-line no-underscore-dangle
  const state = store.getState()
  let allMatched = true

  if (enable) {
    allMatched = !enable.some(feature => !state.features.getIn([feature, 'value']))
  }

  if (allMatched && disable) {
    allMatched = !disable.some(feature => state.features.getIn([feature, 'value']) !== false)
  }

  const featuresToCheck = { ...set, ...features, ...experiments }

  if (allMatched && featuresToCheck) {
    allMatched = !Object.keys(featuresToCheck).some(name => state.features.getIn([name, 'value']) !== featuresToCheck[name])
  }

  return allMatched
}
