import React from 'react'
import { shallow } from 'enzyme'
import { click3dsReenterCardDetails, click3dsUpdateInfo } from 'actions/trackingKeys'
import { PaymentDetailsNotification } from '../PaymentDetailsNotification'

describe('Given PaymentDetailsNotification', () => {
  let wrapper
  const track3dsCompliantClick = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <PaymentDetailsNotification track3dsCompliantClick={track3dsCompliantClick} />
    )
  })

  test('should render component properly', () => {
    expect(wrapper).toBeDefined()
    expect(wrapper.find('Section').exists()).toBeTruthy()
    expect(wrapper.find('Alert').exists()).toBeTruthy()
    expect(wrapper.find('CardDetailsModal').exists()).toBeTruthy()
  })

  describe('when primary cta is clicked', () => {
    beforeEach(() => {
      wrapper.find('Button').at(0).simulate('click')
    })

    test('then track3dsCompliantClick should be called with proper parameter', () => {
      expect(track3dsCompliantClick).toHaveBeenCalledWith(click3dsReenterCardDetails)
    })
  })

  describe('when secondary cta is clicked', () => {
    beforeEach(() => {
      wrapper.find('Button').at(1).simulate('click')
    })

    test('then track3dsCompliantClick should be called with proper parameter', () => {
      expect(track3dsCompliantClick).toHaveBeenCalledWith(click3dsUpdateInfo)
    })
  })
})
