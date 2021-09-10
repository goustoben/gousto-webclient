import React from 'react'
import { shallow } from 'enzyme'
import { browserHistory } from 'react-router'
import { client } from 'config/routes'
import { OnDeliveryDayWithTracking } from '..'
import { mockWindowLocationAssign } from '../../../../../../../jest/mockWindowLocationAssign'

describe('OnDeliveryDayWithTracking', () => {
  const TRACK_MY_BOX_LINK = 'https://courier.com/trackbox/order=1234'
  let wrapper
  browserHistory.push = jest.fn()
  const trackClickGetInTouchInSSRDeliveries = jest.fn()
  const trackClickTrackMyBoxInSSRDeliveries = jest.fn()
  const { location } = window.location

  beforeEach(() => {
    wrapper = shallow(
      <OnDeliveryDayWithTracking
        deliverySlot={{
          deliveryStart: '08:00:00',
          deliveryEnd: '18:59:59',
        }}
        trackMyBoxLink={TRACK_MY_BOX_LINK}
        trackClickGetInTouchInSSRDeliveries={trackClickGetInTouchInSSRDeliveries}
        trackClickTrackMyBoxInSSRDeliveries={trackClickTrackMyBoxInSSRDeliveries}
      />
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders without crashing', () => {})

  test('renders GetHelpLayout2', () => {
    expect(wrapper.find('GetHelpLayout2').exists()).toBe(true)
  })

  test('renders Heading', () => {
    expect(wrapper.find('Heading').exists()).toBe(true)
  })

  test('Heading has the size set to fontStyleM', () => {
    expect(wrapper.find('Heading').prop('size')).toBe('fontStyleM')
  })

  test('Heading is an h2', () => {
    expect(wrapper.find('Heading').prop('type')).toBe('h2')
  })

  test('Heading copy is relevant', () => {
    expect(wrapper.find('Heading').html()).toContain('still')
  })

  test('renders a paragraph with the delivery slot', () => {
    expect(wrapper.find('p').at(0).text()).toMatch(/8am.*7pm/)
  })

  test('renders 3 paragraphs in total', () => {
    expect(wrapper.find('p')).toHaveLength(3)
  })

  test('renders a secondary CTA inside BottomFixedContent', () => {
    const ctas = wrapper.find('BottomFixedContent').find('CTA')
    expect(ctas.at(0).prop('variant')).toBe('secondary')
  })

  test('renders a primary CTA inside BottomFixedContent', () => {
    const ctas = wrapper.find('BottomFixedContent').find('CTA')
    expect(ctas.at(1).prop('variant')).toBe('primary')
  })

  describe('when the secondary CTA is clicked', () => {
    beforeEach(() => {
      const secondaryCTA = wrapper.find('BottomFixedContent').find('CTA').at(0)
      secondaryCTA.simulate('click')
    })

    test('redirects to Get Help - Contact page', () => {
      const { index, contact } = client.getHelp

      expect(browserHistory.push).toHaveBeenCalledWith(`${index}/${contact}`)
    })

    test('trackClickGetInTouchInSSRDeliveries is called correctly', () => {
      expect(trackClickGetInTouchInSSRDeliveries).toHaveBeenCalled()
    })
  })

  describe('when the primary CTA is clicked', () => {
    let mockAssign

    beforeEach(() => {
      mockAssign = mockWindowLocationAssign()
    })

    beforeEach(() => {
      const primaryCTA = wrapper.find('BottomFixedContent').find('CTA').at(1)
      primaryCTA.simulate('click')
    })

    afterAll(() => {
      window.location = location
    })

    test('redirects to the box tracking link passed as a prop', () => {
      expect(mockAssign).toHaveBeenCalledWith(TRACK_MY_BOX_LINK)
    })

    test('trackClickTrackMyBoxInSSRDeliveries is called correctly', () => {
      expect(trackClickTrackMyBoxInSSRDeliveries).toHaveBeenCalled()
    })
  })
})
