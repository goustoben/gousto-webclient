import React from 'react'
import { mount } from 'enzyme'
import { client } from 'config/routes'
import { NextProjectedDelivery } from '.'

describe('<NextProjectedDelivery>', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <NextProjectedDelivery
        deliveryDate="2021-08-03"
      />
    )
  })

  test('renders the heading', () => {
    const heading = wrapper.find('Heading')
    expect(heading.prop('size')).toBe('fontStyleM')
    expect(heading.prop('type')).toBe('h2')
    expect(heading.text()).toBe('Upcoming delivery')
  })

  describe('inside a <Card>', () => {
    let card

    beforeEach(() => {
      card = wrapper.find('Card')
    })

    test('renders the projected delivery details with the right status and human date', () => {
      const orderDetails = card.find('OrderDetails')
      expect(orderDetails.prop('deliveryDate')).toBe('Tuesday 3rd August')
      expect(orderDetails.prop('orderState')).toBe('scheduled')
    })

    test('renders a link pointing to My Deliveries', () => {
      expect(card.find('GoustoLink').prop('to')).toBe(client.myDeliveries)
    })

    test('renders the link as a secondary CTA with the right copy and style', () => {
      const cta = card.find('GoustoLink').find('CTA')
      expect(cta.prop('isFullWidth')).toBe(true)
      expect(cta.prop('size')).toBe('small')
      expect(cta.prop('variant')).toBe('secondary')
      expect(cta.text()).toBe('View my upcoming deliveries')
    })
  })
})
