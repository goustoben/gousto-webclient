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
  const trackClickMyGoustoInSSRDeliveries = jest.fn()
  const trackClickTrackMyBoxInSSRDeliveries = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <OnDeliveryDayWithTracking
        deliverySlot={{
          deliveryStart: '08:00:00',
          deliveryEnd: '18:59:59',
        }}
        trackClickGetInTouchInSSRDeliveries={trackClickGetInTouchInSSRDeliveries}
        trackClickMyGoustoInSSRDeliveries={trackClickMyGoustoInSSRDeliveries}
        trackClickTrackMyBoxInSSRDeliveries={trackClickTrackMyBoxInSSRDeliveries}
        trackMyBoxLink={TRACK_MY_BOX_LINK}
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
    expect(wrapper.find('Heading').html()).toContain('know when')
  })

  test('renders a paragraph with the delivery slot', () => {
    expect(wrapper.find('p').at(0).text()).toMatch(/8am.*7pm/)
  })

  test('renders 4 paragraphs in total', () => {
    expect(wrapper.find('p')).toHaveLength(4)
  })

  test('renders a clientRouted link', () => {
    expect(wrapper.find('GoustoLink').prop('clientRouted')).toBe(true)
  })

  test('the link points to Get Help - Contact page', () => {
    const { index, contact } = client.getHelp

    expect(wrapper.find('GoustoLink').prop('to'))
      .toBe(`${index}/${contact}`)
  })

  test('the link to Contact page has correct tracking', () => {
    expect(wrapper.find('GoustoLink').prop('tracking'))
      .toBe(trackClickGetInTouchInSSRDeliveries)
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

    test('redirects to My Gousto page', () => {
      expect(browserHistory.push).toHaveBeenCalledWith(client.myGousto)
    })

    test('trackClickMyGoustoInSSRDeliveries is called correctly', () => {
      expect(trackClickMyGoustoInSSRDeliveries).toHaveBeenCalled()
    })
  })

  describe('when the primary CTA is clicked', () => {
    const { location } = window.location
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
