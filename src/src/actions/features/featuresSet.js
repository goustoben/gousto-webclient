import { actionTypes } from "actions/actionTypes"

export const featuresSet = (features) => ({
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
})
