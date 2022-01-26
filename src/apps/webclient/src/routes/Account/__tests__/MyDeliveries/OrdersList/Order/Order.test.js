import React from 'react'
import { shallow } from 'enzyme'
import Order from 'routes/Account/MyDeliveries/OrdersList/Order/Order'

describe('Order', () => {
  let orderProps
  let wrapper

  describe('Given a scheduled order', () => {
    beforeEach(() => {
      orderProps = {
        userOpenCloseOrderCard: () => { },
        userToggleEditDateSection: () => { },
        orderState: 'scheduled'
      }
    })

    describe('When phase is set to open', () => {
      beforeEach(() => {
        wrapper = shallow(<Order phase="open" {...orderProps} />)
      })

      test('then the order should be expandable', () => {
        expect(wrapper.find('OrderCollapseExpand').exists()).toBeTruthy()
        expect(wrapper.find('OrderPricing').exists()).toBeTruthy()
      })

      test('and the order container should have a link class', () => {
        expect(wrapper.find('.orderRow').hasClass('link')).toBeTruthy()
      })
    })

    describe('When phase is set to pre_menu', () => {
      beforeEach(() => {
        wrapper = shallow(<Order phase="pre_menu" {...orderProps} />)
      })

      test('then the order should be NOT expandable', () => {
        expect(wrapper.find('OrderCollapseExpand').exists()).toBeFalsy()
        expect(wrapper.find('OrderPricing').exists()).toBeFalsy()
      })

      test('and the order container should NOT have a link class', () => {
        expect(wrapper.find('.orderRow').hasClass('link')).toBeFalsy()
      })
    })
  })

  describe('Given a projected order', () => {
    beforeEach(() => {
      orderProps = {
        userOpenCloseOrderCard: () => { },
        userToggleEditDateSection: () => { },
        isProjected: true
      }
      wrapper = shallow(<Order {...orderProps} />)
    })

    test('then the order slot should not be displayed', () => {
      expect(wrapper.find('OrderTime').exists()).toBeFalsy()
    })
  })
})
