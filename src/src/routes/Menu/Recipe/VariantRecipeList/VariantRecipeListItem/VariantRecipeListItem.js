import React from 'react'
import { InputRadio } from 'goustouicomponents'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './VariantRecipeListItem.css'

const VariantRecipeListItem = ({
  recipeId,
  recipeName,
  changeCheckedRecipe,
  isChecked,
  isOnDetailScreen,
  isOutOfStock,
  surcharge
}) => {
  const getInputContent = () => (
    <div className={css.labelContainer}>
      <div className={css.titleContainer}>
        <span className={css.titleText}>{recipeName}</span>
      </div>
      {
        (surcharge && !isOutOfStock)
        && (
          <div className={
            classnames(
              css.extraInformation,
              { [css.negativeMargin]: isOnDetailScreen }
            )
          }
          >
            <span className={css.surchargeAmountText}>{`+£${surcharge.toFixed(2)}`}</span>
            <span className={css.perServingText}>per serving</span>
          </div>
        )
      }
      {isOutOfStock && <span className={css.soldOutText}>Sold out</span>}
    </div>
  )

  return (
    <li
      className={
        classnames(
          css.listItem,
          { [css.listItemChecked]: isChecked }
        )
      }
    >
      <InputRadio
        id={recipeId}
        name="variantList"
        onChange={() => changeCheckedRecipe(recipeId, isOutOfStock)}
        isChecked={isChecked}
      >
        {getInputContent()}
      </InputRadio>
    </li>
  )
}

VariantRecipeListItem.propTypes = {
  recipeId: PropTypes.string.isRequired,
  recipeName: PropTypes.string.isRequired,
  changeCheckedRecipe: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  isOnDetailScreen: PropTypes.bool.isRequired,
  isOutOfStock: PropTypes.bool.isRequired,
  surcharge: PropTypes.number,
  allergenInfo: PropTypes.shape({
    containsGlutenOrDairy: PropTypes.bool
  }).isRequired
}

VariantRecipeListItem.defaultProps = {
  surcharge: null,
}

export { VariantRecipeListItem }
