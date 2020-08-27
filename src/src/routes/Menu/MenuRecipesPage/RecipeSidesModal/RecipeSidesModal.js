import React from 'react'
import PropTypes from 'prop-types'
import ModalComponent, { ModalTitle, ModalContent, ModalFooter } from 'ModalComponent'
import { Button } from 'goustouicomponents'
import { VariantRecipeListContainer } from '../../Recipe/VariantRecipeList/VariantRecipeList'
import css from './RecipeSidesModal.css'

export const RecipeSidesModal = ({
  recipeTitle,
  sidesModalRecipeId,
  shouldShow,
  clearSidesModalRecipeId,
  addSide,
  addNoSide,
}) => (
  <ModalComponent visible={shouldShow} styleName={css.recipeSidesModal}>
    <ModalTitle className={css.recipeSidesModalTitleWrapper}>
      <h1 className={css.recipeSidesModalTitle}>
        Do you want to add a side to your
        {' '}
        {recipeTitle}
        ?
      </h1>
      <button type="button" className={css.recipeSidesModalCloseX} onClick={clearSidesModalRecipeId} />
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
      <Button className={css.recipeSidesModalNoSideButton} color="secondary" onClick={addNoSide}>I don&apos;t want a side</Button>
      <Button className={css.recipeSidesModalAddSideButton} color="primary" onClick={addSide}>Add side</Button>
    </ModalFooter>
  </ModalComponent>
)

RecipeSidesModal.propTypes = {
  recipeTitle: PropTypes.string.isRequired,
  sidesModalRecipeId: PropTypes.string.isRequired,
  shouldShow: PropTypes.bool.isRequired,
  clearSidesModalRecipeId: PropTypes.func.isRequired,
  addSide: PropTypes.func,
  addNoSide: PropTypes.func,
}

RecipeSidesModal.defaultProps = {
  addSide: null,
  addNoSide: null,
}
