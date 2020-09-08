import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { EMERecipeTileContainer } from '../RecipeTile/EMERecipeTile'
import { CategoryCarousel } from './CategoryCarousel'

describe('RecipeCategoriesCarousel', () => {
  const category = Immutable.fromJS({
    title: 'Categories',
  })
  const recipe1 = {
    originalId: '1',
    recipe: Immutable.Map({
      id: '1',
      availability: [],
      title: 'recipe1',
      boxType: 'vegetarian',
      dietType: 'Vegetarian',
      isRecommended: false,
    })
  }
  const recipe2 = {
    originalId: '2',
    recipe: Immutable.Map({
      id: '2',
      availability: [],
      title: 'recipe2',
      boxType: 'vegetarian',
      dietType: 'Vegetarian',
      isRecommended: false,
    })
  }
  const recipes1 = Immutable.List([recipe1])
  const recipes2 = Immutable.List([recipe1, recipe2])

  describe('when there are no recipes in category', () => {
    test('then it should render nothing', () => {
      const wrapper = shallow(
        <CategoryCarousel category={category} recipes={[]} />,
      )

      expect(wrapper.find(EMERecipeTileContainer)).toHaveLength(0)
    })
  })

  describe('when there is one recipe in category', () => {
    test('then it should render one EMERecipeTileContainer', () => {
      const wrapper = shallow(
        <CategoryCarousel category={category} recipes={recipes1} />,
      )

      expect(wrapper.find(EMERecipeTileContainer)).toHaveLength(1)
    })
  })

  describe('when there are multiple recipes', () => {
    test('then it should render multiple EMERecipeTileContainer', () => {
      const wrapper = shallow(
        <CategoryCarousel category={category} recipes={recipes2} />,
      )

      expect(wrapper.find(EMERecipeTileContainer)).toHaveLength(2)
    })
  })
})
