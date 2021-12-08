import React from 'react'
import { mount } from 'enzyme'
import { HeaderNavExtendedList } from '../HeaderNavExtendedList.logic'

describe('HeaderNavExtendedList', () => {
  let wrapper

  const ITEMS = [
    {
      label: 'label1',
      url: 'url1',
      subItems: [
        {
          label: 'subItemsLabel1',
          url: 'subItemsUrl1',
        },
        {
          label: 'subItemsLabel2',
          url: 'subItemsUrl2',
        },
      ],
    },
    {
      label: 'label2',
      url: 'url2',
    },
  ]

  beforeEach(() => {
    wrapper = mount(<HeaderNavExtendedList
      items={ITEMS}
      isExtendedNavigationVisible={false}
      isAuthenticated
    />)
  })

  test('renders without crashing', () => {})

  test('for each element in the list it is passing the item to the HeaderNavExtendedItemLink', () => {
    wrapper.find('.navExtendedListItem > HeaderNavExtendedItemLink').forEach((item, index) => {
      expect(item.prop('item')).toBe(ITEMS[index])
    })
  })

  describe('when the item has a sublist', () => {
    test('renders the HeaderNavExtendedSublist with the subItems as props', () => {
      const item = wrapper.find('li').first()

      expect(item.find('HeaderNavExtendedSublist').prop('items')).toBe(ITEMS[0].subItems)
    })

    describe.each([
      ['hasDataTracking', true],
      ['hasDataTracking', false],
      ['isAuthenticated', true],
      ['isAuthenticated', false],
    ])('when %s prop is %s', (prop, propValue) => {
      beforeEach(() => {
        wrapper.setProps({ [prop]: propValue })
      })

      test('it passes it to the component HeaderNavExtendedSublist', () => {
        expect(wrapper.find('HeaderNavExtendedSublist').prop(prop)).toBe(propValue)
      })
    })
  })

  describe('when the item does not have a sublist', () => {
    test('does not render the HeaderNavExtendedSublist', () => {
      const item = wrapper.find('li').last()

      expect(item.find('HeaderNavExtendedSublist').exists()).toBe(false)
    })
  })

  describe('when the isExtendedNavigationVisible is set to false', () => {
    beforeEach(() => {
      wrapper.setProps({ isExtendedNavigationVisible: false })
    })

    test('does not have the isVisible class on the wrapper', () => {
      expect(wrapper.find('.navExtendedListWrapper').hasClass('isVisible')).toBe(false)
    })

    test('passes the prop as false to HeaderNavExtendedItemLink', () => {
      wrapper.find('HeaderNavExtendedItemLink').forEach((item) => {
        expect(item.prop('isExtendedNavigationVisible')).toBe(false)
      })
    })

    test('passes the prop as false to HeaderNavExtendedSublist', () => {
      wrapper.find('HeaderNavExtendedSublist').forEach((item) => {
        expect(item.prop('isExtendedNavigationVisible')).toBe(false)
      })
    })
  })

  describe('when the isExtendedNavigationVisible is set to true', () => {
    beforeEach(() => {
      wrapper.setProps({ isExtendedNavigationVisible: true })
    })

    test('has the isVisible class on the wrapper', () => {
      expect(wrapper.find('.navExtendedListWrapper').hasClass('isVisible')).toBe(true)
    })

    test('passes the prop as true to HeaderNavExtendedItemLink', () => {
      wrapper.find('HeaderNavExtendedItemLink').forEach((item) => {
        expect(item.prop('isExtendedNavigationVisible')).toBe(true)
      })
    })

    test('passes the prop as true to HeaderNavExtendedSublist', () => {
      wrapper.find('HeaderNavExtendedSublist').forEach((item) => {
        expect(item.prop('isExtendedNavigationVisible')).toBe(true)
      })
    })
  })
})
