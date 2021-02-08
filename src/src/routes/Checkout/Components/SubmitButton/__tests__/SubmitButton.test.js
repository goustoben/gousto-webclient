import React from 'react'
import { shallow } from 'enzyme'

import { SubscriptionTransparencyText } from 'SubscriptionTransparencyText'
import { SubmitButton } from '../SubmitButton'
import CheckoutButton from '../../CheckoutButton'
import { TermsAndConditions } from '../../TermsAndConditions'

describe('SubmitButton', () => {
  let wrapper
  const props = {
    onClick: jest.fn(),
    trackSubmitOrderEvent: jest.fn(),
    submitting: true,
  }

  beforeEach(() => {
    wrapper = shallow(<SubmitButton {...props} />)
  })

  test('should render by default', () => {
    expect(wrapper).toBeDefined()
  })

  describe('when SubmitButton renders', () => {
    test('should return div', () => {
      expect(wrapper.type()).toBe('div')
    })

    test('should have a <CheckoutButton>', () => {
      expect(wrapper.find(CheckoutButton).exists()).toBeTruthy()
    })

    test('should have a <SubscriptionTransparencyText>', () => {
      expect(wrapper.find(SubscriptionTransparencyText).exists()).toBeTruthy()
    })

    test('should have <TermsAndConditions>', () => {
      expect(wrapper.find(TermsAndConditions).exists()).toBeTruthy()
    })

    test('should not call onClick by default', () => {
      expect(props.onClick).not.toBeCalled()
    })

    test('should not call trackSubmitOrderEvent by default', () => {
      expect(props.trackSubmitOrderEvent).not.toBeCalled()
    })
  })

  describe('when CheckoutButton clicked', () => {
    beforeEach(() => {
      expect(props.onClick).not.toBeCalled()
      expect(props.trackSubmitOrderEvent).not.toBeCalled()
      wrapper.find(CheckoutButton).simulate('click')
    })

    test('should call onClick and trackSubmitOrderEvent', () => {
      expect(props.trackSubmitOrderEvent).toHaveBeenCalled()
      expect(props.onClick).toBeCalled()
    })
  })

  describe('when isCheckoutOverhaulEnabled is true', () => {
    beforeEach(() => {
      wrapper.setProps({
        isCheckoutOverhaulEnabled: true,
      })
    })

    test('then should be rendered correctly', () => {
      expect(wrapper.find('.checkoutOverhaulContainer')).toHaveLength(1)
      expect(wrapper.find('CTA').exists()).toBeTruthy()
    })
  })
})
