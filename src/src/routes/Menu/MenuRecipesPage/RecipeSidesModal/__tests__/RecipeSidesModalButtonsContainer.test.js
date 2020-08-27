import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { RecipeSidesModalButtonsContainer } from '../RecipeSidesModalButtonsContainer'

describe('RecipeSidesModalButtonsContainer', () => {
  let wrapper
  const recipeId = '123'
  const recipe = Immutable.fromJS({
    id: '111',
    title: 'Chicken Curry',
    isNew: true,
    sides: [
      {
        coreRecipeId: '456',
      }
    ]
  })
  beforeEach(() => {
    const state = {
      recipes: Immutable.fromJS({
        [recipeId]: recipe
      }),
      menu: Immutable.Map({
        sidesModalRecipe: {
          recipeId,
        },
        selectedRecipeSides: {[recipeId]: 'mockSelectedRecipeSides'}
      }),
    }

    wrapper = shallow(<RecipeSidesModalButtonsContainer sidesModalRecipeId={recipeId} />, {
      context: {
        store: {
          getState: () => state,
          dispatch: () => {},
          subscribe: () => {}
        }
      }
    })
  })
  test('should pass down correct props', () => {
    expect(wrapper.find('RecipeSidesModalButtons').props()).toEqual({
      clearSidesModalRecipe: expect.any(Function),
      basketRecipeAdd: expect.any(Function),
      basketRecipeRemove: expect.any(Function),
      unselectRecipeSide: expect.any(Function),
      sidesModalRecipe: { recipeId },
      selectedRecipeSide: 'mockSelectedRecipeSides',
      sidesModalRecipeId: recipeId,
    })
  })
})
