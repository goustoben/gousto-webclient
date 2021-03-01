import React from 'react'
import Immutable from 'immutable'
import { mount, shallow } from 'enzyme'
import { DropdownArrow } from '../DropdownArrow'

describe('DropdownArrow', () => {
  describe('When there are no recipe variants', () => {
    test('then it should not render a dropdown selection', () => {
      const wrapper = mount(<DropdownArrow recipeVariants={null} />)
      expect(wrapper.find('.arrowContainer')).toHaveLength(0)
    })
  })

  describe('When there is an array of recipe variants', () => {
    describe('When the array is empty', () => {
      test('then it should not render a dropdown selection', () => {
        const wrapper = mount(<DropdownArrow recipeVariants={Immutable.List()} />)
        expect(wrapper.find('.arrowContainer')).toHaveLength(0)
      })
    })

    describe('When there are recipe variants', () => {
      const recipeId = '123'
      const originalId = '456'
      const categoryId = '789'
      let recipeVariantDropdownExpanded
      let wrapper

      beforeEach(() => {
        recipeVariantDropdownExpanded = jest.fn()

        wrapper = shallow(<DropdownArrow
          recipeId={recipeId}
          originalId={originalId}
          categoryId={categoryId}
          recipeVariants={[
            { id: '1230-1230', coreRecipeId: '1230', displayName: 'Variant One' },
            { id: '1234-1234', coreRecipeId: '1234', displayName: 'Variant Two' }
          ]}
          recipeVariantDropdownExpanded={recipeVariantDropdownExpanded}
        />)
      })

      test('then it should render the dropdown arrow', () => {
        expect(wrapper.find('.arrowContainer')).toHaveLength(1)
      })

      describe('When theme is blue', () => {
        beforeEach(() => {
          wrapper.setProps({ theme: 'blue' })
        })

        test('then it should have class themeBlue', () => {
          expect(wrapper.find('.arrowContainer').hasClass('themeBlue')).toBe(true)
        })

        test('then it should not have class themeGrey', () => {
          expect(wrapper.find('.arrowContainer').hasClass('themeGrey')).toBe(false)
        })
      })

      describe('When theme is grey', () => {
        beforeEach(() => {
          wrapper.setProps({ theme: 'grey' })
        })

        test('then it should have class themeGrey', () => {
          expect(wrapper.find('.arrowContainer').hasClass('themeGrey')).toBe(true)
        })

        test('then it should not have class themeBlue', () => {
          expect(wrapper.find('.arrowContainer').hasClass('themeBlue')).toBe(false)
        })
      })

      describe('When theme is not set', () => {
        beforeEach(() => {
          wrapper.setProps({ theme: undefined })
        })

        test('then it should have class themeBlue', () => {
          expect(wrapper.find('.arrowContainer').hasClass('themeBlue')).toBe(true)
        })

        test('then it should not have class themeGrey', () => {
          expect(wrapper.find('.arrowContainer').hasClass('themeGrey')).toBe(false)
        })
      })

      describe('When showDropdown is false', () => {
        beforeEach(() => {
          wrapper.setProps({ showDropdown: false })
        })

        test('then it should call recipeVariantDropdownExpanded with current recipe', () => {
          wrapper.find('.arrowContainer').simulate('click', { stopPropagation: jest.fn() })
          expect(recipeVariantDropdownExpanded).toHaveBeenCalledWith({ recipeId, originalId, categoryId })
        })
      })

      describe('When showDropdown is true', () => {
        beforeEach(() => {
          wrapper.setProps({ showDropdown: true })
        })

        test('then it should call recipeVariantDropdownExpanded with null', () => {
          wrapper.find('.arrowContainer').simulate('click', { stopPropagation: jest.fn() })
          expect(recipeVariantDropdownExpanded).toHaveBeenCalledWith(null)
        })
      })
    })
  })

  describe('When the dropdown is clicked', () => {
    const stopPropagation = jest.fn()

    beforeAll(() => {
      const wrapper = mount(<DropdownArrow
        recipeVariants={[
          { id: '1230-1230', coreRecipeId: '1230', displayName: 'Variant One' },
          { id: '1234-1234', coreRecipeId: '1234', displayName: 'Variant Two' }
        ]}
        recipeVariantDropdownExpanded={jest.fn()}
      />)

      wrapper.find('.arrowContainer').simulate('click', { stopPropagation })
    })

    test('should prevent event propagtion', () => {
      expect(stopPropagation).toHaveBeenCalled()
    })
  })
})
