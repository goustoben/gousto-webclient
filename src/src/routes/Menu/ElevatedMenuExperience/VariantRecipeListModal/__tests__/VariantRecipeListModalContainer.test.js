import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { VariantRecipeListModalContainer } from '../VariantRecipeListModalContainer'

jest.mock('actions/menu', () => ({
  recipeVariantDropdownExpanded: jest.fn(),
}))

describe('VariantRecipeListModalContainer', () => {
  let wrapper

  describe('when no currentExpandedRecipeVariantsDropdown', () => {
    beforeEach(() => {
      const mockStore = configureMockStore()
      const store = mockStore({
        menu: Immutable.fromJS({
          currentExpandedRecipeVariantsDropdown: null,
        }),
        request: Immutable.fromJS({
          browser: 'mobile',
        }),
      })

      wrapper = shallow(<VariantRecipeListModalContainer store={store} />)
    })

    test('should set correct props', () => {
      expect(wrapper.find('VariantRecipeListModal').props()).toEqual(expect.objectContaining({
        browserType: 'mobile',
        currentExpandedRecipeVariantsDropdown: null,
        recipeVariantDropdownExpanded: expect.any(Function),
      })
      )
    })
  })

  describe('when recipe with sides has been added to menu', () => {
    const currentExpandedRecipeVariantsDropdown = {
      recipeId: '123',
      originalId: '456',
      categoryId: '789',
    }
    beforeEach(() => {
      const mockStore = configureMockStore()
      const store = mockStore({
        menu: Immutable.fromJS({
          currentExpandedRecipeVariantsDropdown,
        }),
        request: Immutable.fromJS({
          browser: 'mobile',
        }),
      })

      wrapper = shallow(<VariantRecipeListModalContainer store={store} />)
    })

    test('should set correct props', () => {
      expect(wrapper.find('VariantRecipeListModal').props()).toEqual(expect.objectContaining({
        browserType: 'mobile',
        currentExpandedRecipeVariantsDropdown: Immutable.fromJS(currentExpandedRecipeVariantsDropdown),
        recipeVariantDropdownExpanded: expect.any(Function),
      })
      )
    })
  })
})
