import React from 'react'
import { mount } from 'enzyme'
import { LimitedCapacityNotice } from '../LimitedCapacityNotice'

describe('given LimitedCapacityNotice is rendered', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <LimitedCapacityNotice
        isLimitedCapacityChristmas={false}
        isResubscriptionBlocked={false}
        isTransactionalOrdersBlocked={false}
      />
    )
  })

  test('a <Alert /> is added correctly', () => {
    expect(wrapper.find('Alert').prop('type')).toBe('info')
  })

  test('a <Heading /> is added correctly', () => {
    expect(wrapper.find('Heading').prop('type')).toBe('h3')
  })

  describe('when isLimitedCapacityChristmas flag is off', () => {
    beforeEach(() => {
      wrapper.setProps({ isLimitedCapacityChristmas: false })
    })

    test('the title is set to the generic one', () => {
      expect(wrapper.find('Heading').text()).toBe('We’re full to the brim')
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
        wrapper.setProps({ isTransactionalOrdersBlocked: true })
      })

      test('the copy is rendered correctly', () => {
        expect(wrapper.find('Alert p').at(0).text()).toContain(
          'We’re very sorry that we’re still unable to take one-off orders. '
        )
      })
    })

    describe('when blockedResubscription flag in on', () => {
      beforeEach(() => {
        wrapper.setProps({ isResubscriptionBlocked: true })
      })

      test('the copy is rendered correctly', () => {
        expect(wrapper.find('Alert p').at(0).text()).toContain('Paused subscriptions cannot be reactivated right now.')
      })
    })
  })

  describe('when isLimitedCapacityChristmas flag is on', () => {
    beforeEach(() => {
      wrapper.setProps({ isLimitedCapacityChristmas: true })
    })

    test('the title is set to a custom one', () => {
      expect(wrapper.find('Heading').text()).toBe('We’re really sorry but we’re unable to take any more orders')
    })

    test('the default copy is not rendered', () => {
      expect(wrapper.find('Alert').text()).not.toContain(
        'Due to overwhelming demand, our delivery slots are nearly full.'
      )
    })

    test('a custom copy is rendered', () => {
      expect(wrapper.find('Alert').text()).toContain(
        'With the Christmas period'
      )
    })
  })
})
