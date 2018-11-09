import sinon from 'sinon'

import React from 'react'
import { shallow, mount } from 'enzyme'
import RCTooltip from 'rc-tooltip'
import CheckoutTooltip from 'routes/Checkout/Components/CheckoutTooltip/CheckoutTooltip'

describe('CheckoutTooltip', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<CheckoutTooltip />)
  })

  describe('rendering', () => {
    test('should return div', () => {
      expect(wrapper.type()).toBe('div')
    })

    test('should render 1 <RCTooltip> component', () => {
      expect(wrapper.find(RCTooltip)).toHaveLength(1)
    })

    test('should render 1 "span"', () => {
      expect(wrapper.find('span')).toHaveLength(1)
    })

    test('should have tooltipText prop equal to "sample tooltip text"', () => {
      const text = 'sample tooltip text'
      wrapper = mount(<CheckoutTooltip tooltipText={text} />)
      expect(wrapper.props().tooltipText).toBe(text)
    })

    test('should have placement prop equal to "left"', () => {
      wrapper = mount(<CheckoutTooltip placement="left" />)
      expect(wrapper.props().placement).toBe('left')
    })

    test('should have trigger prop equal to "["hover"]"', () => {
      wrapper = mount(<CheckoutTooltip trigger="['hover']" />)
      expect(wrapper.props().trigger).toBe("['hover']")
    })
  })
})
