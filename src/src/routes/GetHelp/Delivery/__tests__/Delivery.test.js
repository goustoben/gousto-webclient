import React from 'react'
import { mount } from 'enzyme'
import { browserHistory } from 'react-router'
import { Delivery } from '../Delivery'

describe('given Delivery is rendered', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <Delivery
        trackDeliveryOther={() => {}}
        trackDeliveryStatus={() => {}}
      />
    )
  })

  test('the page title is being rendered correctly', () => {
    expect(wrapper.find('GetHelpLayout').prop('title')).toEqual('Get help with box issue?')
  })

  describe('when Delivery Status button renders', () => {
    const content = {
      intro: 'The tracking link is available on your day of delivery and this can be found on the "My Gousto" page under your next box delivery.',
      cta: 'View My Gousto',
    }
    const trackDeliveryStatus = jest.fn()

    beforeEach(() => {
      browserHistory.push = jest.fn()

      trackDeliveryStatus.mockClear()

      wrapper.setProps({
        trackDeliveryStatus,
      })
    })

    describe('and the button is expanded', () => {
      let ItemExpandable

      beforeEach(() => {
        const DeliveryStatusButton = wrapper.find('ItemExpandable').find('ItemPresentation')

        DeliveryStatusButton.simulate('click')

        ItemExpandable = wrapper.find('ItemExpandable')
      })

      test('the introduction copy is displayed correctly', () => {
        expect(ItemExpandable.find('.deliveryStatusContent').find('p').text())
          .toEqual(content.intro)
      })

      test('the CTA button is display correctly', () => {
        const CTA = ItemExpandable.find('.deliveryStatusContent').find('CTA')

        expect(CTA.text()).toEqual(content.cta)
        expect(CTA.exists()).toBe(true)
      })

      describe('and CTA is clicked', () => {
        let CTA

        beforeEach(() => {
          CTA = ItemExpandable.find('.deliveryStatusContent').find('CTA')

          CTA.simulate('click')
        })

        test('the button points to My Gousto page', () => {
          expect(browserHistory.push).toHaveBeenCalledWith('/my-gousto')
        })

        test('the button is calling the tracking function correctly', () => {
          expect(trackDeliveryStatus).toHaveBeenCalledTimes(1)
        })
      })
    })
  })

  describe('when Other button renders', () => {
    const trackDeliveryOther = jest.fn()
    let ItemLink

    beforeEach(() => {
      wrapper.setProps({
        trackDeliveryOther,
      })

      ItemLink = wrapper.find('ItemLink')
    })

    test('the button points to the Get Help Contact page', () => {
      expect(ItemLink.prop('to')).toEqual('/get-help/contact')
    })

    test('the button is calling the tracking function correctly', () => {
      ItemLink.find('Item').simulate('click')

      expect(trackDeliveryOther).toHaveBeenCalledTimes(1)
    })
  })
})
