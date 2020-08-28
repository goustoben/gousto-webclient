import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

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
      selectedRecipeSides: {},
    }),
    auth: Immutable.Map({
      isAuthenticated: false,
      accessToken: '',
      refreshToken: '',
      expiresAt: ''
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

  let wrapper = shallow(
    <ButtonsContainer recipeId={recipeId1} />,
    wrapperOptions
  )

  test('should pass down correct props', () => {
    expect(wrapper.prop('qty')).toEqual(0)
    expect(wrapper.prop('numPortions')).toEqual(2)
    expect(wrapper.prop('surchargePerPortion')).toEqual(null)
    expect(wrapper.prop('recipeVariants')).toEqual(null)
    expect(wrapper.prop('selectedRecipeSide')).toEqual(null)
    expect(wrapper.prop('hasSides')).toEqual(false)
    expect(wrapper.prop('hasSideAddedToBasket')).toEqual(false)
    expect(wrapper.prop('firstSideRecipeId')).toEqual(null)
  })

  describe('when has sides', () => {
    beforeEach(() => {
      wrapperOptions.context.store.getState = () => ({
        ...defaultState,
        menu: Immutable.fromJS({
          menuVariants: Immutable.fromJS({
            [menuId]: {
              [recipeId2]: {
                sides: [
                  {
                    coreRecipeId: '1000'
                  }
                ]
              }
            }
          }),
          selectedRecipeSides: {},
        }),
        basket: Immutable.fromJS({
          numPortions: 2,
          currentMenuId: menuId,
          recipes: Immutable.Map([['1000', 1]]),
        }),

      })

      wrapper = shallow(
        <ButtonsContainer recipeId={recipeId2} />,
        wrapperOptions
      )
    })

    test('should pass down correct props', () => {
      expect(wrapper.prop('qty')).toEqual(1)
      expect(wrapper.prop('surchargePerPortion')).toEqual(0.75)
      expect(wrapper.prop('hasSides')).toEqual(true)
      expect(wrapper.prop('recipeVariants')).toEqual({
        type: 'sides',
        sides: Immutable.fromJS([
          { coreRecipeId: '1000' },
        ]),
        variantsList: Immutable.fromJS([
          { coreRecipeId: '1000' },
        ]),
      })
    })
  })
})
