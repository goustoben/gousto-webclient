import React from 'react'
import PropTypes from 'prop-types'
import { Item } from 'goustouicomponents'
import routes from 'config/routes'
import { windowOpen } from 'utils/window'
import { List } from '../../components/List'
import { recipePropType } from '../../getHelpPropTypes'
import css from './RecipeLinks.css'

const propTypes = {
  trackRecipeCardClick: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired,
  recipes: PropTypes.arrayOf(recipePropType).isRequired,
  userId: PropTypes.string.isRequired,
}

const handleClick = (orderId, recipeId, userId, trackRecipeCardClick) => {
  trackRecipeCardClick(recipeId)
  window.sessionStorage.setItem('orderId', orderId)
  window.sessionStorage.setItem('userId', userId)
  const isNewTab = false
  windowOpen(`${routes.client.cookbookRecipeById}/${recipeId}`, isNewTab)
}

function RecipeLinks({ orderId, recipes, trackRecipeCardClick, userId }) {
  const recipeList = recipes.map(recipe => (
    <div key={recipe.id} className={css.recipeRow} data-testing="getHelpRecipe">
      <div>
        <img alt={recipe.title} src={recipe.imageUrl} className={css.recipeImage} />
      </div>
      <div className={css.recipeItem}>
        <Item
          label={recipe.title}
          isLinkStyled={false}
          onClick={() => handleClick(orderId, recipe.id, userId, trackRecipeCardClick)}
        />
      </div>
    </div>
  ))

  return (
    <List>
      {recipeList}
    </List>
  )
}

RecipeLinks.propTypes = propTypes

export { RecipeLinks }
