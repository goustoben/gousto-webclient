import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { RecipeSidesModalContainer } from '../RecipeSidesModalContainer'

describe('RecipeSidesModalContainer', () => {
  let wrapper
  const recipeId = '123'
  const recipe = Immutable.fromJS({
    id: recipeId,
    title: 'Chicken Curry',
    isNew: true,
    isFineDineIn: true,
    sides: [
      {
        coreRecipeId: '456',
      }
    ]
  })

  describe('when recipe with sides has not been added to menu', () => {
    beforeEach(() => {
      const state = {
        recipes: Immutable.fromJS({
          [recipeId]: recipe
        }),
        menu: Immutable.fromJS({
          sidesModalRecipe: {
            recipeId: '123',
          },
          selectedRecipeSides: {}
        }),
      }

      wrapper = shallow(<RecipeSidesModalContainer />, {
        context: {
          store: {
            getState: () => state,
            dispatch: () => {},
            subscribe: () => {}
          }
        }
      })
    })

    test('should set shouldShow to false', () => {
      expect(wrapper.find('RecipeSidesModal').props()).toEqual({
        clearSidesModalRecipe: expect.any(Function),
        recipeTitle: null,
        shouldShow: false,
        sidesModalRecipeId: null,
        selectedRecipeSide: null
      })
    })
  })

  describe('when recipe with sides has been added to menu', () => {
    beforeEach(() => {
      const state = {
        recipes: Immutable.fromJS({
          [recipeId]: recipe
        }),
        menu: Immutable.Map({
          sidesModalRecipe: {
            recipeId: '123'
          },
          selectedRecipeSides: {}
        }),
      }

      wrapper = shallow(<RecipeSidesModalContainer />, {
        context: {
          store: {
            getState: () => state,
            dispatch: () => {},
            subscribe: () => {}
          }
        }
      })
    })

    test('should set shouldShow to true', () => {
      expect(wrapper.find('RecipeSidesModal').props()).toEqual({
        clearSidesModalRecipe: expect.any(Function),
        recipeTitle: 'Chicken Curry',
        shouldShow: true,
        sidesModalRecipeId: '123',
        selectedRecipeSide: null
      })
    })
  })
})
