import React from 'react'
import { mount } from 'enzyme'
import { browserHistory } from 'react-router'

import { SubscriberPricingBannerModal } from '../SubscriberPricingBannerModal'

jest.mock('react-router', () => ({
  browserHistory: {
    push: jest.fn()
  }
}))

describe('<SubscriberPricingBannerModal />', () => {
  let wrapper
  let updateShowModal = jest.fn()

  describe('when subscriptionStatus is active ', () => {
    beforeEach(() => {
      wrapper = mount(
        <SubscriberPricingBannerModal
          showModal
          updateShowModal={updateShowModal}
          subscriptionStatus="active"
        />
      )
    })

    test('then modal has the correct isOpen prop', () => {
      expect(wrapper.find('[data-testing="subscriber-pricing-banner-modal"]').prop('isOpen')).toBe(true)
    })

    test('then the correct header is displayed', () => {
      expect(wrapper.find('[data-testing="resub-modal-header"]').text()).toEqual('We\'ve lowered our prices with savings on every repeat order')
    })

    test('then the correct copy is displayed', () => {
      expect(wrapper.find('.copy').text()).toEqual('By being a subscriber, you help us plan our food shop, so we can reduce food waste in our kitchen as well as yours.')
    })

    test('then the close CTA copy is displayed', () => {
      expect(wrapper.find('[data-testing="close-cta"]').text()).toEqual('Done')
    })

    test('then the correct SubscriberPricingInfoPanel class is passed', () => {
      expect(wrapper.find('.panelActive').length).toEqual(1)
      expect(wrapper.find('.panelInactive').length).toEqual(0)
    })

    test('then the sub copy is not displayed', () => {
      expect(wrapper.find('.subCopy').length).toEqual(0)
    })

    test('then the correct backgroundHeader class is passed', () => {
      expect(wrapper.find('.backgroundHeaderActive').length).toEqual(1)
      expect(wrapper.find('.backgroundHeaderInactive').length).toEqual(0)
    })

    describe('when the close-cta is clicked', () => {
      beforeEach(() => {
        wrapper.find('[data-testing="close-cta"]').simulate('click')
      })

      test('then then updateShowModal is closed with false', () => {
        expect(updateShowModal).toHaveBeenCalledWith(false)
      })
    })
  })

  describe('when subscriptionStatus is inactive', () => {
    beforeEach(() => {
      wrapper.setProps({
        subscriptionStatus: 'inactive'
      })
      wrapper.update()
    })

    test('then the correct SubscriberPricingInfoPanel class is passed', () => {
      expect(wrapper.find('.panelActive').length).toEqual(0)
      expect(wrapper.find('.panelInactive').length).toEqual(1)
    })

    test('then the correct backgroundHeader class is passed', () => {
      expect(wrapper.find('.backgroundHeaderActive').length).toEqual(0)
      expect(wrapper.find('.backgroundHeaderInactive').length).toEqual(1)
    })

    test('then the correct header is displayed', () => {
      expect(wrapper.find('[data-testing="resub-modal-header"]').text()).toEqual('We\'ve lowered our prices')
    })

    test('then the correct copy is displayed', () => {
      expect(wrapper.find('.copy').text()).toEqual('And you can save even more by restarting your Gousto subscription.')
    })

    test('then the correct sub copy is displayed', () => {
      expect(wrapper.find('.subCopy').text()).toEqual('You can edit your settings any time after you’ve restarted.')
    })

    test('then the close CTA copy is displayed', () => {
      expect(wrapper.find('[data-testing="close-cta"]').text()).toEqual('No thanks')
    })

    describe('when the reactivate is clicked', () => {
      beforeEach(() => {
        wrapper.find('[data-testing="reactivate-cta"]').simulate('click')
      })

      test('then the user is redirected', () => {
        expect(browserHistory.push).toHaveBeenCalledWith('/subscription-settings')
      })
    })

    describe('when the close-cta is clicked', () => {
      beforeEach(() => {
        updateShowModal = jest.fn().mockImplementation(() => wrapper.setProps({ showModal: false }))

        wrapper.setProps({
          subscriptionStatus: 'inactive',
          updateShowModal,
          showModal: true,
        })

        wrapper.find('[data-testing="close-cta"]').simulate('click')
        wrapper.update()
      })

      test('then then updateShowModal is closed with false', () => {
        expect(updateShowModal).toHaveBeenCalledWith(false)
      })

      test('then modal has the correct isOpen prop', () => {
        expect(wrapper.find('[data-testing="subscriber-pricing-banner-modal"]').prop('isOpen')).toBe(false)
      })
    })
  })
})
