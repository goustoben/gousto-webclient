import React from 'react'
import PropTypes from 'prop-types'
import ModalComponent, { ModalTitle, ModalContent } from 'ModalComponent'
import css from './VariantRecipeListModal.css'
import { VariantRecipeListModalContent } from './VariantRecipeListModalContent'

export const VariantRecipeListModal = ({
  currentExpandedRecipeVariantsDropdown,
  recipeVariantDropdownExpanded,
  browserType
}) => {
  if (browserType !== 'mobile') {
    return null
  }

  const hideModal = () => {
    recipeVariantDropdownExpanded(null)
  }

  return (
    <div></div>
  )
}

VariantRecipeListModal.propTypes = {
  currentExpandedRecipeVariantsDropdown: PropTypes.shape({
    recipeId: PropTypes.string,
    originalId: PropTypes.string,
    categoryId: PropTypes.string,
  }),
  recipeVariantDropdownExpanded: PropTypes.func.isRequired,
  browserType: PropTypes.string.isRequired
}

VariantRecipeListModal.defaultProps = {
  currentExpandedRecipeVariantsDropdown: null
}
