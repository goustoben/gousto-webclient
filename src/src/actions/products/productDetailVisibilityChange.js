import { actionTypes } from "actions/actionTypes"
import { push } from "react-router-redux"

export const productDetailVisibilityChange = (productId = false) => (
    (dispatch, getState) => {
        const prevLoc = getState().routing.locationBeforeTransitions
        const query = {...prevLoc.query}

        dispatch({
            type: actionTypes.PRODUCT_DETAIL_VISIBILITY_CHANGE,
            trackingData: {
                actionType: actionTypes.PRODUCT_DETAIL_VISIBILITY_CHANGE,
                productId: productId || query.productDetailId,
                show: !!productId,
            },
        })

        if (productId) {
            query.productDetailId = productId
        } else {
            delete query.productDetailId
        }

        const newLoc = {...prevLoc, query}
        dispatch(push(newLoc))
    }
)
