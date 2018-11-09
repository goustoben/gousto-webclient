import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import Title from '../Title'

describe('Order Skip Recovery Model Title', () => {
  let wrapper

  describe('Innitial Render', () => {
    test('should render snapshot', () => {
      const tree = renderer.create(
				<Title />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })

    test('should render title', () => {
      wrapper = mount(<Title />)

      expect(wrapper.text()).toBe('Are you sure you want to skip?')
    })
  })

  describe('Alternative Render', () => {
    test('should render title to say "cancel" instead of "skip"', () => {
      wrapper = mount(<Title orderType="pending" />)

      expect(wrapper.text()).toBe('Are you sure you want to cancel?')
    })

    test('should render custom title', () => {
      wrapper = mount(<Title title="custom title" />)

      expect(wrapper.text()).toBe('custom title')
    })

    test('should prioritise title over orderType', () => {
      wrapper = mount(<Title title="foo bar" orderType="pending" />)

      expect(wrapper.text()).toBe('foo bar')
    })
  })
})
