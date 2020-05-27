import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import { arrayToColumns } from '../arrayToColumns'
import { RecipeCardContainer } from '../RecipeCard'
import { CTACard } from '../CTACard'

import css from './DesktopRecipeList.css'

const DesktopRecipeList = ({
  recipes, thematicName, isCurrentCollectionRecommendation, deliveryDate
}) => {
  // eslint-disable-next-line react/prop-types
  const createRecipeCard = ({ index, value }) => (
    <RecipeCardContainer
      key={`${index}-${value.recipe.get('id')}`} // eslint-disable-line react/prop-types
      recipeId={value.recipe.get('id')} // eslint-disable-line react/prop-types
      originalId={value.originalId} // eslint-disable-line react/prop-types
      index={index}
    />
  )

  const recipeArr = recipes.toArray()

  const [left, middle, right] = arrayToColumns(recipeArr, 3, 0)

  return (
    <div className={css.desktopRecipeList}>
      <div className={css.recipeColumn}>
        {left.map(createRecipeCard)}
      </div>
      <div className={css.recipeColumn}>
        {middle.map(createRecipeCard)}

        <CTACard
          isCurrentCollectionRecommendation={isCurrentCollectionRecommendation}
          thematicName={thematicName}
          deliveryDate={deliveryDate}
        />
      </div>
      <div className={css.recipeColumn}>
        {right.map(createRecipeCard)}
      </div>
    </div>
  )
}

DesktopRecipeList.propTypes = {
  recipes: PropTypes.instanceOf(Immutable.List).isRequired,
  isCurrentCollectionRecommendation: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  thematicName: PropTypes.string,
  deliveryDate: PropTypes.string,
}

DesktopRecipeList.defaultProps = {
  thematicName: null,
  deliveryDate: null,
  isCurrentCollectionRecommendation: false,
}

export { DesktopRecipeList }
