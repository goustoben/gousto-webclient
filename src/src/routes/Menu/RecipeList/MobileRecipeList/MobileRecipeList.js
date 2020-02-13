import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import { RecipeCardContainer } from '../RecipeCard'
import { CTACard } from '../CTACard'

import css from './MobileRecipeList.css'

const MobileRecipeList = ({
  recipes, showDetailRecipe, thematicName, isCurrentCollectionRecommendation, deliveryDate, collectionFilterChange, isFoodBrandClickable
}) => {
  // eslint-disable-next-line react/prop-types
  const createRecipeCard = (value, index) => (
    <RecipeCardContainer
      key={`${index}-${value.get('id')}`}
      recipe={value}
      index={index}
      showDetailRecipe={showDetailRecipe}
      isFoodBrandClickable={isFoodBrandClickable}
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
  showDetailRecipe: PropTypes.func.isRequired,
  recipes: PropTypes.instanceOf(Immutable.List).isRequired,
  isCurrentCollectionRecommendation: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  collectionFilterChange: PropTypes.func,
  thematicName: PropTypes.string,
  deliveryDate: PropTypes.string,
  isFoodBrandClickable: PropTypes.bool
}

MobileRecipeList.defaultProps = {
  thematicName: null,
  deliveryDate: null,
  collectionFilterChange: () => {},
  isCurrentCollectionRecommendation: false,
  isFoodBrandClickable: true
}

export { MobileRecipeList }
