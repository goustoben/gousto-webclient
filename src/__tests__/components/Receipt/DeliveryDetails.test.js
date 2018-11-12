import { shallow } from 'enzyme'
import React from 'react'

import sinon from 'sinon'

import Immutable from 'immutable' /* eslint-disable new-cap */
import DeliveryDetails from 'Receipt/DeliveryDetails'

describe('DeliveryDetails', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
			<DeliveryDetails
			  address={Immutable.fromJS({
			    line1: '1 Example Street',
			    line2: 'Zone 2',
			    line3: 'Neverland',
			    town: 'London',
			    postcode: 'F4 K3',
			  })}
			  date="2016-05-06"
			  slot={Immutable.fromJS({
			    deliveryStart: '09:00:00',
			    deliveryEnd: '16:59:59',
			  })}
			/>,
    )
  })

  test('should contain address details', () => {
    expect(wrapper.text()).toContain('1 Example Street')
    expect(wrapper.text()).toContain('Zone 2')
    expect(wrapper.text()).toContain('Neverland')
    expect(wrapper.text()).toContain('London')
    expect(wrapper.text()).toContain('F4 K3')
  })

  test('should contain the delivery date time', () => {
    expect(wrapper.text()).toContain('Fri, 6 May, 9am - 5pm')
  })

  describe('sensitive data masking', () => {
    test('delivery details should have prop "data-hj-masked"', () => {
      expect(wrapper.prop('data-hj-masked')).toEqual(true)
    })
  })
})
