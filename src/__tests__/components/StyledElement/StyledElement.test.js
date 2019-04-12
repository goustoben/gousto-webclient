import React from 'react'
import { shallow, mount, render } from 'enzyme'

import sinon from 'sinon'

import StyledElement from 'StyledElement'

describe('StyledElement', () => {
  let wrapper

  describe('rendering', () => {
    test('should return an alament matching "type"', () => {
      wrapper = shallow(<StyledElement type="div" />)
      expect(wrapper.type()).toBe('div')

      wrapper = shallow(<StyledElement type="aside" />)
      expect(wrapper.type()).toBe('aside')
    })

    test('should render children', () => {
      wrapper = shallow(
        <StyledElement type="div">
          <p />
          <p />
        </StyledElement>,
      )
      expect(wrapper.find('p')).toHaveLength(2)
    })
  })
})
