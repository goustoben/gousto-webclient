import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import Recipe from 'containers/menu/Recipe'
import { RecipeCard } from '../RecipeCard/RecipeCard'

describe('RecipeCard', () => {
  describe('when given null recipe', () => {
    test('should return null', () => {
      const wrapper = shallow(<RecipeCard recipe={null} />)

      expect(wrapper.getElement()).toBe(null)
    })
  })

  describe('when given undefined recipe', () => {
    test('should return null', () => {
      const wrapper = shallow(<RecipeCard recipe={undefined} numPortions={2} index={0} />)

      expect(wrapper.getElement()).toBe(null)
    })
  })

  describe('when given a recipe', () => {
    global.innerWidth = 1200
    const index = 3
    const recipe = Immutable.fromJS({
      id: '1234',
      title: 'Bobs Brilliant Beef Burger',
      url: 'example.com/food',
      isFineDineIn: true,
      media: {
        images: []
      }
    })
    const wrapper = shallow(<RecipeCard recipe={recipe} recipeId={recipe.get('id')} index={index} numPortions={2} />)

    test('should render a Recipe with the correct id', () => {
      expect(wrapper.find(Recipe).prop('id')).toEqual('1234')
    })

    test('should render a Recipe with the correct position', () => {
      expect(wrapper.find(Recipe).prop('position')).toEqual(3)
    })

    test('should render a Recipe with the correct url', () => {
      expect(wrapper.find(Recipe).prop('url')).toEqual('example.com/food')
    })

    test('should render a Recipe with view fine-dine-in', () => {
      expect(wrapper.find(Recipe).prop('view')).toEqual('fineDineIn')
    })
  })

  describe('when given a chef prepared meal', () => {
    const index = 3
    const recipe = Immutable.fromJS({
      id: '1234',
      title: 'Bobs Brilliant Beef Burger',
      url: 'example.com/food',
      chefPrepared: true,
      isFineDineIn: false
    })
    const wrapper = shallow(<RecipeCard recipe={recipe} index={index} numPortions={2} />)
    test('should render a Recipe with the correct view', () => {
      expect(wrapper.find(Recipe).prop('view')).toEqual('chefPrepared')
    })
  })
})
