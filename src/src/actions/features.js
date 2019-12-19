import actionTypes from './actionTypes'

export const featureSet = (feature, val, experiment = false) => (
  (dispatch, getState) => {
    let value = val

    if (val === 'true') {
      value = true
    }

    if (val === 'false') {
      value = false
    }

    const isAuthenticated = getState().auth.get('isAuthenticated')

    dispatch({
      type: actionTypes.FEATURE_SET,
      feature,
      value,
      experiment,
      isAuthenticated,
    })
  }
)

export default {
  featureSet,
}
