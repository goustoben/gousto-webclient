import React from 'react'

import sinon from 'sinon'

import { shallow } from 'enzyme'

import UseWithin from 'Recipe/UseWithin'

describe('<UseWithin />', () => {
  let useWithin
  beforeEach(() => {
    useWithin = 1
  })

  test('should return a <div>', () => {
    const wrapper = shallow(<UseWithin useWithin={useWithin} />)
    expect(wrapper.type()).toEqual('div')
  })

  test('should have two span children', () => {
    const wrapper = shallow(<UseWithin useWithin={useWithin} />)
    wrapper.children().forEach(function(node) {
      expect(node.type()).toEqual('span')
    })
  })

  test('should display the date correctly whent the start and end dates are within the same month', () => {
    const wrapper = shallow(<UseWithin useWithin={useWithin} />)
    expect(
      wrapper
        .children()
        .get(1)
        .props.children.join(''),
    ).toContain('Use within 1 days')
  })

  test('should display the date correctly with spaces around -', () => {
    const wrapper = shallow(<UseWithin useWithin="5-6" />)
    expect(wrapper.text()).toContain('Use within 5 - 6 days')
  })
})
