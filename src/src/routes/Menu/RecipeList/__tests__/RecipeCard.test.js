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
      const wrapper = shallow(<RecipeCard recipe={undefined} />)

      expect(wrapper.getElement()).toBe(null)
    })
  })

  describe('when given a recipe', () => {
    const index = 3
    const recipe = Immutable.fromJS({
      id: '1234',
      title: 'Bobs Brilliant Beef Burger',
      url: 'example.com/food'
    })
    const wrapper = shallow(<RecipeCard recipe={recipe} index={index} />)

    test('should render a Recipe with the correct id', () => {
      expect(wrapper.find(Recipe).prop('id')).toEqual('1234')
    })

    test('should render a Recipe with the correct position', () => {
      expect(wrapper.find(Recipe).prop('position')).toEqual(3)
    })

    test('should render a Recipe with the correct title', () => {
      expect(wrapper.find(Recipe).prop('title')).toEqual('Bobs Brilliant Beef Burger')
    })

    test('should render a Recipe with the correct url', () => {
      expect(wrapper.find(Recipe).prop('url')).toEqual('example.com/food')
    })
  })
})
