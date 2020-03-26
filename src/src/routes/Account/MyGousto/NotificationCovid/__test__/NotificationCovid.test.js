import React from 'react'
import { mount } from 'enzyme'
import { NotificationCovid } from '../NotificationCovid'

describe('given NotificationCovid is rendered', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <NotificationCovid hasSubscriptionEnabled={false} />
    )
  })

  test('a <Alert /> is added correctly', () => {
    expect(wrapper.find('Alert').prop('type')).toBe('info')
  })

  test('a <Heading /> is added correctly', () => {
    expect(wrapper.find('Heading').prop('type')).toBe('h3')
  })

  describe('when it is a transactional customer', () => {
    beforeEach(() => {
      wrapper = mount(
        <NotificationCovid hasSubscriptionEnabled={false} />
      )
    })

    test('the copy is rendered correctly', () => {
      expect(wrapper.find('Alert p').at(0).text()).toEqual(
        'Due to overwhelming demand, most of our delivery slots are full. Unfortunately our customer care team can\'t place orders for you.'
      )

      expect(wrapper.find('Alert p').at(1).text()).toEqual(
        'If you can\'t find a free slot, please try another day or the following week. Thank you for bearing with us.'
      )
    })

    test('the link points to knowledge base', () => {
      expect(wrapper.find('Alert a').prop('href')).toBe(
        'https://gousto.zendesk.com/hc/en-gb/articles/360006713417--How-does-the-coronavirus-situation-affect-Gousto-'
      )
    })
  })

  describe('when it is a subscription customer', () => {
    beforeEach(() => {
      wrapper = mount(
        <NotificationCovid hasSubscriptionEnabled />
      )
    })

    test('the copy is rendered correctly', () => {
      expect(wrapper.find('Alert p').at(0).text()).toEqual(
        'Due to overwhelming demand, you might struggle to move your deliveries or place extra orders. Unfortunately our customer care team can\'t place orders for you.'
      )

      expect(wrapper.find('Alert p').at(1).text()).toEqual(
        'It would also be helpful if you could choose your recipes as early as possible. Thank you for bearing with us.'
      )
    })

    test('the link points to knowledge base', () => {
      expect(wrapper.find('Alert a').prop('href')).toBe(
        'https://gousto.zendesk.com/hc/en-gb/articles/360006713417--How-does-the-coronavirus-situation-affect-Gousto-'
      )
    })
  })
})
