import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import { arrayToColumns } from './utils/arrayToColumns'
import { RecipeCardContainer } from '../RecipeCard'
import { CTACard } from '../CTACard'

import css from './DesktopRecipeList.css'

const DesktopRecipeList = ({
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

  const featured = recipeArr.shift()
  const [right, left, middle] = arrayToColumns(recipeArr, 3, 1)

  return (
    <div className={css.desktopRecipeList}>
      <div className={css.mainColumnLeft}>
        <div className='featured'>
          <RecipeCardContainer
            recipe={featured}
            index={0}
            isFeatured
            mobileGridView={mobileGridView}
            showDetailRecipe={showDetailRecipe}
          />
        </div>

        <div className={css.containerBelowFeatured}>
          <div className={css.columnBelowFeatured}>{left.map(createRecipeCard)}</div>
          <div className={css.columnBelowFeatured}>
            {middle.map(createRecipeCard)}

            <CTACard
              thematicName={thematicName}
              isCurrentCollectionRecommendation={isCurrentCollectionRecommendation}
              deliveryDate={deliveryDate}
              collectionFilterChange={collectionFilterChange}
            />
          </div>
        </div>
      </div>
      <div className={css.mainColumnRight}>
        {right.map(createRecipeCard)}
      </div>
    </div>
  )
}

DesktopRecipeList.propTypes = {
  mobileGridView: PropTypes.bool.isRequired,
  showDetailRecipe: PropTypes.func.isRequired,
  recipes: PropTypes.instanceOf(Immutable.List).isRequired,
  isCurrentCollectionRecommendation: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  collectionFilterChange: PropTypes.func,
  thematicName: PropTypes.string,
  deliveryDate: PropTypes.string
}

DesktopRecipeList.defaultProps = {
  thematicName: null,
  deliveryDate: null,
  collectionFilterChange: () => {},
  isCurrentCollectionRecommendation: false
}

export { DesktopRecipeList }
