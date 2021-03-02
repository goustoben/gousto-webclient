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
    <ModalComponent
      visible={!!currentExpandedRecipeVariantsDropdown}
      from="top"
      onClose={hideModal}
      overlayContentClassName={css.variantRecipeListOverlayContent}
    >
      <ModalTitle className={css.variantRecipeListModalTitleWrapper}>
        <h1 className={css.variantRecipeListModalTitle}>Options available</h1>
        <button type="button" className={css.variantRecipeListModalCloseX} onClick={hideModal} />
      </ModalTitle>
      <ModalContent className={css.variantRecipeListModalContent}>
        {
          currentExpandedRecipeVariantsDropdown
          && (
            <VariantRecipeListModalContent
              originalId={currentExpandedRecipeVariantsDropdown.originalId}
              recipeId={currentExpandedRecipeVariantsDropdown.recipeId}
              categoryId={currentExpandedRecipeVariantsDropdown.categoryId}
              closeOnSelection={false}
            />
          )
        }
      </ModalContent>
    </ModalComponent>
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
