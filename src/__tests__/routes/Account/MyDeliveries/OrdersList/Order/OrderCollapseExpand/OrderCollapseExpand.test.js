import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'
import OrderCollapseExpand from 'routes/Account/MyDeliveries/OrdersList/Order/OrderCollapseExpand'
import css from 'routes/Account/MyDeliveries/OrdersList/Order/OrderCollapseExpand/OrderCollapseExpand.css'

describe('OrderCollapseExpand', () => {
  describe('rendering', () => {
    const classNameArrowDown = `.${css.arrowDown.split(' ').join('.')}`
    const classNameArrowUp = `.${css.arrowUp.split(' ').join('.')}`

    test('should render a <div> with no props', () => {
      const wrapper = shallow(<OrderCollapseExpand />)
      expect(wrapper.type()).toBe('div')
    })

    test('should render an arrowDown <i> when no collapsed prop passed (default true)', () => {
      const wrapper = shallow(<OrderCollapseExpand />)
      expect(wrapper.find(classNameArrowDown)).toHaveLength(1)
      expect(wrapper.find(classNameArrowUp)).toHaveLength(0)
    })

    test('should render an arrowDown <i> when collapsed=true prop is passed', () => {
      const wrapper = shallow(<OrderCollapseExpand collapsed />)
      expect(wrapper.find(classNameArrowDown)).toHaveLength(1)
      expect(wrapper.find(classNameArrowUp)).toHaveLength(0)
    })

    test('should render an arrowUp <i> when collapsed=false prop is passed', () => {
      const wrapper = shallow(<OrderCollapseExpand collapsed={false} />)
      expect(wrapper.find(classNameArrowDown)).toHaveLength(0)
      expect(wrapper.find(classNameArrowUp)).toHaveLength(1)
    })
  })
})
