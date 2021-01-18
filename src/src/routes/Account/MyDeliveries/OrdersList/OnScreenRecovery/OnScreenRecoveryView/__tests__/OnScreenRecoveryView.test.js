import React from 'react'
import { shallow, mount } from 'enzyme'

import { SubscriberPricingInfoPanel } from '../../../../../AccountComponents/SubscriberPricingInfoPanel'
import { OnScreenRecoveryView } from '../OnScreenRecoveryView'

jest.mock('components/Overlay', () => 'Overlay')

describe('Order Skip Recovery Modal', () => {
  let wrapper
  let mountWrapper

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('Alternative Render', () => {
    const getRecoveryContent = jest.fn()
    const mockTrackViewDiscountReminder = jest.fn()

    beforeEach(() => {
      wrapper = shallow(
        <OnScreenRecoveryView
          triggered={false}
          getRecoveryContent={getRecoveryContent}
          onConfirm={() => { }}
          onKeep={() => { }}
          onClick={() => { }}
          modalVisibilityChange={() => { }}
          trackViewDiscountReminder={mockTrackViewDiscountReminder}
        />
      )
    })

    test('getRecoveryContent is not called on first render', () => {
      expect(getRecoveryContent).not.toHaveBeenCalled()
    })

    test('trackViewDiscountRmeinder is called', () => {
      expect(mockTrackViewDiscountReminder).toHaveBeenCalled()
    })

    test('then background header is rendered', () => {
      expect(wrapper.find('.backgroundHeader').length).toEqual(1)
    })

    test('then title is rendered', () => {
      expect(wrapper.find('.header').length).toEqual(1)
    })

    test('then SubscriberPricingInfoPanel is not rendered', () => {
      expect(wrapper.find(SubscriberPricingInfoPanel).length).toEqual(0)
    })

    describe('when triggered is set from false to true', () => {
      beforeEach(() => {
        wrapper.setProps({
          triggered: true,
        })

        wrapper.update()
      })

      test('should call getRecoveryContent', () => {
        expect(getRecoveryContent).toHaveBeenCalled()
      })

      describe('and modal X is clicked', () => {
        const mockModalVisibilityChange = jest.fn()

        beforeEach(() => {
          mountWrapper = mount(<OnScreenRecoveryView
            triggered={false}
            getRecoveryContent={getRecoveryContent}
            onConfirm={() => { }}
            onKeep={() => { }}
            onClick={() => { }}
            modalVisibilityChange={mockModalVisibilityChange}
            trackViewDiscountReminder={() => { }}
          />)

          mountWrapper.setProps({
            triggered: true,
          })

          mountWrapper.update()

          mountWrapper
            .find('[data-testing="modal-close-button"]')
            .simulate('click')
        })

        test('then modalVisibilityChange is invoked as expected', () => {
          expect(mockModalVisibilityChange).toHaveBeenCalledWith({ modalVisibility: false, modalType: 'subscription' })
        })
      })
    })

    describe('when triggered is set from true to false', () => {
      beforeEach(() => {
        wrapper = shallow(
          <OnScreenRecoveryView
            triggered
            getRecoveryContent={getRecoveryContent}
            onConfirm={() => { }}
            onKeep={() => { }}
            onClick={() => { }}
            modalVisibilityChange={() => { }}
            trackViewDiscountReminder={() => { }}
            isSubscriberPricingEnabled={false}
          />
        )

        wrapper.setProps({
          triggered: false,
        })

        wrapper.update()
      })

      test('should NOT call getRecoveryContent', () => {
        expect(getRecoveryContent).not.toHaveBeenCalled()
      })
    })

    describe('when triggered is set from false to true and isSubscriberPricingEnabled is true', () => {
      beforeEach(() => {
        wrapper.setProps({
          triggered: true,
          isSubscriberPricingEnabled: true,
        })

        wrapper.update()
      })

      test('then background header is not rendered', () => {
        expect(wrapper.find('.backgroundHeader').length).toEqual(0)
      })

      test('then title is not rendered', () => {
        expect(wrapper.find('.header').length).toEqual(0)
      })

      test('then SubscriberPricingInfoPanel is rendered', () => {
        expect(wrapper.find(SubscriberPricingInfoPanel).length).toEqual(1)
      })
    })
  })
})
