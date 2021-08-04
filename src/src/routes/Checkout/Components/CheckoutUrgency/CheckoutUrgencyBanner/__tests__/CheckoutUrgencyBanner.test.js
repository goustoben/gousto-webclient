import React from 'react'
import { mount } from 'enzyme'
import { CheckoutUrgencyContext } from '../../CheckoutUrgencyContext'
import { CheckoutUrgencyBanner } from '../CheckoutUrgencyBanner'

describe('CheckoutUrgencyBanner', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<CheckoutUrgencyBanner />, {
      wrappingComponent: CheckoutUrgencyContext.Provider,
      wrappingComponentProps: { value: 600 },
    })
  })

  test('renders correctly', () => {
    expect(wrapper.find('#CheckoutUrgencyBanner_remainingSeconds').text()).toBe('600')
  })
})
