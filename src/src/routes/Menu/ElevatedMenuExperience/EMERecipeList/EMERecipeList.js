import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import css from './EMERecipeList.css'
import { EMERecipeTileContainer } from '../RecipeTile/EMERecipeTile'

const EMERecipeList = ({recipes}) => (
  <div>
    <div className={css.emeRecipeList}>
      {recipes.map((value) =>
        <EMERecipeTileContainer key={value.recipe.get('id')} recipeId={value.recipe.get('id')} />
      )}
    </div>
  </div>
)

EMERecipeList.propTypes = {
  recipes: PropTypes.instanceOf(Immutable.List()).isRequired
}

export { EMERecipeList }
