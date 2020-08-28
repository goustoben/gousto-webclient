import React from 'react'
import PropTypes from 'prop-types'
import ModalComponent, { ModalTitle, ModalContent, ModalFooter } from 'ModalComponent'
import { VariantRecipeListContainer } from '../../Recipe/VariantRecipeList/VariantRecipeList'
import { RecipeSidesModalButtonsContainer } from './RecipeSidesModalButtonsContainer'
import css from './RecipeSidesModal.css'

export const RecipeSidesModal = ({
  recipeTitle,
  sidesModalRecipeId,
  shouldShow,
  clearSidesModalRecipe,
}) => (
  <ModalComponent visible={shouldShow} styleName={css.recipeSidesModal}>
    <ModalTitle className={css.recipeSidesModalTitleWrapper}>
      <h1 className={css.recipeSidesModalTitle}>
        Do you want to add a side to your
        {' '}
        {recipeTitle}
        ?
      </h1>
      <button type="button" className={css.recipeSidesModalCloseX} onClick={clearSidesModalRecipe} />
    </ModalTitle>
    <ModalContent className={css.recipeSidesModalContent}>
      <div className={css.addASideLabel}>Add a side</div>

      <VariantRecipeListContainer
        originalId={sidesModalRecipeId}
        recipeId={sidesModalRecipeId}
        variantsType="sides"
        isOnSidesModal
      />
    </ModalContent>
    <ModalFooter className={css.recipeSidesModalFooter}>
      <RecipeSidesModalButtonsContainer sidesModalRecipeId={sidesModalRecipeId} />
    </ModalFooter>
  </ModalComponent>
)

RecipeSidesModal.propTypes = {
  recipeTitle: PropTypes.string.isRequired,
  sidesModalRecipeId: PropTypes.string,
  shouldShow: PropTypes.bool.isRequired,
  clearSidesModalRecipe: PropTypes.func.isRequired,
}

RecipeSidesModal.defaultProps = {
  sidesModalRecipeId: null,
}
