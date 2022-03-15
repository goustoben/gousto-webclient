import { actionTypes } from './actionTypes'

export const featuresSet = (features) => ({
  type: actionTypes.FEATURES_SET,
  features: features.map(({ feature, value }) => {
    let valueStringOrBoolean

    if (value === 'true') {
      valueStringOrBoolean = true
    } else if (value === 'false') {
      valueStringOrBoolean = false
    } else {
      valueStringOrBoolean = value
    }

    return {
      feature,
      value: valueStringOrBoolean,
    }
  }),
})
