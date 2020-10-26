import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { RecipeTilePurchaseInfoContainer } from './RecipeTilePurchaseInfoContainer'

describe('<RecipeTilePurchaseInfoContainer />', () => {
  const recipeId = '123'

  const recipe = Immutable.fromJS({
    id: recipeId,
    isOutOfStock: false,
    isFineDineIn: true,
    meals: [
      {
        numPortions: 2,
        surcharge: {
          listPrice: 1.49
        }
      }
    ]
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
    menuCollections: Immutable.fromJS({
      a12345: {}
    }),
    menu: Immutable.fromJS({
      menuVariants: Immutable.fromJS({
        375: {}
      }),
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
    <RecipeTilePurchaseInfoContainer recipeId={recipeId} />,
    wrapperOptions
  )

  test('should pass down correct props', () => {
    expect(wrapper.prop('isOutOfStock')).toEqual(false)
    expect(wrapper.prop('surcharge')).toEqual(0.75)
    expect(wrapper.prop('isFineDineIn')).toEqual(true)
  })
})
