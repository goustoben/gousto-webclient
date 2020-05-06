import React from 'react'
import { mount } from 'enzyme'
import { NotificationCovid } from '../NotificationCovid'

describe('given NotificationCovid is rendered', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <NotificationCovid isResubscriptionBlocked={false} isTransactionalOrdersBlocked={false} />
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
      'Due to overwhelming demand, our delivery slots are nearly full.\u00a0'
    )
  })

  describe('when blockedTransactionalOrders flag in on', () => {
    beforeEach(() => {
      wrapper = mount(
        <NotificationCovid isResubscriptionBlocked={false} isTransactionalOrdersBlocked />
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
        <NotificationCovid isResubscriptionBlocked isTransactionalOrdersBlocked={false} />
      )
    })

    test('the copy is rendered correctly', () => {
      expect(wrapper.find('Alert p').at(0).text()).toContain('Paused subscriptions cannot be reactivated right now.')
    })
  })
})
