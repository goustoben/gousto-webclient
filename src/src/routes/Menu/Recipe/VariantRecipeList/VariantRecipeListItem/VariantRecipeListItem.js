import React from 'react'
import { InputRadio } from 'goustouicomponents'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './VariantRecipeListItem.css'

const VariantRecipeListItem = ({recipeId, recipeName, changeCheckedRecipe, isChecked, isOnDetailScreen, isOutOfStock, surcharge}) => (
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
      <div className={isOutOfStock || surcharge ? css.labelContainerSplit : css.labelContainer}>
        <span>{recipeName}</span>
        {surcharge && !isOutOfStock ? (
          <div className={
            classnames(css.extraInformation,
              { [css.negativeMargin]: isOnDetailScreen }
            )
          }
          >
            <span className={css.surchargeAmountText}>
              +£
              {surcharge}
            </span>
            <span className={css.perServingText}>per serving</span>
          </div>
        ) : null}
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
  isOutOfStock: PropTypes.bool.isRequired,
  surcharge: PropTypes.number
}

VariantRecipeListItem.defaultProps = {
  surcharge: null
}

export { VariantRecipeListItem }
