import { actionTypes } from "actions/actionTypes"

export const trackAbandonBasketEligibility = () => (dispatch, getState) => {
    const isFeatureFlagEnabled = getState().features.getIn(['abandonBasket', 'value'])

    dispatch({
        type: actionTypes.TRACKING,
        trackingData: {
            actionType: 'AbandonedBasket Available',
            featureFlagEnabled: isFeatureFlagEnabled
        }
    })
}
