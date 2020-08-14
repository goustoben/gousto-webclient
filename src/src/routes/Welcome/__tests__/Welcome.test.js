import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import Welcome from '../Welcome'

describe('Welcome Page', () => {
  let context
  let wrapper
  const orderId = '1234'
  const products = Immutable.Map({})
  const user = Immutable.fromJS({ nameFirst: 'User', ageVerified: false, orders: [] })
  const welcomePageAppPromo = true
  const userFetchReferralOffer = jest.fn()
  const query = {}
  const params = { orderId: '1234'}
  const fetchData = jest.fn().mockReturnValue(Promise.resolve())

  describe('when welcomePageAppPromo is true', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Welcome
          orderId={orderId}
          products={products}
          user={user}
          welcomePageAppPromo={welcomePageAppPromo}
          userFetchReferralOffer={userFetchReferralOffer}
          query={query}
          params={params}
          fetchData={fetchData}
        />, { context })
    })
    it('should render Vertical Stages component', () => {
      expect(wrapper.find('VerticalStages').length).toEqual(1)
      expect(wrapper.find('VerticalStagesItem').length).toEqual(2)
    })
    it('should render AppPromo component', () => {
      expect(wrapper.find('AppPromo').length).toEqual(1)
    })
    it('should pass expected props to the VerticalStagesItem', () => {
      expect(wrapper.find('VerticalStagesItem').first().prop('title')).toEqual('Thanks User')
    })
  })
})
