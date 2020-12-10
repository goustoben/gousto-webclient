import React from 'react'
import { mount } from 'enzyme'
import { PauseSubscription } from '../PauseSubscription'
import * as trackingSubscription from '../../../../tracking'

jest.mock('react-router')
jest.mock('../../../../tracking')
jest.mock('actions/onScreenRecovery')

const trackSubscriptionSettingsChangeSpy = jest.spyOn(trackingSubscription, 'trackSubscriptionSettingsChange')
const startOnScreenRecoverySubscriptionFlowSpy = jest.fn()
trackSubscriptionSettingsChangeSpy.mockReturnValue(() => { })

describe('PauseSubscription', () => {
  let wrapper
  describe('When click on CTA', () => {
    beforeEach(() => {
      wrapper = mount(<PauseSubscription startOnScreenRecoverySubscriptionFlow={startOnScreenRecoverySubscriptionFlowSpy} />)
      wrapper.find('[data-testing="pause-subscription-cta"]').simulate('click')
    })

    test('Then the pause subscription modal is opened', () => {
      expect(startOnScreenRecoverySubscriptionFlowSpy).toHaveBeenCalled()
    })

    test('Then trackSubscriptionSettingsChangeSpy is called', () => {
      expect(trackSubscriptionSettingsChangeSpy).toHaveBeenCalledWith({
        action: 'cta_clicked', settingName: 'pause_subscription'
      })
    })
  })
})
