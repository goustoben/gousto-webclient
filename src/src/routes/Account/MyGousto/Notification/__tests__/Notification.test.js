import React from 'react'
import moment from 'moment'
import { shallow, mount } from 'enzyme'
import Immutable from 'immutable'

import { config } from '../config'
import {
  checkCardExpiryDate,
  checkAmendedDeliveryDate,
  checkOrderAwaitingSelection,
  checkRafOffer,
} from '../helpers'

import { NotificationLogic as Notification } from '../Notification.logic'

config.referAFriend.startDate = '2019-01-01'
config.referAFriend.endDate = '2019-01-01'

describe('Notification component', () => {
  let wrapper
  let card
  let orders
  let now

  describe('checkCardExpiryDate', () => {

    beforeEach(() => {
      now = moment('2019-08-15')
    })

    it('should return "Expired" if card expiry date is in current month or earlier', () => {
      card = Immutable.Map({
        lastFourDigits: "1234",
        expiryDate: '2019-08',
      })

      const result = checkCardExpiryDate(card, now)
      expect(result).toEqual('expired')
    })

    it('should return "Expiring" if card expiry date is within one month of now', () => {
      card = Immutable.Map({
        lastFourDigits: "1234",
        expiryDate: '2019-09',
      })

      const result = checkCardExpiryDate(card, now)
      expect(result).toEqual('toExpire')
    })

    it('should return undefined if no cards are expired or expiring', () => {
      card = Immutable.Map({
        lastFourDigits: "1234",
        expiryDate: '2019-11',
      })

      const result = checkCardExpiryDate(card, now)
      expect(result).toEqual(undefined)
    })

    it('should return undefined if there are no card details', () => {

      card = Immutable.Map({})

      const result = checkCardExpiryDate(card, now)
      expect(result).toEqual(undefined)
    })
  })

  describe('checkAmendedDeliveryDate', () => {

    it('should return "Amend Delivery" if delivery date has been amended', () => {
      orders = Immutable.fromJS({
        1234: {
          state: 'pending',
          originalDeliveryDay: true,
        }
      })

      const result = checkAmendedDeliveryDate(orders)
      expect(result).toEqual('amendDelivery')

    })

    it('should return undefined if no delivery dates have been amended', () => {
      orders = Immutable.fromJS({
        1234: {
          state: 'pending',
          originalDeliveryDay: false,
        }
      })

      const result = checkAmendedDeliveryDate(orders)
      expect(result).toEqual(undefined)

    })

    it('should return undefined if no orders', () => {
      orders = Immutable.Map({})

      const result = checkAmendedDeliveryDate(orders)
      expect(result).toEqual(undefined)

    })
  })

  describe('checkOrderAwaitingSelection', () => {

    beforeEach(() => {
      now = moment('2019-08-15')
    })

    it('should return "Select order" if upcoming order has not been selected', () => {
      orders = Immutable.fromJS({
        1234: {
          state: 'pending',
          default: '1',
          whenCutoff: moment('2019-08-15 11:59:59')
        }
      })

      const result = checkOrderAwaitingSelection(orders, now)
      expect(result).toEqual('selectOrder')

    })

    it('should return undefined if no upcoming orders are unselected', () => {
      orders = Immutable.fromJS({
        1234: {
          state: 'pending',
          default: '1',
          whenCutoff: moment('2019-08-23 11:59:59')
        }
      })

      const result = checkOrderAwaitingSelection(orders, now)
      expect(result).toEqual(undefined)
    })

    it('should return undefined if there are no orders', () => {
      orders = Immutable.Map({})

      const result = checkOrderAwaitingSelection(orders, now)
      expect(result).toEqual(undefined)
    })
  })

  describe('checkRafOffer', () => {

    beforeEach(() => {
      now = moment('2019-08-15')

      config.referAFriend.startDate = '2019-01-01'
      config.referAFriend.endDate = '3019-01-01'
    })

    afterEach(() => {
      config.referAFriend.startDate = '2019-01-01'
      config.referAFriend.endDate = '2019-01-01'
    })

    it('should show "Refer a friend" notification if current date is between start and end date', () => {

      const result = checkRafOffer(now)
      expect(result).toEqual('referAFriend')
    })

    it('should return undefined if if current date is not between start and end date', () => {
      config.referAFriend.endDate = '2019-01-01'

      const result = checkRafOffer(now)
      expect(result).toEqual(undefined)
    })
  })

  describe('notifications', () => {

    beforeEach(() => {
      const currentMonth = moment().format('YYYY-MM')
      config.referAFriend.startDate = '2019-01-01'
      config.referAFriend.endDate = '3019-01-01'
      card = Immutable.Map({
        lastFourDigits: "1234",
        expiryDate: currentMonth,
      })
      orders = Immutable.fromJS({
        1234: {
          state: 'committed',
          originalDeliveryDay: true,
        }
      })
    })

    it('should order the notifications by type in the following order danger > warning > notify', () => {

      wrapper = shallow(<Notification card={card} orders={orders} />)

      expect(wrapper.instance().getNotifications()).toMatchSnapshot()
    })

    it('should call tracking action on click if notification has linkTrackingType', () => {
      const mockTrackNotificationLinkClick = jest.fn()
      window.location.assign = jest.fn()
      wrapper = mount(<Notification card={card} orders={orders} trackNotificationLinkClick={mockTrackNotificationLinkClick}/>)

      wrapper.find(`[href="my-referrals"]`).simulate('click')
      expect(mockTrackNotificationLinkClick).toHaveBeenCalledWith(config.referAFriend.linkTrackingType)
      expect(window.location.assign).toHaveBeenCalledWith(config.referAFriend.url)
    })

  })
})
