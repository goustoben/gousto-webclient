import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import css from './SeeMenuSection.css'

import OrderRecipe from '../../../../AccountComponents/OrderRecipe'

const SeeMenuSection = ({ recipes, boxType }) => {
  let slicedRecipes = recipes
  if (boxType === 'vegetarian') {
    slicedRecipes = recipes.filter(recipe => recipe.get('dietType') === 'vegetarian')
  }
  slicedRecipes = slicedRecipes.slice(0, 6)
  const recipeSection = slicedRecipes.map((recipe) =>
    <OrderRecipe recipeTitle={recipe.get('title')} recipeImage={recipe.getIn(['media', 'images', 0, 'urls', 1, 'src'])} />
  )

  return (
    <div className={css.container}>
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
