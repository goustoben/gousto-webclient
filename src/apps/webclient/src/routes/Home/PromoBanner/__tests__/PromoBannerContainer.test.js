import React from 'react'
import Immutable from 'immutable'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { promo } from 'config/home'
import { PromoBannerContainer } from '../PromoBannerContainer'

jest.mock('containers/OptimizelyRollouts', () => ({
  isOptimizelyFeatureEnabledFactory: jest.fn().mockReturnValue(() => false),
  useIsOptimizelyFeatureEnabled: jest.fn().mockReturnValue(false),
}))

describe('PromoBannerContainer', () => {
  let wrapper
  const mockStore = configureMockStore()
  const store = mockStore({
    features: Immutable.Map({
      promoBannerText: Immutable.fromJS({
        value: '',
      }),
    }),
    basket: Immutable.fromJS({
      promoCode: '',
    }),
    error: Immutable.fromJS({}),
    auth: Immutable.fromJS({
      id: null,
    }),
  })

  describe('when beetroots_two_month_promo_code_web_enabled is off', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <PromoBannerContainer store={store} />
        </Provider>
      )
    })

    test('then it should pass default promo code and text', () => {
      const expected = {
        text: promo.defaultBannerText,
        promoCode: promo.defaultPromoCode,
        canApplyPromo: true,
      }
      expect(wrapper.find('PromoBanner').props()).toEqual(expect.objectContaining(expected))
    })
  })

  describe('when beetroots_two_month_promo_code_web_enabled is on', () => {
    beforeEach(() => {
      useIsOptimizelyFeatureEnabled.mockReturnValue(true)
      wrapper = mount(
        <Provider store={store}>
          <PromoBannerContainer store={store} />
        </Provider>
      )
    })

    test('then it should pass the alternate promo code and text', () => {
      const expected = {
        text: promo.twoMonthBannerText,
        promoCode: promo.twoMonthPromoCode,
        canApplyPromo: true,
      }
      expect(wrapper.find('PromoBanner').props()).toEqual(expect.objectContaining(expected))
    })
  })
})
