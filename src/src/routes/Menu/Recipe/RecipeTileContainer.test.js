import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { RecipeTileContainer } from './RecipeTileContainer'

describe('<RecipeTileContainer />', () => {
  const recipeId = '123'

  const recipe = Immutable.fromJS({
    id: recipeId
  })

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
    })
  }

  const wrapperOptions = {
    context: {
      store: {
        getState: () => state,
        dispatch: () => {},
        subscribe: () => {},
      }
    }
  }

  const wrapper = shallow(
    <RecipeTileContainer recipeId={recipeId} />,
    wrapperOptions
  )

  test('should pass down correct props', () => {
    expect(wrapper.prop('recipe')).toEqual(recipe)
    expect(wrapper.prop('isOutOfStock')).toEqual(false)
    expect(wrapper.prop('showDetailRecipe')).toEqual(expect.any(Function))
  })
})
