import React from 'react'
import { mount } from 'enzyme'
import * as MenuHooks from 'routes/Menu/domains/menu'
import * as RecipeTileHooks from 'routes/Menu/components/RecipeTile/Hooks'
import { VariantHeader } from '../VariantHeader'

describe('VariantHeader', () => {
  afterEach(() => jest.clearAllMocks())

  describe('When there are no alternatives', () => {
    test('then it should not render a header', () => {
      mockHooks({
        useGetAlternativeOptionsForRecipeLight: null,
        useIfRecipeIdIsOutOfStock: false,
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
            useIfRecipeIdIsOutOfStock: false,
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
            useIfRecipeIdIsOutOfStock: false,
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
              { id: '1234-1234', coreRecipeId: '1234', displayName: 'Alternative Two' }
            ],
            useIfRecipeIdIsOutOfStock: false,
          })
          wrapper = mount(<VariantHeader />)
        })

        test('then it should render the correct number of recipe variants on the header', () => {
          expect(wrapper.find('.variantHeader').text()).toEqual('3 options available')
        })

        describe('when textOverride is provided', () => {
          const override = 'Swap for Lean Beef'

          beforeEach(() => {
            // Use one of the hardcoded recipe IDs
            wrapper = mount(<VariantHeader recipeId="527" />)
          })

          test('then it should render the text', () => {
            expect(wrapper.find('.variantHeader').text()).toEqual(override)
          })
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
            useIfRecipeIdIsOutOfStock: false,
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
            useIfRecipeIdIsOutOfStock: true,
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
  useIfRecipeIdIsOutOfStock = false,
} = {}) => {
  if (useGetAlternativeOptionsForRecipeLight !== undefined) {
    jest.spyOn(MenuHooks, 'useGetAlternativeOptionsForRecipeLight')
      .mockImplementation(() => () => useGetAlternativeOptionsForRecipeLight)
  }

  if (useIfRecipeIdIsOutOfStock !== undefined) {
    jest.spyOn(RecipeTileHooks, 'useIfRecipeIdIsOutOfStock')
      .mockImplementation(() => useIfRecipeIdIsOutOfStock)
  }
}
