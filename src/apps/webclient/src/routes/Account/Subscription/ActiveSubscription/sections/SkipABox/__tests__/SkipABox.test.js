import React from 'react'
import { browserHistory } from 'react-router'
import { mount } from 'enzyme'
import { SkipABox } from '../SkipABox'
import * as trackingSubscription from '../../../../tracking'

jest.mock('react-router')
jest.mock('../../../../tracking')
const trackSubscriptionSettingsChangeSpy = jest.spyOn(trackingSubscription, 'trackSubscriptionSettingsChange')

describe('SkipABox', () => {
  let wrapper
  describe('When click on CTA', () => {
    const historyPushSpy = jest.spyOn(browserHistory, 'push')
    beforeEach(() => {
      trackSubscriptionSettingsChangeSpy.mockReturnValue(() => { })
      wrapper = mount(<SkipABox />)
      wrapper.find('[data-testing="skip-a-box-cta"]').simulate('click')
    })

    test('Then browserHistory push is called with /my-deliveries', () => {
      expect(historyPushSpy).toHaveBeenCalledWith('/my-deliveries')
    })

    test('Then trackSubscriptionSettingsChangeSpy is called', () => {
      expect(trackSubscriptionSettingsChangeSpy).toHaveBeenCalledWith({
        action: 'cta_clicked', settingName: 'skip_a_box'
      })
    })
  })
})
