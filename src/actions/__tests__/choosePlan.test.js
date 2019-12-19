import actionTypes from 'actions/actionTypes'
import { basketPromoCodeChange } from 'actions/basket'
import { redirect } from 'actions/redirect'
import routes from 'config/routes'
import { choosePlanContinue, trackSubscriptionOptionSelected, clearTempPromoCode, stashTempPromoCode } from '../choosePlan'

jest.mock('actions/basket', () => ({
  basketPromoCodeChange: jest.fn()
}))

jest.mock('actions/redirect', () => ({
  redirect: jest.fn()
}))

describe('choosePlan actions', () => {
  const dispatch = jest.fn()

  describe('trackSubscriptionOptionSelected', () => {
    const selectedOption = 'subscription'

    it('should call the tracking action with SubscriptionOption Selected', () => {
      trackSubscriptionOptionSelected(selectedOption)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'SubscriptionOption Selected',
          subscriptionOption: selectedOption
        }
      })
    })
  })

  describe('clearTempPromoCode', () => {

    it('should dispatch a temp action with a blank promoCode', () => {
      clearTempPromoCode()(dispatch)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.TEMP,
        key: 'promoCode',
        value: ''
      })
    })
  })

  describe('stashTempPromoCode', () => {
    const testPromoCode = 'TEST-PROMO'

    it('should dispatch a temp action with the given promoCode', () => {
      stashTempPromoCode(testPromoCode)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.TEMP,
        key: 'promoCode',
        value: testPromoCode
      })
    })
  })

  describe('choosePlanContinue', () => {
    const subscriptionOption = 'subscription'
    const chosenPromoCode = 'TEST-PROMO'

    it('should call basketPromoCodeChange action with given promoCode', () => {
      choosePlanContinue(subscriptionOption, chosenPromoCode)(dispatch)
      expect(basketPromoCodeChange).toHaveBeenCalledWith(chosenPromoCode)
    })
    it('should call the choose plan continue action with given subscriptionOption', () => {
      choosePlanContinue(subscriptionOption, chosenPromoCode)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.CHOOSE_PLAN_CONTINUE,
        subscriptionOption,
        trackingData: {
          actionType: 'SubscriptionOption Chosen',
          subscriptionOption
        }
      })
    })
    it('should call the redirect action', () => {
      choosePlanContinue(subscriptionOption, chosenPromoCode)(dispatch)
      expect(redirect).toHaveBeenCalledWith(routes.client['check-out'])
    })
  })
})
