import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'
import ButtonsContainer from './ButtonsContainer'

describe('<ButtonsContainer />', () => {
  const menuId = '321'
  const recipeId1 = '123'
  const recipeId2 = '456'

  const recipe1 = Immutable.fromJS({
    id: recipeId1,
    title: 'Chicken curry',
    isNew: true,
    isFineDineIn: true,
  })
  const recipe2 = Immutable.fromJS({
    id: recipeId2,
    title: 'Fish',
    isNew: true,
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

  const defaultState = {
    recipes: Immutable.fromJS({
      [recipeId1]: recipe1,
      [recipeId2]: recipe2,
    }),
    basket: Immutable.fromJS({
      numPortions: 2,
      recipes: {},
      currentMenuId: menuId,
    }),
    menuRecipeStock: Immutable.fromJS({
      [recipeId1]: { 2: 1000, 4: 1000 }
    }),
    menuCollections: Immutable.fromJS({
      a12345: {}
    }),
    menu: Immutable.fromJS({
      menuVariants: Immutable.fromJS({
        [menuId]: {}
      }),
    }),
    auth: Immutable.Map({
      isAuthenticated: false,
      accessToken: '',
      refreshToken: '',
      expiresAt: ''
    }),
  }

  const mockStore = configureMockStore()
  const store = mockStore(defaultState)

  test('should pass down correct props', () => {
    const wrapper = shallow(
      <ButtonsContainer recipeId={recipeId1} store={store} />,
    )

    expect(wrapper.find('Buttons').prop('qty')).toEqual(0)
    expect(wrapper.find('Buttons').prop('numPortions')).toEqual(2)
    expect(wrapper.find('Buttons').prop('surchargePerPortion')).toEqual(null)
  })
})
