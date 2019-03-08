import React from 'react'
import { mount } from 'enzyme'

import { DoubleCreditCountdown } from '../DoubleCreditCountdown.logic'
import {
  getTimeDifference,
  isTimeInPast,
  isTimeZero
} from 'routes/Account/Referral/timeHelper'

import { DoubleCreditCountdownPresentation } from '../DoubleCreditCountdown.presentation'

jest.mock('routes/Account/Referral/timeHelper', () => ({
  getTimeDifference: jest.fn(),
  isTimeInPast: jest.fn(),
  isTimeZero: jest.fn(),
}))

describe('Double Credit Countdown logic', () => {
  const description = 'Test Title'

  describe('Update Time', () => {
    test('should show ten days, hours and minutes when given correct expiry', () => {
      getTimeDifference.mockReturnValue({
        days: 10,
        hours: 10,
        minutes: 10
      })
      isTimeZero.mockReturnValueOnce(false)

      const wrapper = mount(<DoubleCreditCountdown description={description} />)
      wrapper.instance().updateTime()

      expect(wrapper.state().days).toEqual(10)
      expect(wrapper.state().hours).toEqual(10)
      expect(wrapper.state().minutes).toEqual(10)
    })

    test('should show zero days, hours and minutes when given correct expiry', () => {
      getTimeDifference.mockReturnValue({
        days: 0,
        hours: 0,
        minutes: 0
      })
      isTimeZero.mockReturnValueOnce(true)
      const fetchOffer = jest.fn()

      const wrapper = mount(<DoubleCreditCountdown description={description} fetchOffer={fetchOffer} />)
      wrapper.instance().updateTime()

      expect(wrapper.state().days).toEqual(0)
      expect(wrapper.state().hours).toEqual(0)
      expect(wrapper.state().minutes).toEqual(0)
      expect(fetchOffer).toHaveBeenCalled()
    })
  })

  describe('componentDidMount', () => {
    test('should call update time every minute', () => {
      const setInterval = jest.fn()
      global.setInterval = setInterval

      const wrapper = mount(<DoubleCreditCountdown description={description} />)

      expect(setInterval).toHaveBeenCalledWith(wrapper.instance().updateTime, 60000)
    })
  })

  describe('render', () => {
    test('should not show Double Credit Countdown when the offer has expired', () => {
      isTimeInPast.mockReturnValue(true)

      const wrapper = mount(<DoubleCreditCountdown description={description} />)

      expect(wrapper.find(DoubleCreditCountdownPresentation).length).toBe(0)
    })

    test('should show Double Credit Countdown Presentation component when offer has not expired', () => {
      getTimeDifference.mockReturnValue({
        days: 0,
        hours: 0,
        minutes: 1,
      })
      isTimeInPast.mockReturnValue(false)

      const wrapper = mount(<DoubleCreditCountdown description={description} />)
      const doubleCreditCountdownPresentation = wrapper.find(DoubleCreditCountdownPresentation)

      expect(doubleCreditCountdownPresentation.length).toBe(1)
      expect(doubleCreditCountdownPresentation.props().title).toBe('Test Title')
      expect(doubleCreditCountdownPresentation.props().days).toBe(0)
      expect(doubleCreditCountdownPresentation.props().hours).toBe(0)
      expect(doubleCreditCountdownPresentation.props().minutes).toBe(1)
    })
  })
})
