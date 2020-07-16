import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { EMERecipeTileContainer } from './EMERecipeTileContainer'

describe('<EMERecipeTileContainer />', () => {
  const recipeId = '123'

  const recipe = Immutable.fromJS({
    id: recipeId,
    title: 'Chicken curry',
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
    }),
    request: Immutable.fromJS({
      browser: 'mobile'
    }),
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
    <EMERecipeTileContainer recipeId={recipeId} />,
    wrapperOptions
  )

  test('should pass down correct props', () => {
    expect(wrapper.prop('recipe')).toEqual(recipe)
    expect(wrapper.prop('isOutOfStock')).toEqual(false)
    expect(wrapper.prop('isMobile')).toEqual(true)
    expect(wrapper.prop('title')).toEqual('Chicken curry')
    expect(wrapper.prop('showDetailRecipe')).toEqual(expect.any(Function))
  })
})
