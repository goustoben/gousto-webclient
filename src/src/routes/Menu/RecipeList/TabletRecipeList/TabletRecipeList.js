import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import { arrayToColumns } from '../arrayToColumns'
import { RecipeCardContainer } from '../RecipeCard'
import { CTACard } from '../CTACard'

import css from './TabletRecipeList.css'

const TabletRecipeList = ({
  recipes, thematicName, isCurrentCollectionRecommendation, deliveryDate, collectionFilterChange
}) => {
  // eslint-disable-next-line react/prop-types
  const createRecipeCard = ({ index, value }) => (
    <RecipeCardContainer
      key={`${index}-${value.get('id')}`} // eslint-disable-line react/prop-types
      recipeId={value.get('id')} // eslint-disable-line react/prop-types
      index={index}
    />
  )

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
  recipes: PropTypes.instanceOf(Immutable.List).isRequired,
  isCurrentCollectionRecommendation: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  collectionFilterChange: PropTypes.func,
  thematicName: PropTypes.string,
  deliveryDate: PropTypes.string,
}

TabletRecipeList.defaultProps = {
  thematicName: null,
  deliveryDate: null,
  collectionFilterChange: () => { },
  isCurrentCollectionRecommendation: false,
}

export { TabletRecipeList }
