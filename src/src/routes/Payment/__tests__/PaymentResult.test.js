import React from 'react'
import { shallow } from 'enzyme'

import { PaymentResult } from '../PaymentResult'
import css from '../PaymentResult/PaymentResult.module.css'

describe('PaymentResult', () => {
  let wrapper

  describe('when rendered with success header', () => {
    const header = 'Verification successful'

    beforeEach(() => {
      wrapper = shallow(<PaymentResult header={header} success />)
    })

    test('should render header', () => {
      expect(wrapper.find('h3').exists()).toBe(true)
    })

    test('should have correct class', () => {
      expect(wrapper.find('h3').hasClass(css.successHeader)).toBe(true)
    })

    test('should have correct text', () => {
      expect(wrapper.find('h3').text()).toBe(header)
    })
  })

  describe('when rendered with failure header', () => {
    const header = 'Verification failed'

    beforeEach(() => {
      wrapper = shallow(<PaymentResult header={header} success={false} />)
    })

    test('should render header', () => {
      expect(wrapper.find('h3').exists()).toBe(true)
    })

    test('should have correct class', () => {
      expect(wrapper.find('h3').hasClass(css.failureHeader)).toBe(true)
    })

    test('should have correct text', () => {
      expect(wrapper.find('h3').text()).toBe(header)
    })
  })

  describe('when rendered with children ', () => {
    const message =
      'You will now be automatically redirected back to Gousto with no further action required.'

    beforeEach(() => {
      wrapper = shallow(<PaymentResult>{message}</PaymentResult>)
    })

    test('should render container with correct class', () => {
      expect(wrapper.find(`div.${css.content}`).exists()).toBe(true)
    })

    test('should have correct text', () => {
      expect(wrapper.find(`div.${css.content}`).text()).toBe(message)
    })
  })
})
