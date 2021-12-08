import React from 'react'
import { mount } from 'enzyme'
import { HeaderNavExtendedItemLink } from '../HeaderNavExtendedItemLink.logic'

describe('HeaderNavExtendedItemLink', () => {
  let wrapper

  const ITEM = {
    label: 'test',
    url: 'example.com',
  }

  beforeEach(() => {
    wrapper = mount(<HeaderNavExtendedItemLink item={ITEM} isExtendedNavigationVisible={false} />)
  })

  test('renders without crashing', () => {})

  test('sets the href as item.url', () => {
    expect(wrapper.find('a').prop('href')).toBe(ITEM.url)
  })

  test('sets the text as item.label', () => {
    expect(wrapper.find('a').text()).toBe(ITEM.label)
  })

  describe('when isExtendedNavigationVisible is set to false', () => {
    beforeEach(() => {
      wrapper.setProps({ isExtendedNavigationVisible: false })
    })

    test('makes the links not accessible through the keyboard', () => {
      expect(wrapper.find('a').prop('tabIndex')).toBe('-1')
    })
  })

  describe('when isExtendedNavigationVisible is set to true', () => {
    beforeEach(() => {
      wrapper.setProps({ isExtendedNavigationVisible: true })
    })

    test('makes the links accessible through the keyboard', () => {
      expect(wrapper.find('a').prop('tabIndex')).toBe('0')
    })
  })
})
