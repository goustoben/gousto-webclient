import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import { arrayToColumns } from '../arrayToColumns'
import { RecipeCardContainer } from '../RecipeCard'
import { CTACard } from '../CTACard'

import css from './DesktopRecipeList.css'

const DesktopRecipeList = ({
  recipes, showDetailRecipe, thematicName, isCurrentCollectionRecommendation, deliveryDate, collectionFilterChange
}) => {
  // eslint-disable-next-line react/prop-types
  const createRecipeCard = ({ index, value }) => (
    <RecipeCardContainer
      key={`${index}-${value.get('id')}`} // eslint-disable-line react/prop-types
      recipe={value}
      index={index}
      showDetailRecipe={showDetailRecipe}
    />
  )

  const recipeArr = recipes.toArray()

  const [right, left, middle] = arrayToColumns(recipeArr, 3, 1)

  return (
    <div className={css.desktopRecipeList}>
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

DesktopRecipeList.propTypes = {
  showDetailRecipe: PropTypes.func.isRequired,
  recipes: PropTypes.instanceOf(Immutable.List).isRequired,
  isCurrentCollectionRecommendation: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  collectionFilterChange: PropTypes.func,
  thematicName: PropTypes.string,
  deliveryDate: PropTypes.string,
}

DesktopRecipeList.defaultProps = {
  thematicName: null,
  deliveryDate: null,
  collectionFilterChange: () => { },
  isCurrentCollectionRecommendation: false,
}

export { DesktopRecipeList }
