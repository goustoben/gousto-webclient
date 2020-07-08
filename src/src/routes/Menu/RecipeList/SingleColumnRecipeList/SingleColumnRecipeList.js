import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import { RecipeTileContainer } from '../../Recipe'
import { CTACard } from '../CTACard'

import css from './SingleColumnRecipeList.css'

const SingleColumnRecipeList = ({
  recipes, thematicName, isCurrentCollectionRecommendation, deliveryDate
}) => {
  // eslint-disable-next-line react/prop-types
  const createRecipeTile = (value, index) => (
    <RecipeTileContainer
      key={`${index}-${value.recipe.get('id')}`}
      originalId={value.originalId}
      recipeId={value.recipe.get('id')}
      index={index}
    />
  )

  return (
    <div className={css.singleColumnRecipeList}>
      {recipes.map(createRecipeTile)}

      <CTACard
        isCurrentCollectionRecommendation={isCurrentCollectionRecommendation}
        thematicName={thematicName}
        deliveryDate={deliveryDate}
      />
    </div>
  )
}

SingleColumnRecipeList.propTypes = {
  recipes: PropTypes.instanceOf(Immutable.List).isRequired,
  isCurrentCollectionRecommendation: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  thematicName: PropTypes.string,
  deliveryDate: PropTypes.string,
}

SingleColumnRecipeList.defaultProps = {
  thematicName: null,
  deliveryDate: null,
  isCurrentCollectionRecommendation: false,
}

export { SingleColumnRecipeList }
