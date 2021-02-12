import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { getPromoBannerState } from 'utils/home'
import { PromoBannerContainer } from '../PromoBannerContainer'

jest.mock('config/home', () => ({
  promo: {
    banner: {
      mayText: 'promo banner text',
    },
  },
}))

jest.mock('utils/home', () => ({
  getPromoBannerState: jest.fn(),
}))

describe('PromoBannerContainer', () => {
  let wrapper
  const initialState = {
    features: Immutable.Map({
      promoBannerText: Immutable.fromJS({
        value: '',
      }),
    }),
  }

  const store = {
    getState: jest.fn(() => initialState),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  }

  beforeEach(() => {
    getPromoBannerState.mockReturnValue({
      hide: false,
      canApplyPromo: true,
      promoCode: '',
    })
    wrapper = shallow(<PromoBannerContainer store={store} />)
  })

  test('should be rendered properly', () => {
    const expected = {
      text: 'promo banner text',
      hide: false,
      promoCode: '',
      canApplyPromo: true,
    }
    expect(wrapper.props()).toEqual(expect.objectContaining(expected))
  })
})
