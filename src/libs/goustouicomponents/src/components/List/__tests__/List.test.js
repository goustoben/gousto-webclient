import React from 'react'
import { mount } from 'enzyme'
import { List } from '..'

describe('<List />', () => {
  describe('when all children are wrapped with List.Item', () => {
    let wrapper

    const ITEMS = [
      <List.Item key="1">abc</List.Item>,
      <List.Item key="2">def</List.Item>,
      <List.Item key="3">ghi</List.Item>,
      <List.Item key="4">jkl</List.Item>,
    ]

    beforeEach(() => {
      wrapper = mount(<List>{ITEMS}</List>)
    })

    test('renders without crashing', () => {})

    test('renders a ul as a wrapper', () => {
      expect(wrapper.find('.wrapper').type()).toBe('ul')
    })

    test('renders an li with a class of item for each List.Item', () => {
      expect(wrapper.find('li.item').length).toBe(ITEMS.length)
    })

    test('renders the content of each List.Item in an li with a class of item', () => {
      ITEMS.forEach((item, index) => {
        expect(wrapper.find('li.item').at(index).html()).toMatch(mount(item).html())
      })
    })
  })

  describe('when not all children are wrapped with List.Item', () => {
    jest.spyOn(console, 'error')

    beforeEach(() => {
      // eslint-disable-next-line no-console
      console.error.mockImplementation(() => {})
    })

    afterEach(() => {
      // eslint-disable-next-line no-console
      console.error.mockRestore()
    })

    const ITEMS = [
      'test 1',
      'test 2',
      <div key="what">asdf</div>,
      'bla',
    ]

    test('throws an error', () => {
      expect(() => mount(<List>{ITEMS}</List>)).toThrowError('Only List.Item components are accepted as children')
    })
  })
})
