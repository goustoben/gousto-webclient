import actionTypes from 'actions/actionTypes'
import { redirect } from 'actions/redirect'
import routes from 'config/routes'
import tempActions from './temp'
import { basketPromoCodeChange } from './basket'

export const trackSubscriptionOptionSelected = subscriptionOption => dispatch => {
  dispatch({
    type: actionTypes.TRACKING,
    trackingData: {
      actionType: 'SubscriptionOption Selected',
      subscriptionOption
    }
  })
}

export const clearTempPromoCode = () => dispatch => {
  dispatch(tempActions.temp('promoCode', ''))
}

export const stashTempPromoCode = promoCode => dispatch => {
  dispatch(tempActions.temp('promoCode', promoCode))
}

export const choosePlanContinue = (
  subscriptionOption,
  chosenPromoCode
) => dispatch => {
  dispatch(basketPromoCodeChange(chosenPromoCode))
  dispatch({
    type: actionTypes.CHOOSE_PLAN_CONTINUE,
    subscriptionOption,
    trackingData: {
      actionType: 'SubscriptionOption Chosen',
      subscriptionOption
    }
  })
  dispatch(redirect(routes.client['check-out']))
}
