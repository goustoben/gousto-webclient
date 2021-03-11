import React from 'react'
import { shallow } from 'enzyme'
import { PaymentFooter } from '../PaymentFooter'

describe('PaymentFooter', () => {
  let wrapper
  const props = {
    onClick: jest.fn(),
    trackSubmitOrderEvent: jest.fn(),
    submitting: true,
    isNoLockInVisible: false,
  }

  beforeEach(() => {
    wrapper = shallow(<PaymentFooter {...props} />)
  })

  test('should render correctly', () => {
    expect(wrapper.find('SubscriptionTransparency').exists()).toBeTruthy()
    expect(wrapper.find('NoLockIn').exists()).toBeFalsy()
    expect(wrapper.find('TermsAndConditions').exists()).toBeTruthy()
  })

  describe('when isNoLockInVisible is true', () => {
    beforeEach(() => {
      wrapper.setProps({
        isNoLockInVisible: true
      })
    })

    test('then should render correctly', () => {
      expect(wrapper.find('SubscriptionTransparency').exists()).toBeFalsy()
      expect(wrapper.find('NoLockIn').exists()).toBeTruthy()
      expect(wrapper.find('TermsAndConditions').exists()).toBeTruthy()
    })
  })
})
