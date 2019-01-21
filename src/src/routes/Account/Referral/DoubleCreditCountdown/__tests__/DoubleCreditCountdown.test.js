import React from 'react'
import { mount } from 'enzyme'
import moment from 'moment'
import { DoubleCreditCountdown } from '../DoubleCreditCountdown.logic' 
import { DoubleCreditCountdownPresentation } from '../DoubleCreditCountdown.presentation'

describe('Double Credit Countdown logic', () => {
 
  const description = 'Test Title'
  const expiry = '2019-03-17T11:24:00Z'
  jest.useFakeTimers()
  
  describe('Update Time', () => {
    
    test('should show ten days, hours and minutes when given correct expiry', () => {
      const tenDaysExpiry = moment().add(10, 'days').add(10, 'hours').add(10, 'minutes')
      const wrapper = mount(<DoubleCreditCountdown description={description} expiry={tenDaysExpiry} />)

      wrapper.instance().updateTime()
      expect(wrapper.state().days).toEqual(10)
      expect(wrapper.state().hours).toEqual(10)
      expect(wrapper.state().minutes).toEqual(10)
    })

    test('should show fourty days, hours and minutes when given correct expiry', () => {
      const fourtyDaysExpiry = moment().add(40, 'days').add(10, 'hours').add(10, 'minutes')
      const wrapper = mount(<DoubleCreditCountdown description={description} expiry={fourtyDaysExpiry} />)

      wrapper.instance().updateTime()
      expect(wrapper.state().days).toEqual(40)
      expect(wrapper.state().hours).toEqual(10)
      expect(wrapper.state().minutes).toEqual(10)
    })
    
    test('should show zero days, hours and minutes when given correct expiry', () => {
      const todayExpiry = moment()
      const fetchReferralOffer = jest.fn()
      const wrapper = mount(<DoubleCreditCountdown description={description} expiry={todayExpiry} fetchOffer={fetchReferralOffer} />)

      wrapper.instance().updateTime()
      expect(wrapper.state().days).toEqual(0)
      expect(wrapper.state().hours).toEqual(0)
      expect(wrapper.state().minutes).toEqual(0)
    })
  })
  
  describe('Set Interval', () => {
    
    test('should call update time every minute', () => {
      const wrapper = mount(<DoubleCreditCountdown description={description} expiry={expiry} />)
      expect(setInterval).toHaveBeenCalledWith(wrapper.instance().updateTime, 60000)
    })
  })
  
  describe('Render Function', () => {
    
    test('should not show Double Credit Countdown when the offer has expired', () => { 
      const pastExpiry = moment().add(-1, 'minutes')
      const wrapper = mount(<DoubleCreditCountdown description={description} expiry={pastExpiry} />)
      
      expect(wrapper.find(DoubleCreditCountdownPresentation).length).toBe(0)
    })
  
    test('should show Double Credit Countdown Presentation component when more than 1 minutes when given correct expiry', () => {
      const oneMinuteExpiry = moment().add(1, 'minutes')
      const wrapper = mount(<DoubleCreditCountdown description={description} expiry={oneMinuteExpiry} />)
  
      expect(wrapper.find(DoubleCreditCountdownPresentation).length).toBe(1)
    })

    test('should pass `description` to  Double Credit Countdown Presentation component when more than 1 minutes when given correct expiry', () => {
      const oneMinuteExpiry = moment().add(1, 'minutes')
      const wrapper = mount(<DoubleCreditCountdown description={'test props'} expiry={oneMinuteExpiry} />)
      
      const doubleCreditCountdownPresentation = wrapper.find(DoubleCreditCountdownPresentation)
      expect(doubleCreditCountdownPresentation.props().title).toBe('test props')
      expect(doubleCreditCountdownPresentation.props().days).toBe(0)
      expect(doubleCreditCountdownPresentation.props().hours).toBe(0)
      expect(doubleCreditCountdownPresentation.props().minutes).toBe(1)
    })
  })
})