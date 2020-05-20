import React from 'react'
import { mount } from 'enzyme'
import { LimitedCapacityNotice } from '../LimitedCapacityNotice'

describe('given LimitedCapacityNotice is rendered', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <LimitedCapacityNotice isResubscriptionBlocked={false} isTransactionalOrdersBlocked={false} />
    )
  })

  test('a <Alert /> is added correctly', () => {
    expect(wrapper.find('Alert').prop('type')).toBe('info')
  })

  test('a <Heading /> is added correctly', () => {
    expect(wrapper.find('Heading').prop('type')).toBe('h3')
  })

  test('the copy is rendered correctly', () => {
    expect(wrapper.find('Alert p').at(0).text()).toBe(
      'Due to overwhelming demand, our delivery slots are nearly full.\u00a0If you’re having issues finding an available slot, try changing your delivery day.'
    )
  })

  describe.each([
    [null, ''],
    ['1234', '/?user_id=1234']
  ])('when the userIdProp is %s', (userId, urlQueryParam) => {
    beforeEach(() => {
      wrapper.setProps({ userId })
    })

    test(`the link points to knowledge base. And it adds to the end of the url: "${urlQueryParam}"`, () => {
      expect(wrapper.find('Alert a').prop('href')).toBe(
        `https://gousto.zendesk.com/hc/en-gb/articles/360006713417--How-does-the-coronavirus-situation-affect-Gousto-${urlQueryParam}`
      )
    })
  })

  describe('when blockedTransactionalOrders flag in on', () => {
    beforeEach(() => {
      wrapper = mount(
        <LimitedCapacityNotice isResubscriptionBlocked={false} isTransactionalOrdersBlocked />
      )
    })

    test('the copy is rendered correctly', () => {
      expect(wrapper.find('Alert p').at(0).text()).toContain(
        'We’re very sorry that we’re still unable to take one-off orders. '
      )
    })
  })

  describe('when blockedResubscription flag in on', () => {
    beforeEach(() => {
      wrapper = mount(
        <LimitedCapacityNotice isResubscriptionBlocked isTransactionalOrdersBlocked={false} />
      )
    })

    test('the copy is rendered correctly', () => {
      expect(wrapper.find('Alert p').at(0).text()).toContain('Paused subscriptions cannot be reactivated right now.')
    })
  })
})
