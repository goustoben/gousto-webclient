import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { VariantRecipeListModalContainer } from '../VariantRecipeListModalContainer'

jest.mock('actions/menu', () => ({
  recipeVariantDropdownExpanded: jest.fn(),
}))

describe('VariantRecipeListModalContainer', () => {
  let wrapper

  describe('when no currentExpandedRecipeVariantsDropdown', () => {
    beforeEach(() => {
      const state = {
        menu: Immutable.fromJS({
          currentExpandedRecipeVariantsDropdown: null,
        }),
        request: Immutable.fromJS({
          browser: 'mobile',
        }),
      }

      wrapper = shallow(<VariantRecipeListModalContainer />, {
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
        currentExpandedRecipeVariantsDropdown: null,
        recipeVariantDropdownExpanded: expect.any(Function),
      })
    })
  })

  describe('when recipe with sides has been added to menu', () => {
    const currentExpandedRecipeVariantsDropdown = {
      recipeId: '123',
      originalId: '456',
      categoryId: '789',
    }
    beforeEach(() => {
      const state = {
        menu: Immutable.fromJS({
          currentExpandedRecipeVariantsDropdown,
        }),
        request: Immutable.fromJS({
          browser: 'mobile',
        }),
      }

      wrapper = shallow(<VariantRecipeListModalContainer />, {
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
        currentExpandedRecipeVariantsDropdown: Immutable.fromJS(currentExpandedRecipeVariantsDropdown),
        recipeVariantDropdownExpanded: expect.any(Function),
      })
    })
  })
})
