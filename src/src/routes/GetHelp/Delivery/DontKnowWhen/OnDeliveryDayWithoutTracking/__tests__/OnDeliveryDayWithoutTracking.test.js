import React from 'react'
import { shallow } from 'enzyme'
import { browserHistory } from 'react-router'
import { client } from 'config/routes'
import { OnDeliveryDayWithoutTracking } from '..'

describe('OnDeliveryDayWithoutTracking', () => {
  let wrapper
  browserHistory.push = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <OnDeliveryDayWithoutTracking
        deliverySlot={{
          deliveryStart: '08:00:00',
          deliveryEnd: '18:59:59',
        }}
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

  test('renders 3 paragraphs in total', () => {
    expect(wrapper.find('p')).toHaveLength(3)
  })

  test('renders a clientRouted link', () => {
    expect(wrapper.find('GoustoLink').prop('clientRouted')).toBe(true)
  })

  test('the link points to Get Help - Contact page', () => {
    const { index, contact } = client.getHelp

    expect(wrapper.find('GoustoLink').prop('to'))
      .toBe(`${index}/${contact}`)
  })
})
