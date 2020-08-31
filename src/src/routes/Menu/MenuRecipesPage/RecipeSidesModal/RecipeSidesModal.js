import React from 'react'
import PropTypes from 'prop-types'
import ModalComponent, { ModalTitle, ModalContent, ModalFooter } from 'ModalComponent'
import { RecipeSidesModalButtonsContainer } from './RecipeSidesModalButtonsContainer'
import css from './RecipeSidesModal.css'
import { RecipeSidesModalVariantRecipeListContainer } from './RecipeSidesModalVariantRecipeListContainer'

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

      <RecipeSidesModalVariantRecipeListContainer sidesModalRecipeId={sidesModalRecipeId} />
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
