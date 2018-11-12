import React from 'react'
import { shallow } from 'enzyme'

import sinon from 'sinon'

import Icon from 'Icon'
import { H1 } from 'Page/Header'
import Title from 'Page/Block/Title'

describe('Page Block Title', () => {
  let wrapper

  describe('rendering', () => {
    test('should return null if no children provided', () => {
      wrapper = shallow(<Title />)
      expect(wrapper.type()).toBe(null)
    })

    test('should return an <H1> when children provided', () => {
      wrapper = shallow(<Title>Title String</Title>)
      expect(wrapper.type()).toBe(H1)
    })

    test('should render children', () => {
      wrapper = shallow(
				<Title>
					<p>Title String</p>
				</Title>,
      )
      expect(wrapper.find('p')).toHaveLength(1)
      expect(wrapper.find('p').text()).toBe('Title String')
    })

    test('should render an icon before text if iconBefore is provided', () => {
      wrapper = shallow(<Title iconBefore="icon-name">Title String</Title>)
      expect(wrapper.childAt(0).type()).toBe(Icon)
      expect(wrapper.childAt(1).text()).toBe(' ')
    })

    test('should render an icon after text if iconAfter is provided', () => {
      wrapper = shallow(<Title iconAfter="icon-name">Title String</Title>)

      expect(wrapper.childAt(1).text()).toBe(' ')
      expect(wrapper.childAt(2).type()).toBe(Icon)
    })
  })
})
