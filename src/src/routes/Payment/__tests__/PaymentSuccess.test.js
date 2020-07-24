import React from 'react'
import { shallow } from 'enzyme'

import { PaymentSuccess } from '../PaymentSuccess'
import { PaymentResult } from '../PaymentResult'

describe('PaymentSuccess', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<PaymentSuccess />)
  })

  describe('when rendered', () => {
    test('should render result', () => {
      expect(wrapper.find(PaymentResult).exists()).toBe(true)
    })

    test('should have correct header', () => {
      const expected = 'Verification successful'

      expect(wrapper.find(PaymentResult).prop('header')).toBe(expected)
    })

    test('should have success header', () => {
      expect(wrapper.find(PaymentResult).prop('success')).toBe(true)
    })

    test('should render correct message', () => {
      const expected = 'You will now be automatically redirected back to Gousto with no further action required.'

      expect(wrapper.find(PaymentResult).find('p').text()).toBe(expected)
    })
  })
})
