import React from 'react'
import PropTypes from 'prop-types'
import { VariantRecipeListContainer } from '../../Recipe/VariantRecipeList/VariantRecipeList'
import { DetailAddRecipe } from '../../Recipe/Detail/DetailAddRecipe/DetailAddRecipe'
import { isMandatoryBucket, SignpostingExperimentContext } from '../../context/uiSignpostingContext'

export const VariantRecipeListModalContent = ({ recipeId, originalId, categoryId }) => (
  <React.Fragment>
    <VariantRecipeListContainer
      recipeId={recipeId}
      originalId={originalId}
      categoryId={categoryId}
    />

    <SignpostingExperimentContext.Consumer>
      {bucket => isMandatoryBucket(bucket) && <DetailAddRecipe id={recipeId} buttonText="Add recipe" />}
    </SignpostingExperimentContext.Consumer>
  </React.Fragment>
)

VariantRecipeListModalContent.propTypes = {
  recipeId: PropTypes.string.isRequired,
  originalId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired
}
