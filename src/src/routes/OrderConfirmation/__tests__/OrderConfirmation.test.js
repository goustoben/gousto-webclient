import React from 'react'
import { shallow } from 'enzyme'
import OrderConfirmation from '../OrderConfirmation'

describe('OrderConfirmation', () => {
  const testProps = {
    headerDetails: {
      deliveryDate: 'Tuesday 26th March',
      deliveryStart: '8 am',
      deliveryEnd: '7 pm',
      whenCutoffTime: '12 pm',
      whenCutoffDate: 'Wednesday 20th March',
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
      expect(wrapper.find('ProductList').length).toEqual(1)
    })
  })

  describe('Age verification', () => {

    describe('rendering popup', () => {
      test('should render the age verification pop up in an OPEN overlay when "showAgeVerification" is true', () => {
        const wrapper = shallow(<OrderConfirmation/>)
        wrapper.setState({'showAgeVerification': true})

        expect(wrapper.find('Overlay').prop('open')).toEqual(true)
        expect(wrapper.find('AgeVerificationPopUp').length).toEqual(1)
      })
      test('should render the age verification pop up in a CLOSED overlay when "showAgeVerification" is false', () => {
        const wrapper = shallow(<OrderConfirmation/>)

        expect(wrapper.find('Overlay').prop('open')).toEqual(false)
        expect(wrapper.find('AgeVerificationPopUp').length).toEqual(1)
      })
    })

    describe('on age confirmation', () => {

      test('should set "hasConfirmedAge" state to true', () => {
        const userVerifyAgeSpy = jest.fn()
        const isUser18 = false
        const wrapper = shallow(<OrderConfirmation userVerifyAge={userVerifyAgeSpy} />)

        expect(wrapper.state('hasConfirmedAge')).toEqual(false)
        wrapper.instance().onAgeConfirmation(isUser18)
        expect(wrapper.state('hasConfirmedAge')).toEqual(true)
      })

      test('should call "userVerifyAge" with correct parameter', () => {
        const userVerifyAgeSpy = jest.fn()
        const isUser18 = true
        const wrapper = shallow(<OrderConfirmation userVerifyAge={userVerifyAgeSpy} />)
        wrapper.instance().onAgeConfirmation(isUser18)

        expect(userVerifyAgeSpy).toHaveBeenCalledWith(isUser18, true)
      })
    })
  })
})
