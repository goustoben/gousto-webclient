import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import { arrayToColumns } from '../arrayToColumns'
import { RecipeTileContainer } from '../../Recipe'
import { CTACard } from '../CTACard'

import css from './ThreeColumnRecipeList.css'

const ThreeColumnRecipeList = ({
  recipes, thematicName, isCurrentCollectionRecommendation, deliveryDate
}) => {
  // eslint-disable-next-line react/prop-types
  const createRecipeTile = ({ index, value }) => (
    <RecipeTileContainer
      key={`${index}-${value.recipe.get('id')}`} // eslint-disable-line react/prop-types
      recipeId={value.recipe.get('id')} // eslint-disable-line react/prop-types
      originalId={value.originalId} // eslint-disable-line react/prop-types
      index={index}
    />
  )

  const recipeArr = recipes.toArray()

  const [left, middle, right] = arrayToColumns(recipeArr, 3, 0)

  return (
    <div className={css.threeColumnRecipeList}>
      <div className={css.recipeColumn}>
        {left.map(createRecipeTile)}
      </div>
      <div className={css.recipeColumn}>
        {middle.map(createRecipeTile)}

        <CTACard
          isCurrentCollectionRecommendation={isCurrentCollectionRecommendation}
          thematicName={thematicName}
          deliveryDate={deliveryDate}
        />
      </div>
      <div className={css.recipeColumn}>
        {right.map(createRecipeTile)}
      </div>
    </div>
  )
}

ThreeColumnRecipeList.propTypes = {
  recipes: PropTypes.instanceOf(Immutable.List).isRequired,
  isCurrentCollectionRecommendation: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  thematicName: PropTypes.string,
  deliveryDate: PropTypes.string,
}

ThreeColumnRecipeList.defaultProps = {
  thematicName: null,
  deliveryDate: null,
  isCurrentCollectionRecommendation: false,
}

export { ThreeColumnRecipeList }
