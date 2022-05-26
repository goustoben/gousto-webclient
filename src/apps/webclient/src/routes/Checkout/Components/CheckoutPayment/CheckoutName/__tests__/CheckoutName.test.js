import React from 'react'

import { shallow } from 'enzyme'

import { CheckoutName } from '../CheckoutName'

describe('given CheckoutName', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<CheckoutName sectionName="payment" receiveRef={jest.fn()} />)
  })

  test('should be rendered correctly', () => {
    expect(wrapper.find('FormSection').exists()).toBeTruthy()
  })
})
