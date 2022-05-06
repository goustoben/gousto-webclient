import React from 'react'
import { mount } from 'enzyme'
import * as MenuHooks from 'routes/Menu/domains/menu'
import * as RecipeContext from '../../../../context/recipeContext'
import { VariantHeader } from '../VariantHeader'

describe('VariantHeader', () => {
  afterEach(() => jest.clearAllMocks())

  describe('When there are no alternatives', () => {
    test('then it should not render a header', () => {
      mockHooks({
        useGetAlternativeOptionsForRecipeLight: null,
        isRecipeOutOfStock: false,
        recipeId: 'recipe ID',
      })

      const wrapper = mount(<VariantHeader />)
      expect(wrapper.find('.variantHeader')).toHaveLength(0)
    })
  })

  describe('When a recipe has alternatives', () => {
    describe('When there is an array of recipe variants', () => {
      describe('When the array is empty', () => {
        test('then it should not render a header', () => {
          mockHooks({
            useGetAlternativeOptionsForRecipeLight: [],
            isRecipeOutOfStock: false,
            recipeId: 'recipe ID',
          })

          const wrapper = mount(<VariantHeader />)
          expect(wrapper.find('.variantHeader')).toHaveLength(0)
        })
      })

      describe('When the array contains only recipe itself without any alternatives', () => {
        test('then it should not render a header', () => {
          mockHooks({
            useGetAlternativeOptionsForRecipeLight: [
              { id: '1200-1200', coreRecipeId: '1200', displayName: 'Recipe' },
            ],
            isRecipeOutOfStock: false,
            recipeId: 'recipe ID',
          })

          const wrapper = mount(<VariantHeader />)
          expect(wrapper.find('.variantHeader')).toHaveLength(0)
        })
      })

      describe('When there are 3 recipe alternatives', () => {
        let wrapper

        beforeEach(() => {
          mockHooks({
            useGetAlternativeOptionsForRecipeLight: [
              { id: '1200-1200', coreRecipeId: '1200', displayName: 'Recipe' },
              { id: '1230-1230', coreRecipeId: '1230', displayName: 'Alternative One' },
              { id: '1234-1234', coreRecipeId: '1234', displayName: 'Alternative Two' },
            ],
            isRecipeOutOfStock: false,
            recipeId: 'recipe ID',
          })
          wrapper = mount(<VariantHeader />)
        })

        test('then it should render the correct number of recipe variants on the header', () => {
          expect(wrapper.find('.variantHeader').text()).toEqual('3 options available')
        })
      })

      describe('When there are 5 recipe alternatives', () => {
        test('then it should render the correct number of recipe variants on the header', () => {
          mockHooks({
            useGetAlternativeOptionsForRecipeLight: [
              { id: '1200-1200', coreRecipeId: '1200', displayName: 'Recipe' },
              { id: '1230-1230', coreRecipeId: '1230', displayName: 'Alternative One' },
              { id: '1234-1234', coreRecipeId: '1234', displayName: 'Alternative Two' },
              { id: '1235-1235', coreRecipeId: '1235', displayName: 'Alternative Three' },
              { id: '1236-1236', coreRecipeId: '1236', displayName: 'Alternative Four' },
              { id: '1237-1237', coreRecipeId: '1237', displayName: 'Alternative Five' },
            ],
            isRecipeOutOfStock: false,
            recipeId: 'recipe ID',
          })

          const wrapper = mount(<VariantHeader />)
          expect(wrapper.find('.variantHeader').text()).toEqual('6 options available')
        })
      })

      describe('When the recipe is out of stock', () => {
        test('then it should not render a header', () => {
          mockHooks({
            useGetAlternativeOptionsForRecipeLight: [
              { id: '1200-1200', coreRecipeId: '1200', displayName: 'Recipe' },
              { id: '1230-1230', coreRecipeId: '1230', displayName: 'Alternative One' },
              { id: '1234-1234', coreRecipeId: '1234', displayName: 'Alternative Two' },
            ],
            isRecipeOutOfStock: true,
            recipeId: 'recipe ID',
          })
          const wrapper = mount(<VariantHeader />)
          expect(wrapper.find('.variantHeader')).toHaveLength(0)
        })
      })
    })
  })
})

const mockHooks = ({
  useGetAlternativeOptionsForRecipeLight = [],
  isRecipeOutOfStock = false,
  recipeId,
} = {}) => {
  if (useGetAlternativeOptionsForRecipeLight !== undefined) {
    jest
      .spyOn(MenuHooks, 'useGetAlternativeOptionsForRecipeLight')
      .mockImplementation(() => () => useGetAlternativeOptionsForRecipeLight)
  }

  if (isRecipeOutOfStock !== undefined) {
    jest.spyOn(MenuHooks, 'useStock').mockImplementation(() => ({
      isRecipeOutOfStock: () => isRecipeOutOfStock,
    }))
  }

  if (recipeId !== undefined) {
    jest.spyOn(RecipeContext, 'useRecipeField').mockImplementation(() => recipeId)
  }
}
