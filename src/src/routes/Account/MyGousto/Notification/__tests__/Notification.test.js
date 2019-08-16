import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import moment from 'moment'
import { Notification } from '..'
import { config } from '../config'

config.referAFriend.startDate = '2019-01-01'
config.referAFriend.endDate = '2019-01-01'

describe('Notification component', () => {
  let wrapper
  let card
  let orders

  describe('checkCardExpiryDate', () => {

    beforeEach(() => {
      orders = Immutable.Map({})
    })

    it('should show "Expired" banner if card expiry date is in current month or earlier', () => {
      const currentMonth = moment().format('YYYY-MM')
      card = Immutable.Map({
        lastFourDigits: "1234",
        expiryDate: currentMonth,
      })

      wrapper = shallow(<Notification card={card} orders={orders} />)
      expect(wrapper.state('bannersToShow')).toEqual(['expired'])
    })

    it('should show "Expiring" banner if card expiry date is within one month of now', () => {
      const nextMonth = moment().add(1, 'M').format('YYYY-MM')

      card = Immutable.Map({
        lastFourDigits: "1234",
        expiryDate: nextMonth,
      })

      wrapper = shallow(<Notification card={card} orders={orders} />)

      expect(wrapper.state('bannersToShow')).toEqual(['toExpire'])
    })

    it('should not show any banners if no cards are expired or expiring', () => {
      const nextMonth = moment().add(2, 'M').format('YYYY-MM')

      card = Immutable.Map({
        lastFourDigits: "1234",
        expiryDate: nextMonth,
      })

      wrapper = shallow(<Notification card={card} orders={orders} />)

      expect(wrapper.state('bannersToShow')).toEqual([])
    })

    it('should not show any banners if there are no card details', () => {

      card = Immutable.Map({})

      wrapper = shallow(<Notification card={card} orders={orders} />)

      expect(wrapper.state('bannersToShow')).toEqual([])
    })
  })

  describe('checkAmendedDeliveryDate', () => {

    beforeEach(() => {
      card = Immutable.Map({})
    })

    it('should show "Amend Delivery" banner if delivery date has been amended', () => {
      orders = Immutable.Map({
        1234: {
          state: 'pending',
          original_delivery_day: true,
        }
      })

      wrapper = shallow(<Notification card={card} orders={orders} />)

      expect(wrapper.state('bannersToShow')).toEqual(['amendDelivery'])

    })
  })

  describe('checkOrderAwaitingSelection', () => {

    beforeEach(() => {
      card = Immutable.Map({})
    })

    it('should show "Select order" banner if delivery date has been amended', () => {
      orders = Immutable.Map({
        1234: {
          state: 'pending',
          default: '1',
        },
        5678: {
          state: 'pending',
          default: '1',
        },
      })

      wrapper = shallow(<Notification card={card} orders={orders} />)

      expect(wrapper.state('bannersToShow')).toEqual(['selectOrder'])

    })
  })

  describe('checkRafOffer', () => {

    beforeEach(() => {
      card = Immutable.Map({})
      orders = Immutable.Map({})

      config.referAFriend.startDate = '2019-01-01'
      config.referAFriend.endDate = '3019-01-01'
    })

    afterEach(() => {
      config.referAFriend.startDate = '2019-01-01'
      config.referAFriend.endDate = '2019-01-01'
    })

    it('should show "Refer a friend" banner if delivery date has been amended', () => {

      config.referAFriend.startDate = '2019-01-01'
      config.referAFriend.endDate = '3019-01-01'

      wrapper = shallow(<Notification card={card} orders={orders} />)

      expect(wrapper.state('bannersToShow')).toEqual(['referAFriend'])

    })
  })

  describe('sortBanners', () => {

    beforeEach(() => {
      const currentMonth = moment().format('YYYY-MM')
      card = Immutable.Map({
        lastFourDigits: "1234",
        expiryDate: currentMonth,
      })
      orders = Immutable.Map({
        1234: {
          state: 'pending',
          original_delivery_day: true,
        }
      })
    })

    it('should order the banners by type in the following order danger > warning > notify', () => {

      wrapper = shallow(<Notification card={card} orders={orders} />)

      expect(wrapper.state('bannersToShow')).toEqual(['expired', 'amendDelivery'])

    })
  })
})
