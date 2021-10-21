import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'

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

  const mockStore = configureMockStore()
  const store = mockStore({
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
    menu: Immutable.Map({
      menuVariants: Immutable.fromJS({
        375: {}
      })
    })
  })

  const wrapper = shallow(
    <RecipeTilePurchaseInfoContainer recipeId={recipeId} store={store} />
  )

  test('should pass down correct props', () => {
    expect(wrapper.find('RecipeTilePurchaseInfo').prop('isOutOfStock')).toEqual(false)
    expect(wrapper.find('RecipeTilePurchaseInfo').prop('surcharge')).toEqual(0.75)
    expect(wrapper.find('RecipeTilePurchaseInfo').prop('isFineDineIn')).toEqual(true)
  })
})
