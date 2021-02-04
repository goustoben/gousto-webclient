import React from 'react'
import { mount } from 'enzyme'
import { SubscriberPricingBanner } from '../SubscriberPricingBanner'

describe('<SubscriberPricingBanner />', () => {
  let wrapper
  const trackMyGoustoSubscriberPricingBannerClick = jest.fn()

  beforeEach(() => {
    wrapper = mount(
      <SubscriberPricingBanner
        trackMyGoustoSubscriberPricingBannerClick={trackMyGoustoSubscriberPricingBannerClick}
        subscriptionStatus="active"
      />
    )
  })

  describe('when the modal CTA is clicked', () => {
    beforeEach(() => {
      wrapper.find('[data-testing="subscriber-pricing-cta"]').simulate('click')
      wrapper.update()
    })

    test('then the modal renders', () => {
      expect(wrapper.find('[data-testing="resub-modal-header"]').text()).toEqual('We\'ve lowered our prices with savings on every repeat order')
    })

    test('and the tracking is triggered', () => {
      expect(trackMyGoustoSubscriberPricingBannerClick).toHaveBeenCalled()
    })
  })

  describe('when the banner is closed', () => {
    beforeEach(() => {
      wrapper.find('[data-testing="close-banner-cta"]').simulate('click')
      wrapper.update()
    })

    test('then the banner disappears', () => {
      expect(wrapper.find('.copy').length).toEqual(0)
    })
  })
})
