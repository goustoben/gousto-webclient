import Immutable from 'immutable'
import { getAbandonBasketSessionState, trackAbandonBasketEligibility, trackAbandonBasketContinueToMenu } from '../abandonBasket'

const dispatchSpy = jest.fn()
const getStateSpy = jest.fn()
describe('abandon basket actions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getAbandonBasketSessionState', () => {
    test('it should dispatch an action SET_FIRST_LOAD_OF_SESSION with true', () => {
      window.sessionStorage.setItem('isFirstLoadOfSession', true)

      getAbandonBasketSessionState()(dispatchSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({ type: 'SET_FIRST_LOAD_OF_SESSION', value: true })
    })

    test('it should dispatch an action SET_FIRST_LOAD_OF_SESSION with false', () => {
      window.sessionStorage.setItem('isFirstLoadOfSession', false)

      getAbandonBasketSessionState()(dispatchSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({ type: 'SET_FIRST_LOAD_OF_SESSION', value: false })
    })
  })

  describe('trackAbandonBasketEligibility', () => {
    test('it should dispatch an action TRACKING with tracking data of type "AbandonedBasket Available"', () => {
      getStateSpy.mockReturnValue({
        features: Immutable.fromJS({
          abandonBasket: { value: true }
        })
      })
      trackAbandonBasketEligibility()(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({ type: 'TRACKING', trackingData: expect.objectContaining({ actionType: 'AbandonedBasket Available' }) })
    })

    test('it should dispatch an action TRACKING with the feature flag value', () => {
      getStateSpy.mockReturnValue({
        features: Immutable.fromJS({
          abandonBasket: { value: true }
        })
      })
      trackAbandonBasketEligibility()(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({ type: 'TRACKING', trackingData: { actionType: 'AbandonedBasket Available', featureFlagEnabled: true } })
    })
  })

  describe('trackAbandonBasketContinueToMenu', () => {
    test('it should dispatch an action TRACKING with tracking data of type "AbandonedBasket ContinueToMenu"', () => {
      getStateSpy.mockReturnValue({
        features: Immutable.fromJS({
          abandonBasket: { value: true }
        })
      })
      trackAbandonBasketContinueToMenu()(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({ type: 'TRACKING', trackingData: expect.objectContaining({ actionType: 'AbandonedBasket ContinueToMenu' }) })
    })
  })
})
