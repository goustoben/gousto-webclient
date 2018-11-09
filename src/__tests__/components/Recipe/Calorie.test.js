import React from 'react'

import sinon from 'sinon'

import { shallow } from 'enzyme'

import Cals from 'Recipe/Cals'

describe('<Cals />', () => {
  let cals
  beforeEach(() => {
    cals = 123
  })

  test('should return a <div>', () => {
    const wrapper = shallow(<Cals cals={cals} />)
    expect(wrapper.type()).toEqual('div')
  })
  test('should have two span children', () => {
    const wrapper = shallow(<Cals cals={cals} />)
    wrapper.children().forEach(node => {
      expect(node.type()).toEqual('span')
    })
  })
  test('should display the calorie count correctly', () => {
    const wrapper = shallow(<Cals cals={cals} />)
    expect(
      wrapper
        .children()
        .get(1)
        .props.children.join(''),
    ).toContain('123 cals / serving')
  })
  test('should round the calorie count down correctly', () => {
    const wrapper = shallow(<Cals cals={123.123} />)
    expect(
      wrapper
        .children()
        .get(1)
        .props.children.join(''),
    ).toContain('123 cals / serving')
  })
  test('should round the calorie count up correctly', () => {
    const wrapper = shallow(<Cals cals={123.56} />)
    expect(
      wrapper
        .children()
        .get(1)
        .props.children.join(''),
    ).toContain('124 cals / serving')
  })
})
