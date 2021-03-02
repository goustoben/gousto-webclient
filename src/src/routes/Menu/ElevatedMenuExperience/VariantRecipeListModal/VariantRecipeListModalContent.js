import React from 'react'
import PropTypes from 'prop-types'
import { VariantRecipeListContainer } from '../../Recipe/VariantRecipeList/VariantRecipeList'
import { DetailAddRecipe } from '../../Recipe/Detail/DetailAddRecipe/DetailAddRecipe'
import { isMandatoryBucket, SignpostingExperimentContext } from '../../context/uiSignpostingContext'

export const VariantRecipeListModalContent = ({ recipeId, originalId, categoryId, closeOnSelection = true }) => (
  <React.Fragment>
    <VariantRecipeListContainer
      recipeId={recipeId}
      originalId={originalId}
      categoryId={categoryId}
      closeOnSelection={closeOnSelection}
    />

    <SignpostingExperimentContext.Consumer>
      {bucket => isMandatoryBucket(bucket) && <DetailAddRecipe id={recipeId} buttonText="Add recipe" closeOnAdd />}
    </SignpostingExperimentContext.Consumer>
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
