import sinon from 'sinon'
import React from 'react'
import { shallow } from 'enzyme'
import config from 'config/menu'

import { SubHeader } from './SubHeader'
import InfoToggle from './InfoToggle'

describe('SubHeader', () => {
  describe('rendering', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<SubHeader />)
    })

    test('should return a div', () => {
      expect(wrapper.type()).toBe('div')
    })

    test('should 2 InfoToggles', () => {
      expect(wrapper.find(InfoToggle)).toHaveLength(2)
    })

    test('should render a date range for this week\'s menu', () => {
      expect(wrapper.find('Connect(MenuDateRange)')).toHaveLength(1)
      expect(wrapper.find('Connect(MenuDateRange)').prop('variant')).toBe('desktop')
    })
  })

  describe('notificationBanner', () => {
    let sandbox
    let clock
    let notifications

    beforeEach(() => {
      sandbox = sinon.sandbox.create()
      notifications = [
        {
          isAfter: '2017-05-15',
          isBefore: '2017-05-29',
          title: 'Delivery changes for 29th May Bank Holiday',
          line1: 'Our delivery schedule is changing over the Bank Holiday.',
          line2: [
            "If you're expecting a box on Monday 29th May, your delivery will move to Tuesday 30th May.",
          ],
          notifyGuests: false,
        },
      ]
    })

    afterEach(() => {
      clock.restore()
      sandbox.restore()
    })

    test('should return 2 delivery infotoggles for non loggedin users when notifyGuests is false', () => {
      clock = sinon.useFakeTimers(new Date(2017, 4, 21).getTime())
      sandbox.stub(config, 'notification', notifications)
      const wrapper = shallow(<SubHeader />)
      expect(wrapper.find(InfoToggle).length).toBe(2)
    })

    test('should return 2 delivery infotoggles for authenticated user even when notifyGuests is false', () => {
      clock = sinon.useFakeTimers(new Date(2017, 3, 25).getTime())
      sandbox.stub(config, 'notification', notifications)
      const wrapper = shallow(<SubHeader isAuthenticated />)
      expect(wrapper.find(InfoToggle).length).toBe(2)
    })

    test('should return 2 delivery and 2 notifcation infotoggles for authenticated user even when notifyGuests is false', () => {
      clock = sinon.useFakeTimers(new Date(2017, 4, 25).getTime())
      sandbox.stub(config, 'notification', notifications)
      const wrapper = shallow(<SubHeader isAuthenticated />)
      expect(wrapper.find(InfoToggle).length).toBe(4)
    })

    test('should return 2 delivery and 2 notifcation infotoggles when notifyGuests is true even for non logged in user', () => {
      clock = sinon.useFakeTimers(new Date(2017, 5, 20).getTime())
      notifications.push({
        isAfter: '2017-06-15',
        isBefore: '2017-06-29',
        title: 'Delivery changes for 29th May Bank Holiday',
        line1: 'Our delivery schedule is changing over the Bank Holiday.',
        line2: [
          "If you're expecting a box on Monday 29th May, your delivery will move to Tuesday 30th May.",
        ],
        notifyGuests: true,
      })
      sandbox.stub(config, 'notification', notifications)
      const wrapper = shallow(<SubHeader />)
      expect(wrapper.find(InfoToggle).length).toBe(4)
    })
  })
})
