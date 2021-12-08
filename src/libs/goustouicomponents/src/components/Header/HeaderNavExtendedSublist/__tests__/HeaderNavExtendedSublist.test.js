import React from 'react'
import { mount } from 'enzyme'
import { routes } from 'gousto-config'
import { HeaderNavExtendedSublist, ITEM_TRACKING_ACTIONS } from '../HeaderNavExtendedSublist.logic'

describe('HeaderNavExtendedSublist', () => {
  let wrapper
  const { goustoWebclient } = routes

  const ITEMS = [
    {
      url: 'url1',
      label: 'label1',
    },
    {
      url: 'url2',
      label: 'label2',
    },
    { ...goustoWebclient.help },
  ]

  beforeEach(() => {
    wrapper = mount(
      <HeaderNavExtendedSublist
        items={ITEMS}
        isExtendedNavigationVisible={false}
        isAuthenticated
      />,
    )
  })

  test('renders without crashing', () => {})

  test('creates a list with the items', () => {
    expect(wrapper.find('li').length).toBe(ITEMS.length)
  })

  test('for each element in the list it is passing the item to the HeaderNavExtendedItemLink', () => {
    wrapper.find('HeaderNavExtendedItemLink').forEach((item, index) => {
      expect(item.prop('item')).toBe(ITEMS[index])
    })
  })

  describe('when the prop hasDataTracking is true', () => {
    beforeEach(() => {
      wrapper.setProps({ hasDataTracking: true })
    })

    describe.each([[true], [false]])('and the prop isAuthenticated is %s', (isAuthenticated) => {
      beforeEach(() => {
        wrapper.setProps({ isAuthenticated })
      })

      describe.each([
        [
          goustoWebclient.help.label,
          JSON.stringify({ logged_in: isAuthenticated }),
        ],
      ])('The %s item', (itemLabel, trackingProperties) => {
        test(`has the data attribute with the tracking action ${ITEM_TRACKING_ACTIONS[itemLabel]}`, () => {
          const item = wrapper.findWhere((node) => node.key() === itemLabel)

          expect(item.prop('data-tracking-action')).toBe(ITEM_TRACKING_ACTIONS[itemLabel])
        })

        test('has the tracking data attribute with the corresponding value', () => {
          const item = wrapper.findWhere((node) => node.key() === itemLabel)

          expect(item.prop('data-tracking-property')).toBe(trackingProperties)
        })
      })
    })
  })

  describe('when the prop hasDataTracking is false', () => {
    beforeEach(() => {
      wrapper.setProps({ hasDataTracking: false })
    })

    test.each([
      [goustoWebclient.help.label],
    ])('The %s link does not have any tracking data attribute', (itemLabel) => {
      const item = wrapper.findWhere((node) => node.key() === itemLabel)

      expect(item.prop('data-tracking-action')).toBe(undefined)
      expect(item.prop('data-tracking-property')).toBe(undefined)
    })
  })

  describe('when isExtendedNavigationVisible is set to false', () => {
    beforeEach(() => {
      wrapper.setProps({ isExtendedNavigationVisible: false })
    })

    test('passes the prop as false to HeaderNavExtendedItemLink', () => {
      wrapper.find('HeaderNavExtendedItemLink').forEach((item) => {
        expect(item.prop('isExtendedNavigationVisible')).toBe(false)
      })
    })
  })

  describe('when isExtendedNavigationVisible is set to true', () => {
    beforeEach(() => {
      wrapper.setProps({ isExtendedNavigationVisible: true })
    })

    test('passes the prop as true to HeaderNavExtendedItemLink', () => {
      wrapper.find('HeaderNavExtendedItemLink').forEach((item) => {
        expect(item.prop('isExtendedNavigationVisible')).toBe(true)
      })
    })
  })
})
