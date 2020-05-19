import React from 'react'
import { InputRadio } from 'goustouicomponents'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './VariantRecipeListItem.css'

const VariantRecipeListItem = ({recipeId, recipeName, changeCheckedRecipe, isChecked, isOnDetailScreen, outOfStock}) => (
  <li
    className={
      classnames(
        { [css.listItem]: !isOnDetailScreen },
        { [css.listItemWithBorder]: isOnDetailScreen },
        { [css.listItemWithBlueBorder]: isChecked && isOnDetailScreen}
      )
    }
  >
    <InputRadio
      id={recipeId}
      name="variantList"
      value={recipeId}
      onChange={changeCheckedRecipe}
      isChecked={isChecked}
    >
      <span>{recipeName}</span>
      {outOfStock && <span className={css.soldOutText}>Sold out</span>}
    </InputRadio>
  </li>
)

VariantRecipeListItem.propTypes = {
  recipeId: PropTypes.string.isRequired,
  recipeName: PropTypes.string.isRequired,
  changeCheckedRecipe: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  isOnDetailScreen: PropTypes.bool.isRequired,
  outOfStock: PropTypes.bool.isRequired
}

export { VariantRecipeListItem }
