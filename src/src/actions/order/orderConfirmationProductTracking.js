import { actionTypes } from 'actions/actionTypes'

export const orderConfirmationProductTracking = (productId, added) => (
  (dispatch) => {
    dispatch({
      type: actionTypes.BASKET_PRODUCT_TRACKING,
      trackingData: {
        actionType: added ? 'MarketProduct Added' : 'MarketProduct Removed',
        product_id: productId,
      },
    })
  }
)
