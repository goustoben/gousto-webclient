import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { EMERecipeTileContainer } from '../RecipeTile/EMERecipeTile'
import { EMERecipeList } from './EMERecipeList'

describe('EMERecipeList', () => {
  describe('when there are no recipes', () => {
    test('then it should render nothing', () => {
      const wrapper = shallow(
        <EMERecipeList recipes={[]} />,
      )

      expect(wrapper.find(EMERecipeTileContainer)).toHaveLength(0)
    })
  })

  describe('when there is one recipe', () => {
    test('then it should render one EMERecipeTileContainer', () => {
      const wrapper = shallow(
        <EMERecipeList recipes={Immutable.List([
          {
            originalId: '3',
            recipe: Immutable.Map({
              id: '3',
              availability: [],
              title: 'recipe3',
              boxType: 'vegetarian',
              dietType: 'Vegetarian',
              isRecommended: false,
            })
          }
        ])}
        />,
      )

      expect(wrapper.find(EMERecipeTileContainer)).toHaveLength(1)
    })
  })

  describe('when there are multiple recipes', () => {
    test('then it should render multiple EMERecipeTileContainer', () => {
      const wrapper = shallow(
        <EMERecipeList recipes={Immutable.List([
          {
            originalId: '3',
            recipe: Immutable.Map({
              id: '3',
              availability: [],
              title: 'recipe3',
              boxType: 'vegetarian',
              dietType: 'Vegetarian',
              isRecommended: false,
            })
          },
          {
            originalId: '1',
            recipe: Immutable.Map({
              id: '1',
              availability: [],
              title: 'recipe1',
              isRecommended: false })
          }
        ])}
        />,
      )

      expect(wrapper.find(EMERecipeTileContainer)).toHaveLength(2)
    })
  })
})
