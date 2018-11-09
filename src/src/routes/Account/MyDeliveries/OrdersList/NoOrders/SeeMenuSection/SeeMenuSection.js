import React, { PropTypes } from 'react'
import Immutable from 'immutable' // eslint-disable no-caps
import css from './SeeMenuSection.css'

import OrderRecipe from '../../../../AccountComponents/OrderRecipe'

const SeeMenuSection = ({ recipes, boxType }) => {
  let slicedRecipes = recipes
  if (boxType === 'vegetarian') {
    slicedRecipes = recipes.filter(recipe => recipe.get('dietType') === 'vegetarian')
  }
  slicedRecipes = slicedRecipes.slice(0, 5)
  const recipeSection = slicedRecipes.map((recipe) =>
		<OrderRecipe recipeTitle={recipe.get('title')} recipeImage={recipe.getIn(['media', 'images', 0, 'urls', 1, 'src'])} />
  )

  return (
		<div className={css.horizontalScrollWrapper}>
			{recipeSection}
		</div>
  )
}

SeeMenuSection.propTypes = {
  recipes: PropTypes.instanceOf(Immutable.Map),
  boxType: PropTypes.string,
}
SeeMenuSection.defaultProps = {
  recipes: Immutable.Map({}),
  boxType: '',
}

export default SeeMenuSection
