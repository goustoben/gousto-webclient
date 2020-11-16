import React from 'react'
import { shallow } from 'enzyme'
import { DiscountBar } from '../DiscountBar'

describe('DiscountBar', () => {
  let wrapper
  const props = {
    isHidden: false,
    isSticky: false,
    applyDiscount: jest.fn()
  }

  beforeEach(() => {
    wrapper = shallow(<DiscountBar {...props} />)
  })

  test('should render DiscountBar', () => {
    expect(wrapper.find('DiscountBar')).toBeDefined()
  })

  describe('when isSticky prop is false', () => {
    test('then DiscountBar should not have stickyBar class', () => {
      expect(wrapper.find('.discountContainer').hasClass('stickyBar')).toBeFalsy()
    })
  })

  describe('when isSticky prop is true', () => {
    beforeEach(() => {
      wrapper.setProps({ isSticky: true })
    })

    test('then DiscountBar should have stickyBar class', () => {
      expect(wrapper.find('.discountContainer').hasClass('stickyBar')).toBeTruthy()
    })
  })

  describe('when user clicks on DiscountBar', () => {
    beforeEach(() => {
      wrapper.find('.discountContainer').simulate('click')
    })

    test('then applyDiscount should be called', () => {
      expect(props.applyDiscount).toHaveBeenCalled()
    })
  })

  describe('when isHidden prop is true', () => {
    beforeEach(() => {
      wrapper.setProps({ isHidden: true })
    })

    test('then DiscountBar should have hideBar class', () => {
      expect(wrapper.find('.discountContainer').hasClass('hideBar')).toBeTruthy()
    })
  })
})
