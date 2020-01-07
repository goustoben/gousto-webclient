import actionTypes from './actionTypes'

export const featuresSet = (features) => {
  return {
    type: actionTypes.FEATURES_SET,
    features: features.map(({feature, value, experiment}) => {
      if (value === 'true') {
        value = true
      }

      if (value === 'false') {
        value = false
      }

      if (experiment === undefined) {
        experiment = false
      }

      return {
        feature,
        value,
        experiment
      }
    })
  }
}

