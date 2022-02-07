import React from 'react'
import { mount } from 'enzyme'
import { CheckoutUrgencyContext } from '../../CheckoutUrgencyContext'
import { CheckoutUrgencyBanner } from '../CheckoutUrgencyBanner'

describe('CheckoutUrgencyBanner', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<CheckoutUrgencyBanner />, {
      wrappingComponent: CheckoutUrgencyContext.Provider,
      wrappingComponentProps: { value: 542 },
    })
  })

  test('renders correctly', () => {
    expect(wrapper.text()).toBe('Checkout within 9:02 to avoid losing your recipes')
  })
})
