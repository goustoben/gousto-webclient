import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import { CollectionsNavigation, CollectionsNavigationItem } from '../index'

describe('CollectionsNavigation', () => {
  let wrapper
  const COLLECTIONS_NAVIGATION = (
    <CollectionsNavigation>
      <CollectionsNavigationItem isActive onClick={jest.fn()}>Click me!</CollectionsNavigationItem>
      <CollectionsNavigationItem onClick={jest.fn()}>No, click me!</CollectionsNavigationItem>
    </CollectionsNavigation>
  )

  beforeEach(() => {
    wrapper = mount(COLLECTIONS_NAVIGATION)
  })

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(COLLECTIONS_NAVIGATION, div)
  })

  test('passes the index to the child component', () => {
    expect(wrapper.find('CollectionsNavigationItem').first().prop('index')).toBe(0)
    expect(wrapper.find('CollectionsNavigationItem').last().prop('index')).toBe(1)
  })

  test('passes the setActive function to the child component', () => {
    expect(wrapper.find('CollectionsNavigationItem').first().prop('setActive')).toBe(wrapper.instance().setActive)
  })

  test('activeElement state is null by default', () => {
    expect(wrapper.state('activeElement')).toBe(null)
  })

  describe('when one of children has the isActive prop passed', () => {
    describe('and activeElement state is null', () => {
      beforeEach(() => {
        wrapper.setState({ activeElement: null })
      })

      test('passes the isActive as true to that child', () => {
        expect(wrapper.find('CollectionsNavigationItem').first().prop('isActive')).toBe(true)
      })
    })

    describe('and activeElement state is a different index than that element', () => {
      beforeEach(() => {
        wrapper.setState({ activeElement: 1 })
      })

      test('passes the isActive as false to that child', () => {
        expect(wrapper.find('CollectionsNavigationItem').first().prop('isActive')).toBe(false)
      })

      test('passes the isActive prop as true to the element matching the activeElement index', () => {
        expect(wrapper.find('CollectionsNavigationItem').last().prop('isActive')).toBe(true)
      })
    })
  })
})
