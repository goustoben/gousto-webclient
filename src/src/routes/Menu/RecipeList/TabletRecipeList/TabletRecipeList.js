import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import { arrayToColumns } from '../arrayToColumns'
import { RecipeCardContainer } from '../RecipeCard'
import { CTACard } from '../CTACard'

import css from './TabletRecipeList.css'

const TabletRecipeList = ({
  recipes, mobileGridView, showDetailRecipe, thematicName, isCurrentCollectionRecommendation, deliveryDate, collectionFilterChange
}) => {
  // eslint-disable-next-line react/prop-types
  const createRecipeCard = ({ index, value }) => {
    return (
      <RecipeCardContainer
        key={`${index}-${value.get('id')}`}
        recipe={value}
        index={index}
        mobileGridView={mobileGridView}
        showDetailRecipe={showDetailRecipe}
      />
    )
  }

  const recipeArr = recipes.toArray()

  const [left, middle, right] = arrayToColumns(recipeArr, 3, 0)

  return (
    <div className={css.tabletRecipeList}>
      <div className={css.recipeColumn}>
        {left.map(createRecipeCard)}
      </div>
      <div className={css.recipeColumn}>
        {middle.map(createRecipeCard)}

        <CTACard
          thematicName={thematicName}
          isCurrentCollectionRecommendation={isCurrentCollectionRecommendation}
          deliveryDate={deliveryDate}
          collectionFilterChange={collectionFilterChange}
        />
      </div>
      <div className={css.recipeColumn}>
        {right.map(createRecipeCard)}
      </div>
    </div>
  )
}

TabletRecipeList.propTypes = {
  mobileGridView: PropTypes.bool.isRequired,
  showDetailRecipe: PropTypes.func.isRequired,
  recipes: PropTypes.instanceOf(Immutable.List).isRequired,
  isCurrentCollectionRecommendation: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  collectionFilterChange: PropTypes.func,
  thematicName: PropTypes.string,
  deliveryDate: PropTypes.string
}

TabletRecipeList.defaultProps = {
  thematicName: null,
  deliveryDate: null,
  collectionFilterChange: () => { },
  isCurrentCollectionRecommendation: false
}

export { TabletRecipeList }
