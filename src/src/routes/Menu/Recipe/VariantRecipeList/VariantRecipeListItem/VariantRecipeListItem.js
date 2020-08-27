import React from 'react'
import { InputRadio, InputCheck } from 'goustouicomponents'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './VariantRecipeListItem.css'

const VariantRecipeListItem = ({
  recipeId,
  recipeName,
  changeCheckedRecipe,
  isChecked,
  isOnDetailScreen,
  isOnSidesModal,
  isOutOfStock,
  surcharge
}) => {
  const isOnDetailScreenOrSidesModal = isOnDetailScreen || isOnSidesModal

  const getInputContent = () => (
    <div className={classnames(isOutOfStock || surcharge ? css.labelContainerSplit : css.labelContainer, { [css.labelContainerSides]: isOnSidesModal })}>
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
  )

  return (
    <li
      className={
        classnames(
          { [css.listItem]: !isOnDetailScreenOrSidesModal },
          { [css.listItemWithBorder]: isOnDetailScreenOrSidesModal },
          { [css.listItemWithBlueBorder]: isChecked && isOnDetailScreenOrSidesModal}
        )
      }
    >
      {isOnSidesModal ? (
        <div className={css.inputSidesOuter}>
          <div className={css.inputSidesCheckOuter}>
            <InputCheck
              id={recipeId}
              name="variantList"
              onClick={() => changeCheckedRecipe(recipeId, isOutOfStock)}
              isChecked={isChecked}
            />
          </div>
          {getInputContent()}
        </div>
      ) : (
        <InputRadio
          id={recipeId}
          name="variantList"
          onChange={() => changeCheckedRecipe(recipeId, isOutOfStock)}
          isChecked={isChecked}
        >
          {getInputContent()}
        </InputRadio>

      )}
    </li>
  )
}

VariantRecipeListItem.propTypes = {
  recipeId: PropTypes.string.isRequired,
  recipeName: PropTypes.string.isRequired,
  changeCheckedRecipe: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  isOnDetailScreen: PropTypes.bool.isRequired,
  isOnSidesModal: PropTypes.bool.isRequired,
  isOutOfStock: PropTypes.bool.isRequired,
  surcharge: PropTypes.number
}

VariantRecipeListItem.defaultProps = {
  surcharge: null
}

export { VariantRecipeListItem }
