import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { AddRecipeButtonContainer } from './AddRecipeButtonContainer'

describe('<AddRecipeButtonContainer />', () => {
  const menuId = '321'
  const recipeId = '123'

  const recipe = Immutable.fromJS({
    id: recipeId,
    title: 'Chicken curry',
    isNew: true,
    isFineDineIn: true,
  })

  const defaultState = {
    recipes: Immutable.fromJS({
      [recipeId]: recipe
    }),
    basket: Immutable.fromJS({
      numPortions: 2,
      recipes: {},
      currentMenuId: menuId,
    }),
    menuRecipeStock: Immutable.fromJS({
      [recipeId]: { 2: 1000, 4: 1000 }
    }),
    menuCollections: Immutable.fromJS({
      a12345: {}
    }),
    menu: Immutable.fromJS({
      menuVariants: Immutable.fromJS({
        [menuId]: {}
      }),
    }),
  }

  const wrapperOptions = {
    context: {
      store: {
        getState: () => defaultState,
        dispatch: () => {},
        subscribe: () => {},
      }
    }
  }

  const wrapper = shallow(
    <AddRecipeButtonContainer recipeId={recipeId} />,
    wrapperOptions
  )

  test('should pass down correct props', () => {
    expect(wrapper.prop('isInBasket')).toEqual(false)
    expect(wrapper.prop('isBasketLimitReached')).toEqual(false)
    expect(wrapper.prop('buttonProps')).toEqual({buttonClassName: 'addButton', buttonText: 'Add recipe', lineClassName: 'addButtonLine'})
    expect(wrapper.prop('recipeVariants')).toEqual(null)
  })
})
