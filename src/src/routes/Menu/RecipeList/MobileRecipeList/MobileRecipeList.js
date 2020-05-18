import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import { RecipeCardContainer } from '../RecipeCard'
import { CTACard } from '../CTACard'

import css from './MobileRecipeList.css'

const MobileRecipeList = ({
  recipes, thematicName, isCurrentCollectionRecommendation, deliveryDate, collectionFilterChange
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
        thematicName={thematicName}
        isCurrentCollectionRecommendation={isCurrentCollectionRecommendation}
        deliveryDate={deliveryDate}
        collectionFilterChange={collectionFilterChange}
      />
    </div>
  )
}

MobileRecipeList.propTypes = {
  recipes: PropTypes.instanceOf(Immutable.List).isRequired,
  isCurrentCollectionRecommendation: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  collectionFilterChange: PropTypes.func,
  thematicName: PropTypes.string,
  deliveryDate: PropTypes.string,
}

MobileRecipeList.defaultProps = {
  thematicName: null,
  deliveryDate: null,
  collectionFilterChange: () => {},
  isCurrentCollectionRecommendation: false,
}

export { MobileRecipeList }
