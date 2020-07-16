import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { CookingTimeIconContainer } from './CookingTimeIconContainer'

describe('<CookingTimeIconContainer />', () => {
  const recipeId = '123'
  const recipe = Immutable.fromJS({
    id: recipeId,
    title: 'Chicken curry',
    cookingTime: 30,
    cookingTimeFamily: 40,
  })

  describe('when numPortions is 2', () => {
    const state = {
      recipes: Immutable.fromJS({
        [recipeId]: recipe
      }),
      basket: Immutable.fromJS({
        numPortions: 2,
        recipes: {},
      }),
      menuRecipeStock: Immutable.fromJS({
        [recipeId]: { 2: 1000, 4: 1000 }
      }),
      request: Immutable.fromJS({
        browser: 'mobile'
      }),
    }

    const wrapperOptions = {
      context: {
        store: {
          getState: () => state,
          dispatch: () => { },
          subscribe: () => { },
        }
      }
    }

    const wrapper = shallow(
      <CookingTimeIconContainer recipeId={recipeId} />,
      wrapperOptions
    )

    test('should pass down correct props using cookingTime', () => {
      expect(wrapper.prop('cookingTime')).toEqual(30)
    })
  })

  describe('when numPortions is 4', () => {
    const state = {
      recipes: Immutable.fromJS({
        [recipeId]: recipe
      }),
      basket: Immutable.fromJS({
        numPortions: 4,
        recipes: {},
      }),
      menuRecipeStock: Immutable.fromJS({
        [recipeId]: { 2: 1000, 4: 1000 }
      }),
      request: Immutable.fromJS({
        browser: 'mobile'
      }),
    }

    const wrapperOptions = {
      context: {
        store: {
          getState: () => state,
          dispatch: () => { },
          subscribe: () => { },
        }
      }
    }

    const wrapper = shallow(
      <CookingTimeIconContainer recipeId={recipeId} />,
      wrapperOptions
    )

    test('should pass down correct props using cookingTimeFamily', () => {
      expect(wrapper.prop('cookingTime')).toEqual(40)
    })
  })
})
