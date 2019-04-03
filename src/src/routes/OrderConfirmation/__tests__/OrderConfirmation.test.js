import React from 'react'
import { shallow } from 'enzyme'
import OrderConfirmation from '../OrderConfirmation'

describe('OrderConfirmation', () => {
  const testProps = {
    order: { 
      humanDeliveryDate: "Tuesday 26th March" ,
      whenCutoff: "2019-03-20 11:59:59" ,
      deliverySlot: {
        deliveryStart: "08:00:00", 
        deliveryEnd: "18:59:59"
      }
    }, 
    showHeader: false
  }

  describe('Order Confirmation not rendering header', () => {
    test('should not show Order Confirmation Header', () => {
      const wrapper = shallow(<OrderConfirmation {...testProps} />)
      expect(wrapper.find('OrderConfirmationHeader').length).toBe(0)
    })
  })

  describe('Order Confirmation rendering header', () => {
    const testPropsTrue = Object.assign({}, testProps, {showHeader: true})
    const wrapper = shallow(<OrderConfirmation {...testPropsTrue} />)

    test('should show Order Confirmation Header', () => {
      expect(wrapper.find('OrderConfirmationHeader').length).toBe(1)
    })
  
    test('should send the right props to Order Confirmation Header', () => {
      const headerTestProps = {
        deliveryDate: 'Tuesday 26th March',
        deliveryStart: '8 am',
        deliveryEnd: '7 pm',
        whenCutoffTime: '12 pm',
        whenCutoffDate: 'Wednesday 20th March',
      }
      expect(wrapper.find('OrderConfirmationHeader').prop('deliveryDate')).toBe(headerTestProps.deliveryDate)
      expect(wrapper.find('OrderConfirmationHeader').prop('deliveryStart')).toBe(headerTestProps.deliveryStart)
      expect(wrapper.find('OrderConfirmationHeader').prop('deliveryEnd')).toBe(headerTestProps.deliveryEnd)
      expect(wrapper.find('OrderConfirmationHeader').prop('whenCutoffTime')).toBe(headerTestProps.whenCutoffTime)
      expect(wrapper.find('OrderConfirmationHeader').prop('whenCutoffDate')).toBe(headerTestProps.whenCutoffDate)
    })
  })

  describe('Order Confirmation MarketPlace', () => {
    const wrapper = shallow(<OrderConfirmation {...testProps} />)
    test('should render marketPlace title', () => {
      expect(wrapper.find('.marketPlaceTitle').length).toEqual(1)
    })

    test('should render market place content section', () => {
      expect(wrapper.find('section.marketPlaceContent').length).toEqual(1)
    })

    test('should render product list', () => {
      expect(wrapper.find('.productList').length).toEqual(1)
    })
  })
})
