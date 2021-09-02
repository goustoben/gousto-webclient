import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { Welcome } from '../Welcome'

describe('Given Welcome Page', () => {
  let context
  let wrapper
  const orderId = '1234'
  const device = 'mobile'
  const products = Immutable.Map({})
  const user = Immutable.fromJS({ nameFirst: 'User', ageVerified: false, orders: [] })
  const userFetchReferralOffer = jest.fn()
  const trackWelcomeAppPromoClick = jest.fn()
  const query = {}
  const params = { orderId: '1234'}
  const fetchData = jest.fn().mockReturnValue(Promise.resolve())
  const orderDetails = {}
  const props = {
    orderId,
    products,
    user,
    userFetchReferralOffer,
    query,
    params,
    fetchData,
    trackWelcomeAppPromoClick,
    device,
    orderDetails,
  }

  beforeEach(() => {
    wrapper = shallow(<Welcome {...props} />, { context })
  })

  test('should renders properly', () => {
    expect(wrapper.find('.contentContainer').length).toEqual(1)
    expect(wrapper.find('AppPromo').length).toEqual(1)
  })

  describe('when isGoustoOnDemandEnabled is true', () => {
    beforeEach(() => {
      wrapper.setProps({
        isGoustoOnDemandEnabled: true,
        orderDetails: {
          deliveryDate: '12-12-2020',
          deliveryEnd: '12-12-2020',
          deliveryStart: '12-12-2020',
          whenCutoffDate: '10-12-2020',
          whenCutoffTime: '12',
        },
      })
    })

    test('then VerticalStages components should be rendered', () => {
      expect(wrapper.find('VerticalStages').length).toEqual(1)
      expect(wrapper.find('VerticalStagesItem').length).toEqual(2)
    })
  })
})
