import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { getPromoBannerState } from 'utils/home'
import { PromoBannerContainer } from '../PromoBannerContainer'

jest.mock('config/home', () => ({
  promo: {
    defaultBannerText: 'promo banner text',
  },
}))

jest.mock('utils/home', () => ({
  getPromoBannerState: jest.fn(),
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
  })

  beforeEach(() => {
    getPromoBannerState.mockReturnValue({
      canApplyPromo: true,
      promoCode: '',
    })
    wrapper = shallow(<PromoBannerContainer store={store} />)
  })

  test('should be rendered properly', () => {
    const expected = {
      text: 'promo banner text',
      promoCode: '',
      canApplyPromo: true,
    }
    expect(wrapper.find('PromoBanner').props()).toEqual(expect.objectContaining(expected))
  })
})
