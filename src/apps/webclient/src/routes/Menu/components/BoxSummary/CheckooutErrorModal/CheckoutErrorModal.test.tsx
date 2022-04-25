import { Modal } from 'goustouicomponents'
import { shallow } from 'enzyme'
import React from 'react'
import { client } from 'config/routes'
import { CheckoutErrorModal } from './CheckoutErrorModal'

describe('CheckoutErrorModal', () => {
  test('should show modal if shouldShow is true', () => {
    const wrapper = shallow(<CheckoutErrorModal shouldShow />)

    expect(wrapper.find(Modal).prop('isOpen')).toEqual(true)
  })

  test('CTA should have link to My Deliveries', () => {
    const wrapper = shallow(<CheckoutErrorModal shouldShow />)

    expect(wrapper.find('GoustoLink').prop('to')).toBe(client.myDeliveries)
  })
})
