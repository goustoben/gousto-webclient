import React from 'react'
import { shallow } from 'enzyme'
import { browserHistory } from 'react-router'
import { client } from 'config/routes'
import { DeliveryPreContact } from '..'

describe('DeliveryPreContact', () => {
  const BACK_URL = 'get-help/userId/123/orderId/111/delivery'
  let wrapper
  const trackClickGetInTouchInSSRDeliveries = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <DeliveryPreContact
        backUrl={BACK_URL}
        trackClickGetInTouchInSSRDeliveries={trackClickGetInTouchInSSRDeliveries}
      />
    )
  })

  test('renders without crashing', () => {})

  test('renders GetHelpLayout2 passing the backUrl prop', () => {
    expect(wrapper.find('GetHelpLayout2').prop('backUrl')).toBe(BACK_URL)
  })

  test('renders Heading', () => {
    expect(wrapper.find('Heading').exists()).toBe(true)
  })

  test('Heading has the size set to fontStyleM', () => {
    expect(wrapper.find('Heading').prop('size')).toBe('fontStyleM')
  })

  test('renders CTA inside BottomFixedContent', () => {
    expect(wrapper.find('BottomFixedContent').find('CTA').exists()).toBe(true)
  })

  describe('when CTA is clicked', () => {
    beforeEach(() => {
      browserHistory.push = jest.fn()

      const CTA = wrapper.find('BottomFixedContent').find('CTA')
      CTA.simulate('click')
    })

    test('the CTA points to Contact page', () => {
      expect(browserHistory.push).toHaveBeenCalledWith(`${client.getHelp.index}/${client.getHelp.contact}`)
    })

    test('tracking is called correctly', () => {
      expect(trackClickGetInTouchInSSRDeliveries).toHaveBeenCalled()
    })
  })
})
