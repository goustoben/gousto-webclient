import React from 'react'

import sinon from 'sinon'

import { shallow } from 'enzyme'

import CookingTime from 'Recipe/CookingTime'

describe('<CookingTime />', () => {
  let time
  beforeEach(() => {
    time = 1
  })

  test('should return a <div>', () => {
    const wrapper = shallow(<CookingTime time={time} />)
    expect(wrapper.type()).toEqual('div')
  })
  test('should have two span children', () => {
    const wrapper = shallow(<CookingTime time={time} />)
    wrapper.children().forEach(function(node) {
      expect(node.type()).toEqual('span')
    })
  })
  test('should display the cooking time correctly', () => {
    const wrapper = shallow(<CookingTime time={time} />)
    expect(
      wrapper
        .children()
        .get(1)
        .props.children.join(''),
    ).toContain('Takes 1 mins')
  })
})
