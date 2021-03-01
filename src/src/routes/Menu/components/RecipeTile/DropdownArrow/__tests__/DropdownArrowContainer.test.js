import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { DropdownArrowContainer } from '../DropdownArrowContainer'

jest.mock('actions/menu', () => ({
  recipeVariantDropdownExpanded: jest.fn(),
}))

describe('DropdownArrowContainer', () => {
  let wrapper
  const menuId = '321'
  const recipeId = '123'
  const variantRecipeId = '456'
  const recipe = Immutable.fromJS({
    id: recipeId,
  })
  const variantRecipe = Immutable.fromJS({
    id: variantRecipeId,
  })

  describe('when no variants', () => {
    beforeEach(() => {
      const props = {
        recipeId,
      }
      const state = {
        recipes: Immutable.fromJS({
          [recipeId]: recipe
        }),
        menu: Immutable.Map({
          currentExpandedRecipeVariantsDropdown: null,
          menuVariants: Immutable.fromJS({
            [menuId]: {}
          }),
        }),
        menuCollections: Immutable.fromJS({
          a12345: {}
        }),
        basket: Immutable.fromJS({
          currentMenuId: menuId,
        }),
        request: Immutable.fromJS({
          browser: 'mobile',
        }),
      }

      wrapper = shallow(<DropdownArrowContainer {...props} />, {
        context: {
          store: {
            getState: () => state,
            dispatch: () => {},
            subscribe: () => {}
          }
        }
      })
    })

    test('should set correct props', () => {
      expect(wrapper.props()).toEqual({
        browserType: 'mobile',
        categoryId: null,
        recipeId: '123',
        recipeVariantDropdownExpanded: expect.any(Function),
        recipeVariants: null,
        showDropdown: false,
        theme: 'blue'
      })
    })
  })

  describe('when recipe has variants', () => {
    beforeEach(() => {
      const props = {
        recipeId,
      }
      const state = {
        recipes: Immutable.fromJS({
          [recipeId]: recipe
        }),
        menu: Immutable.Map({
          currentExpandedRecipeVariantsDropdown: { recipeId },
          menuVariants: Immutable.fromJS({
            [menuId]: {
              [recipe.get('id')]: {
                alternatives: [
                  {
                    coreRecipeId: variantRecipe.get('id')
                  }
                ]
              }
            }
          }),
        }),
        menuCollections: Immutable.fromJS({
          a12345: {}
        }),
        basket: Immutable.fromJS({
          currentMenuId: menuId,
        }),
        request: Immutable.fromJS({
          browser: 'mobile',
        }),
      }

      wrapper = shallow(<DropdownArrowContainer {...props} />, {
        context: {
          store: {
            getState: () => state,
            dispatch: () => {},
            subscribe: () => {}
          }
        }
      })
    })

    test('should set correct props', () => {
      expect(wrapper.props()).toEqual({
        browserType: 'mobile',
        categoryId: null,
        recipeId: '123',
        recipeVariantDropdownExpanded: expect.any(Function),
        recipeVariants: Immutable.fromJS([{
          coreRecipeId: '456',
        }]),
        showDropdown: true,
        theme: 'blue'
      })
    })
  })
})
