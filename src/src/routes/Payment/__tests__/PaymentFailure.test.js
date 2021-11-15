import React from 'react'
import { shallow } from 'enzyme'

import { PaymentFailure } from '../PaymentFailure/PaymentFailure'
import { PaymentResult } from '../PaymentResult'

describe('PaymentFailure', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<PaymentFailure />)
  })

  describe('when rendered', () => {
    test('should render result', () => {
      expect(wrapper.find(PaymentResult).exists()).toBe(true)
    })

    test('should have correct header', () => {
      const expected = 'Verification failed'

      expect(wrapper.find(PaymentResult).prop('header')).toBe(expected)
    })

    test('should have failure header', () => {
      expect(wrapper.find(PaymentResult).prop('success')).toBe(false)
    })

    test('should render correct message', () => {
      const expected =
        'You will now be automatically redirected back to Gousto with further details.'

      expect(wrapper.find(PaymentResult).find('p').text()).toBe(expected)
    })
  })
})
