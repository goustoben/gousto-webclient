import React from 'react'
import PropTypes from 'prop-types'
import { VariantRecipeListContainer } from '../../Recipe/VariantRecipeList/VariantRecipeList'
import { DetailAddRecipe } from '../../Recipe/Detail/DetailAddRecipe/DetailAddRecipe'

export const VariantRecipeListModalContent = ({ recipeId, originalId, categoryId, closeOnSelection = true }) => (
  <React.Fragment>
    <VariantRecipeListContainer
      recipeId={recipeId}
      originalId={originalId}
      categoryId={categoryId}
      closeOnSelection={closeOnSelection}
    />

    <DetailAddRecipe id={recipeId} buttonText="Add recipe" closeOnAdd />
  </React.Fragment>
)

VariantRecipeListModalContent.propTypes = {
  recipeId: PropTypes.string.isRequired,
  originalId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  closeOnSelection: PropTypes.bool
}

VariantRecipeListModalContent.defaultProps = {
  closeOnSelection: true
}
