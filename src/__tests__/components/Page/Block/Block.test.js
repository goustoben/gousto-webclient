import React from 'react'
import { shallow } from 'enzyme'

import sinon from 'sinon'

import Block from 'Page/Block'

describe('Page Block', () => {
  let wrapper

  describe('rendering', () => {
    test('should return a <div>', () => {
      wrapper = shallow(<Block />)
      expect(wrapper.type()).toBe('div')
    })

    test('should render children', () => {
      wrapper = shallow(
				<Block>
					<p />
					<p />
				</Block>,
      )
      expect(wrapper.find('p')).toHaveLength(2)
    })
  })
})
