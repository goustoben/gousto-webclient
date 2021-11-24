import React from 'react'
import PropTypes from 'prop-types'
import ModalComponent, { ModalTitle, ModalContent } from 'ModalComponent'
import css from './VariantRecipeListModal.css'
import { VariantRecipeListModalContent } from './VariantRecipeListModalContent'

export const VariantRecipeListDesktopModal = ({
  currentExpandedRecipeVariantsDropdown,
  recipeVariantDropdownExpanded,
  browserType
}) => {
  if (browserType === 'mobile') {
    return null
  }
  const hideModal = () => {
    recipeVariantDropdownExpanded(null)
  }

  return (
    <div>

    </div>
  )
}
VariantRecipeListDesktopModal.propTypes = {
  currentExpandedRecipeVariantsDropdown: PropTypes.shape({
    recipeId: PropTypes.string,
    originalId: PropTypes.string,
    categoryId: PropTypes.string,
  }),
  recipeVariantDropdownExpanded: PropTypes.func.isRequired,
  browserType: PropTypes.string.isRequired
}

VariantRecipeListDesktopModal.defaultProps = {
  currentExpandedRecipeVariantsDropdown: null
}
