import { featuresSet } from "actions/features/featuresSet"

export const signupSetGoustoOnDemandEnabled = (featureValue) => (
  dispatch => {
    dispatch(featuresSet([{feature: 'isGoustoOnDemandEnabled', value: featureValue}]))
  }
)
