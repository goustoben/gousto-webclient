import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import { RecipeCard } from '../RecipeCard'
import { CTACard } from '../CTACard'

import css from './MobileRecipeList.css'

const MobileRecipeList = ({
  recipes, mobileGridView, showDetailRecipe, thematicName, isCurrentCollectionRecommendation, deliveryDate, collectionFilterChange
}) => {
  // eslint-disable-next-line react/prop-types
  const createRecipeCard = (value, index) => {
    return (
      <RecipeCard
        key={`${index}-${value.get('id')}`}
        recipe={value}
        index={index}
        mobileGridView={mobileGridView}
        showDetailRecipe={showDetailRecipe}
      />
    )
  }

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
  mobileGridView: PropTypes.bool,
  showDetailRecipe: PropTypes.func,
  recipes: PropTypes.instanceOf(Immutable.List).isRequired,
  isCurrentCollectionRecommendation: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  collectionFilterChange: PropTypes.func,
  thematicName: PropTypes.string,
  deliveryDate: PropTypes.string
}

export { MobileRecipeList }
