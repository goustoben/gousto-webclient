import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import { Item } from 'goustouicomponents'
import routes from 'config/routes'
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
  browserHistory.push(`${routes.client.cookbookRecipeById}/${recipeId}`)
}

function RecipeLinks({ orderId, recipes, trackRecipeCardClick, userId }) {
  const recipeList = recipes.map(recipe => (
    <div key={recipe.id} className={css.recipeRow} data-testing="getHelpRecipe">
      <img alt={recipe.title} src={recipe.imageUrl} className={css.recipeImage} />
      <Item
        label={recipe.title}
        isLinkStyled={false}
        onClick={() => handleClick(orderId, recipe.id, userId, trackRecipeCardClick)}
      />
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
