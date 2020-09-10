import React from 'react'
import { mount } from 'enzyme'
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
        const wrapper = mount(<DropdownArrow recipeVariants={[]} />)
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
