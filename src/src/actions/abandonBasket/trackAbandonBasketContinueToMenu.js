import { actionTypes } from "actions/actionTypes"

export const trackAbandonBasketContinueToMenu = () => (dispatch) => {
    dispatch({
        type: actionTypes.TRACKING,
        trackingData: {
            actionType: 'AbandonedBasket ContinueToMenu',
        }
    })
}
