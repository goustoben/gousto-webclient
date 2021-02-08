import React from 'react'
import { shallow } from 'enzyme'
import { PaymentFooter } from '../PaymentFooter'

describe('PaymentFooter', () => {
  let wrapper
  const props = {
    onClick: jest.fn(),
    trackSubmitOrderEvent: jest.fn(),
    submitting: true,
  }

  beforeEach(() => {
    wrapper = shallow(<PaymentFooter {...props} />)
  })

  test('should render correctly', () => {
    expect(wrapper.find('NoLockIn').exists()).toBeTruthy()
    expect(wrapper.find('TermsAndConditions').exists()).toBeTruthy()
  })
})
