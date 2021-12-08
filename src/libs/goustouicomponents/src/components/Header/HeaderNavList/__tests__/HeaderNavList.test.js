import React from 'react'
import { mount } from 'enzyme'
import { routes } from 'gousto-config'
import { HeaderNavList, ITEM_TRACKING_ACTIONS } from '../HeaderNavList.logic'

describe('HeaderNavList', () => {
  const { goustoWebclient } = routes
  const ITEMS = Object.values(goustoWebclient)

  let wrapper

  beforeEach(() => {
    wrapper = mount(<HeaderNavList items={ITEMS} isAuthenticated />)
  })

  test('renders without crashing', () => {})

  test('renders all elements', () => {
    expect(wrapper.find('.navListItem').length).toBe(ITEMS.length)
  })

  test('each list item has an anchor in it', () => {
    wrapper.find('.navListItem').forEach((item) => {
      expect(item.find('.navListItemLink').exists()).toBe(true)
    })
  })

  ITEMS.forEach((item) => {
    describe('and for each rendered anchor', () => {
      let anchorItem

      beforeEach(() => {
        const listItem = wrapper.findWhere((node) => node.key() === item.label)
        anchorItem = listItem.find('.navListItemLink')
      })

      test('the right href attribute is set', () => {
        expect(anchorItem.prop('href')).toBe(item.url)
      })

      test('the right text is set', () => {
        expect(anchorItem.text()).toBe(item.label)
      })

      test('toggles the navListItemLinkCTA class if the original route item has the highlightHeader key', () => {
        if (item.highlightHeader) {
          expect(anchorItem.hasClass('navListItemLinkCTA')).toBe(true)
        } else {
          expect(anchorItem.hasClass('navListItemLinkCTA')).toBe(false)
        }
      })
    })
  })

  describe('when hasDataTracking prop is true', () => {
    beforeEach(() => {
      wrapper.setProps({ hasDataTracking: true })
    })

    describe.each([[true], [false]])('and isAuthenticated prop is %s', (isAuthenticated) => {
      beforeEach(() => {
        wrapper.setProps({ isAuthenticated })
      })

      describe.each([
        [
          goustoWebclient.help.label,
          JSON.stringify({ logged_in: isAuthenticated }),
        ],
      ])('The %s link', (linkLabel, trackingProperty) => {
        test(`has the data-tracking-action attribute with the value ${ITEM_TRACKING_ACTIONS[linkLabel]}`, () => {
          const anchorItem = wrapper.findWhere((node) => node.key() === linkLabel)
            .find('.navListItemLink')

          expect(anchorItem.prop('data-tracking-action')).toBe(ITEM_TRACKING_ACTIONS[linkLabel])
        })

        test('has the data-tracking-property attribute with the corresponding value', () => {
          const anchorItem = wrapper.findWhere((node) => node.key() === linkLabel)
            .find('.navListItemLink')

          expect(anchorItem.prop('data-tracking-property')).toBe(trackingProperty)
        })
      })
    })
  })

  describe('when hasDataTracking prop is false', () => {
    beforeEach(() => {
      wrapper.setProps({ hasDataTracking: false })
    })

    describe.each([
      [goustoWebclient.help.label],
    ])('The %s link', (linkLabel) => {
      test('does not have the data-tracking-action attribute', () => {
        const anchorItem = wrapper.findWhere((node) => node.key() === linkLabel)
          .find('.navListItemLink')

        expect(anchorItem.prop('data-tracking-action')).toBe(undefined)
      })

      test('does not have the data-tracking-property attribute', () => {
        const anchorItem = wrapper.findWhere((node) => node.key() === linkLabel)
          .find('.navListItemLink')

        expect(anchorItem.prop('data-tracking-property')).toBe(undefined)
      })
    })
  })
})
