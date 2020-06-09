import React from 'react'
import { InputRadio } from 'goustouicomponents'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './VariantRecipeListItem.css'

const VariantRecipeListItem = ({recipeId, recipeName, changeCheckedRecipe, isChecked, isOnDetailScreen, isOutOfStock}) => (
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
      onChange={() => changeCheckedRecipe(recipeId, isOutOfStock)}
      isChecked={isChecked}
    >
      <div className={isOutOfStock ? css.labelContainerOutOfStock : css.labelContainer}>
        <span>{recipeName}</span>
        {isOutOfStock && <span className={css.soldOutText}>Sold out</span>}
      </div>
    </InputRadio>
  </li>
)

VariantRecipeListItem.propTypes = {
  recipeId: PropTypes.string.isRequired,
  recipeName: PropTypes.string.isRequired,
  changeCheckedRecipe: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  isOnDetailScreen: PropTypes.bool.isRequired,
  isOutOfStock: PropTypes.bool.isRequired
}

export { VariantRecipeListItem }
