import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import { RecipeCardContainer } from '../RecipeCard'
import { CTACard } from '../CTACard'

import css from './MobileRecipeList.css'

const MobileRecipeList = ({
  recipes, thematicName, isCurrentCollectionRecommendation, deliveryDate
}) => {
  // eslint-disable-next-line react/prop-types
  const createRecipeCard = (value, index) => (
    <RecipeCardContainer
      key={`${index}-${value.recipe.get('id')}`}
      originalId={value.originalId}
      recipeId={value.recipe.get('id')}
      index={index}
    />
  )

  return (
    <div className={css.mobileRecipeList}>
      {recipes.map(createRecipeCard)}

      <CTACard
        isCurrentCollectionRecommendation={isCurrentCollectionRecommendation}
        thematicName={thematicName}
        deliveryDate={deliveryDate}
      />
    </div>
  )
}

MobileRecipeList.propTypes = {
  recipes: PropTypes.instanceOf(Immutable.List).isRequired,
  isCurrentCollectionRecommendation: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  thematicName: PropTypes.string,
  deliveryDate: PropTypes.string,
}

MobileRecipeList.defaultProps = {
  thematicName: null,
  deliveryDate: null,
  isCurrentCollectionRecommendation: false,
}

export { MobileRecipeList }
