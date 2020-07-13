import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { EMERecipeTile } from './EMERecipeTile'
import { TileImageContainer } from '../TileImage'

describe('EMERecipeTile', () => {
  describe('when given null recipe', () => {
    test('should return null', () => {
      const wrapper = shallow(<EMERecipeTile recipe={null} />)

      expect(wrapper.getElement()).toBe(null)
    })
  })

  describe('when given undefined recipe', () => {
    test('should return null', () => {
      const wrapper = shallow(<EMERecipeTile recipe={undefined} numPortions={2} index={0} />)

      expect(wrapper.getElement()).toBe(null)
    })
  })

  describe('when given a recipe', () => {
    global.innerWidth = 1200
    const showDetailRecipe = jest.fn()
    const index = 3
    const recipe = Immutable.fromJS({
      id: '1234',
      title: 'Bobs Brilliant Beef Burger',
      url: 'example.com/food',
      media: {
        images: []
      }
    })
    const wrapper = shallow(<EMERecipeTile recipe={recipe} recipeId={recipe.get('id')} index={index} numPortions={2} showDetailRecipe={showDetailRecipe} />)

    describe('when a recipe is in stock', () => {
      test('should return a <div>', () => {
        expect(wrapper.type()).toBe('div')
      })

      test('should contain one RecipeImageContainer component', () => {
        expect(wrapper.find(TileImageContainer).length).toEqual(1)
      })

      test('should contain one RecipeRatingContainer component', () => {
        expect(wrapper.find(TileImageContainer).length).toEqual(1)
      })

      test('should contain a title ', () => {
        expect(wrapper.find('h2').length).toEqual(1)
      })
    })
  })
})
