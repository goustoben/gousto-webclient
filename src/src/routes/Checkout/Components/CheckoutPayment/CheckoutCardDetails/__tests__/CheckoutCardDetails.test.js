import React from 'react'
import { shallow } from 'enzyme'
import { CheckoutCardDetails } from '../CheckoutCardDetails'
import { CheckoutFrame } from '../../CheckoutFrame'
import { CheckoutAddress } from '../../CheckoutAddress'

describe('given CheckoutCardDetails is rendered', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <CheckoutCardDetails
        isSubmitCardEnabled={false}
        cardTokenReady={jest.fn()}
        disableCardSubmission={jest.fn()}
      />
    )
  })

  describe('when prerender is true', () => {
    beforeEach(() => {
      wrapper.setProps({ prerender: true })
    })

    test('should not render Payment Form Sections', () => {
      expect(wrapper.find(CheckoutAddress)).toHaveLength(1)
    })

    test('should render a CheckoutFrame', () => {
      expect(wrapper.find(CheckoutFrame)).toHaveLength(1)
    })
  })

  describe('when prerender is false', () => {
    beforeEach(() => {
      wrapper.setProps({ prerender: false })
    })

    test('should render a CheckoutFrame', () => {
      expect(wrapper.find(CheckoutFrame)).toHaveLength(1)
    })

    test('should render a CheckoutAddress', () => {
      expect(wrapper.find(CheckoutAddress)).toHaveLength(1)
    })
  })

  describe('when hide is true', () => {
    beforeEach(() => {
      wrapper.setProps({ hide: true })
    })

    test('then it should be hidden', () => {
      expect(wrapper.hasClass('hide')).toBeTruthy()
    })
  })

  describe('when hide is false', () => {
    beforeEach(() => {
      wrapper.setProps({ hide: false })
    })

    test('then it should be visible', () => {
      expect(wrapper.hasClass('hide')).toBeFalsy()
    })
  })
})
