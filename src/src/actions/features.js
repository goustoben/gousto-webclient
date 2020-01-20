import { actionTypes } from './actionTypes'

export const featuresSet = (features) => {
  return {
    type: actionTypes.FEATURES_SET,
    features: features.map(({feature, value}) => {
      if (value === 'true') {
        value = true
      }

      if (value === 'false') {
        value = false
      }

      return {
        feature,
        value,
      }
    })
  }
}

