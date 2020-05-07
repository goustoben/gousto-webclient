import React from 'react'
import { mount } from 'enzyme'
import { DropdownRecipeList } from '../DropdownRecipeList'

describe('DropdownRecipeList', () => {
  describe('When there is an array of recipe variants', () => {
    describe('When there are recipe variants', () => {
      let wrapper
      beforeEach(() => {
        wrapper = mount(<DropdownRecipeList
          recipeVariants={[
            { id: '1230-1230', coreRecipeId: '1230', displayName: 'Variant One' },
            { id: '1234-1234', coreRecipeId: '1234', displayName: 'Variant Two' }
          ]}
          selectedRecipe={
            {
              displayName: 'Chicken curry',
              coreRecipeId: '6789'
            }
          }
        />)
      })
      test('then it should render the dropdown list', () => {
        expect(wrapper.find('.dropdownList')).toHaveLength(1)
      })

      test('then it should render an unordered list', () => {
        expect(wrapper.find('.dropdownListText')).toHaveLength(1)
      })

      test('then it should render three radio button inputs', () => {
        expect(wrapper.find('.listItem')).toHaveLength(3)
      })

      describe('When the user has not yet selected a variant', () => {
        test('then the default recipe should have a checked radio button', () => {
          expect(wrapper.find('input[value="6789"]').prop('checked')).toEqual(true)
        })

        test('then the variants should not have a checked radio button', () => {
          expect(wrapper.find('input[value="1230"]').prop('checked')).toEqual(false)
          expect(wrapper.find('input[value="1234"]').prop('checked')).toEqual(false)
        })
      })
    })
  })
})
