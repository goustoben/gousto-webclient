import React from 'react'

import sinon from 'sinon'

import { shallow } from 'enzyme'

import Rating from 'Recipe/Rating'
import InfoBadge from 'Recipe/InfoBadge'

describe('<Rating />', () => {
  let count
  let average
  beforeEach(() => {
    count = 1
    average = 2
  })

  test('should return a <span>', () => {
    const wrapper = shallow(<Rating count={count} average={average} />)
    expect(wrapper.type()).toEqual('span')
  })
  test('should have two span children when the count prop is greater than 0', () => {
    const wrapper = shallow(<Rating count={count} average={average} />)
    wrapper.children().forEach(function(node) {
      expect(node.type()).toEqual('span')
    })
  })
  test('should render one <InfoBadge> when the count prop is 0', () => {
    count = 0
    const wrapper = shallow(<Rating count={count} average={average} />)
    expect(wrapper.find('InfoBadge').length).toEqual(1)
  })
  test('should have one child when the count prop is greater than 0 but the view is simple', () => {
    const wrapper = shallow(
      <Rating count={count} average={average} view="simple" />,
    )
    expect(wrapper.children().type()).toEqual('span')
  })
  test('should not show the number of reviews when the view is simple', () => {
    const wrapper = shallow(
      <Rating count={count} average={average} view="simple" />,
    )
    expect(wrapper.html().indexOf('reviews')).toEqual(-1)
  })
})
