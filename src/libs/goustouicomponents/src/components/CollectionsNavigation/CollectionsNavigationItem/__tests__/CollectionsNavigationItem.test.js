import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import { CollectionsNavigationItem } from '../CollectionsNavigationItem.logic'

describe('CollectionsNavigationItem', () => {
  let wrapper
  const PROPS = {
    index: 0,
    onClick: jest.fn(),
    setActive: jest.fn(),
  }

  const COLLECTIONS_NAVIGATION_ITEM = <CollectionsNavigationItem {...PROPS}>Click me!</CollectionsNavigationItem>

  beforeEach(() => {
    wrapper = mount(COLLECTIONS_NAVIGATION_ITEM)
  })

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(COLLECTIONS_NAVIGATION_ITEM, div)
  })

  test('does not have the isActive class on the wrapper', () => {
    expect(wrapper.find('.item').hasClass('isActive')).toBe(false)
  })

  describe('when a user clicks on the component', () => {
    beforeEach(() => {
      wrapper.simulate('click')
    })

    test('calls the function passed as onClick', () => {
      expect(PROPS.onClick).toHaveBeenCalledTimes(1)
    })

    test('calls the setActive function with the index as a parameter', () => {
      expect(PROPS.setActive).toHaveBeenCalledWith(PROPS.index)
    })
  })

  describe('when the isActive prop is set to true', () => {
    beforeEach(() => {
      wrapper.setProps({ isActive: true })
    })

    test('adds the isActive class on the wrapper', () => {
      expect(wrapper.find('.item').hasClass('isActive')).toBe(true)
    })
  })
})
