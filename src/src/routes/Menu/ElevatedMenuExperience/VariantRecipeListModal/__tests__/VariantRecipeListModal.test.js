import React from 'react'
import { shallow } from 'enzyme'
import { VariantRecipeListModal } from '../VariantRecipeListModal'
import { VariantRecipeListContainer } from '../../../Recipe/VariantRecipeList/VariantRecipeList'
import { VariantRecipeListModalContent } from '../VariantRecipeListModalContent'

describe('VariantRecipeListModal', () => {
  let wrapper
  let props
  const recipeVariantDropdownExpanded = jest.fn()
  const currentExpandedRecipeVariantsDropdown = {
    recipeId: '123',
    originalId: '456',
    categoryId: '789',
  }

  describe('when on desktop', () => {
    beforeEach(() => {
      props = {
        currentExpandedRecipeVariantsDropdown: null,
        recipeVariantDropdownExpanded,
        browserType: 'desktop',
      }
      wrapper = shallow(<VariantRecipeListModal {...props} />)
    })

    test('should render ModalComponent with right props', () => {
      expect(wrapper.type()).toEqual(null)
    })
  })

  describe('when on mobile', () => {
    describe('when no currentExpandedRecipeVariantsDropdown', () => {
      beforeEach(() => {
        props = {
          currentExpandedRecipeVariantsDropdown: null,
          recipeVariantDropdownExpanded,
          browserType: 'mobile',
        }
        wrapper = shallow(<VariantRecipeListModal {...props} />)
      })

      test('should render ModalComponent with right props', () => {
        expect(wrapper.find('ModalComponent').prop('visible')).toEqual(false)
        expect(wrapper.find('ModalComponent').prop('styleName')).toEqual('variantRecipeListModal')
      })

      test('should render variantRecipeListModalCloseX', () => {
        expect(wrapper.find('.variantRecipeListModalCloseX').exists()).toBe(true)
      })
    })

    describe('when has currentExpandedRecipeVariantsDropdown', () => {
      beforeEach(() => {
        props = {
          currentExpandedRecipeVariantsDropdown,
          recipeVariantDropdownExpanded,
          browserType: 'mobile',
        }
        wrapper = shallow(<VariantRecipeListModal {...props} />)
      })

      test('should render ModalComponent with right props', () => {
        expect(wrapper.find('ModalComponent').prop('visible')).toEqual(true)
        expect(wrapper.find('ModalComponent').prop('styleName')).toEqual('variantRecipeListModal')
      })

      test('should render VariantRecipeListModalContent with right props', () => {
        expect(wrapper.find(VariantRecipeListModalContent).props()).toEqual({ recipeId: '123', originalId: '456', categoryId: '789' })
      })
    })

    describe('when click on close button', () => {
      beforeEach(() => {
        props = {
          currentExpandedRecipeVariantsDropdown,
          recipeVariantDropdownExpanded,
          browserType: 'mobile',
        }
        wrapper = shallow(<VariantRecipeListModal {...props} />)
      })

      test('should call recipeVariantDropdownExpanded with null', () => {
        wrapper.find('.variantRecipeListModalCloseX').simulate('click')
        expect(recipeVariantDropdownExpanded).toHaveBeenCalledWith(null)
      })
    })
  })
})
