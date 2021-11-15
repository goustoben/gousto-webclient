import * as trackingKeys from 'actions/trackingKeys'
import { getUserId } from 'selectors/user'

export const trackWelcomeToGoustoButton = (orderId) => (dispatch, getState) => {
  const state = getState()
  const type = trackingKeys.checkoutWelcomeToGousto
  const promoCode = state.promoStore.keySeq().first()
  const userId = getUserId(state)

  dispatch({
    type,
    trackingData: {
      actionType: type,
      promoCode,
      orderId,
      userId,
    }
  })
}
