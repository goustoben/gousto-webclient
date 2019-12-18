import React from 'react'
import PropTypes from 'prop-types'
import menu from 'config/menu'
import { RecipeList } from '../RecipeList'
import DetailOverlay from '../DetailOverlay'

import css from '../Menu.css'

const RecipeGrid = ({ mobileGridView, showDetailRecipe, menuCurrentCollectionId, isClient, menuRecipeDetailShow }) => (
  <div
    className={css.menuContainer}
    data-testing="menuRecipesList"
  >
    <RecipeList
      mobileGridView={mobileGridView}
      showDetailRecipe={showDetailRecipe}
      menuCurrentCollectionId={menuCurrentCollectionId}
    />
    <p className={css.legal}>{menu.legal}</p>
    <DetailOverlay
      showOverlay={isClient}
      menuRecipeDetailShow={menuRecipeDetailShow}
    />
  </div>
)

RecipeGrid.propTypes = {
  mobileGridView: PropTypes.bool,
  showDetailRecipe: PropTypes.func,
  menuCurrentCollectionId: PropTypes.string,
  isClient: PropTypes.bool,
  menuRecipeDetailShow: PropTypes.string,
}

export { RecipeGrid }
