import React from 'react'

import { shallow } from 'enzyme'

import { RecipeRating } from 'routes/Menu/Recipe/Rating'

describe('<RecipeRating />', () => {
  let count
  let average
  beforeEach(() => {
    count = 1
    average = 2
  })

  test('should return a <span>', () => {
    const wrapper = shallow(<RecipeRating count={count} average={average} />)
    expect(wrapper.type()).toEqual('span')
  })
  test('should have two span children when the count prop is greater than 0', () => {
    const wrapper = shallow(<RecipeRating count={count} average={average} />)
    wrapper.children().forEach((node) => {
      expect(node.type()).toEqual('span')
    })
  })
  test('should render one <InfoBadge> when the count prop is 0', () => {
    count = 0
    const wrapper = shallow(<RecipeRating count={count} average={average} isNew />)
    expect(wrapper.find('InfoBadge').length).toEqual(1)
  })
  test('should have one child when the count prop is greater than 0 but the view is simple', () => {
    const wrapper = shallow(
      <RecipeRating count={count} average={average} view="simple" />,
    )
    expect(wrapper.children().type()).toEqual('span')
  })
  test('should not show the number of reviews when the view is simple', () => {
    const wrapper = shallow(
      <RecipeRating count={count} average={average} view="simple" />,
    )
    expect(wrapper.html().indexOf('reviews')).toEqual(-1)
  })
})
