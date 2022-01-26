import React from 'react'
import { browserHistory } from 'react-router'
import { mount } from 'enzyme'
import { OrderABox } from '../OrderABox'
import * as trackingSubscription from '../../../../tracking'

jest.mock('react-router')
jest.mock('../../../../tracking')
const trackSubscriptionSettingsChangeSpy = jest.spyOn(trackingSubscription, 'trackSubscriptionSettingsChange')

describe('OrderABox', () => {
  let wrapper
  describe('When click on CTA', () => {
    const historyPushSpy = jest.spyOn(browserHistory, 'push')
    beforeEach(() => {
      trackSubscriptionSettingsChangeSpy.mockReturnValue(() => { })
      wrapper = mount(<OrderABox />)
      wrapper.find('[data-testing="order-a-box-cta"]').simulate('click')
    })

    test('Then browserHistory push is called with /menu', () => {
      expect(historyPushSpy).toHaveBeenCalledWith('/menu')
    })

    test('Then trackSubscriptionSettingsChangeSpy is called', () => {
      expect(trackSubscriptionSettingsChangeSpy).toHaveBeenCalledWith({
        action: 'cta_clicked', settingName: 'order_a_box'
      })
    })
  })
})
