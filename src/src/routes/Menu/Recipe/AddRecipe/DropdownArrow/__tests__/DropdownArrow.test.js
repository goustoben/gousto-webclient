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
      test('then it should render the dropdown arrow', () => {
        const wrapper = mount(<DropdownArrow recipeVariants={[
          { id: '1230-1230', coreRecipeId: '1230', displayName: 'Variant One' },
          { id: '1234-1234', coreRecipeId: '1234', displayName: 'Variant Two' }
        ]}
        />)
        expect(wrapper.find('.arrowContainer')).toHaveLength(1)
      })

      describe('When clicking on arrow with no currentExpandedRecipeVariantsDropdown', () => {
        test('then it should call recipeVariantDropdownExpanded with current recipe', () => {
          const recipeVariantDropdownExpanded = jest.fn()
          const recipeId = '123'
          const originalId = '456'
          const categoryId = '789'
          const wrapper = mount(<DropdownArrow
            recipeId={recipeId}
            originalId={originalId}
            categoryId={categoryId}
            recipeVariants={[
              { id: '1230-1230', coreRecipeId: '1230', displayName: 'Variant One' },
              { id: '1234-1234', coreRecipeId: '1234', displayName: 'Variant Two' }
            ]}
            recipeVariantDropdownExpanded={recipeVariantDropdownExpanded}
          />)

          wrapper.find('.arrowContainer').simulate('click')
          expect(recipeVariantDropdownExpanded).toHaveBeenCalledWith({ recipeId, originalId, categoryId })
        })
      })

      describe('When clicking on arrow with currentExpandedRecipeVariantsDropdown', () => {
        test('then it should call recipeVariantDropdownExpanded with current recipe', () => {
          const recipeVariantDropdownExpanded = jest.fn()
          const recipeId = '123'
          const originalId = '456'
          const categoryId = '789'
          const wrapper = shallow(<DropdownArrow
            recipeId={recipeId}
            originalId={originalId}
            categoryId={categoryId}
            recipeVariants={[
              { id: '1230-1230', coreRecipeId: '1230', displayName: 'Variant One' },
              { id: '1234-1234', coreRecipeId: '1234', displayName: 'Variant Two' }
            ]}
            recipeVariantDropdownExpanded={recipeVariantDropdownExpanded}
            showDropdown
          />)

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

  describe('When the dropdown is in carousel', () => {
    describe('when not in carousel', () => {
      test('should find .carouselDropdownListContainer', () => {
        const wrapper = shallow(<DropdownArrow
          recipeVariants={[
            { id: '1230-1230', coreRecipeId: '1230', displayName: 'Variant One' },
            { id: '1234-1234', coreRecipeId: '1234', displayName: 'Variant Two' }
          ]}
          recipeVariantDropdownExpanded={jest.fn()}
          showDropdown
        />)
        expect(wrapper.find('.dropdownListContainer')).toHaveLength(1)
      })
    })

    describe('when in carousel', () => {
      test('should find .carouselDropdownListContainer', () => {
        const wrapper = shallow(<DropdownArrow
          recipeVariants={[
            { id: '1230-1230', coreRecipeId: '1230', displayName: 'Variant One' },
            { id: '1234-1234', coreRecipeId: '1234', displayName: 'Variant Two' }
          ]}
          recipeVariantDropdownExpanded={jest.fn()}
          isInCarousel
          showDropdown
        />)
        expect(wrapper.find('.carouselDropdownListContainer')).toHaveLength(1)
      })
    })
  })
})
