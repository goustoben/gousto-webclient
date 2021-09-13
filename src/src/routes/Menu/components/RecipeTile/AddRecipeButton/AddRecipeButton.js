import React from 'react'
import PropTypes from 'prop-types'
import css from './AddRecipeButton.css'

export const AddRecipeButton = ({
  basketRecipeAddAttempt,
  basketRecipeRemove,
  recipeVariantDropdownExpanded,
  recipeId,
  categoryId,
  originalId,
  isInBasket,
  isBasketLimitReached,
  buttonProps,
  recipeVariants,
  mandatoryVariantFeatureEnabled,
  hasBasketPostcode
}) => {
  const disabled = isBasketLimitReached && !isInBasket

  const hasAlternatives = recipeVariants && recipeVariants.type === 'alternatives'

  const buttonAction = (e) => {
    if (isInBasket) {
      basketRecipeRemove(recipeId)
    } else if (hasAlternatives && mandatoryVariantFeatureEnabled && hasBasketPostcode) {
      recipeVariantDropdownExpanded({ recipeId, originalId, categoryId })
    } else {
      basketRecipeAddAttempt(recipeId)
    }
    e.stopPropagation()
  }
  const buttonKeyPressAction = (e) => {
    e.stopPropagation()
    if (e.keyCode === 13) {
      buttonAction(e)
    }
  }

  return (
    <button
      className={css[buttonProps.buttonClassName]}
      type="button"
      disabled={disabled}
      onClick={buttonAction}
      onKeyPress={buttonKeyPressAction}
      data-testing={
        disabled ? 'menuRecipeAddDisabled' : 'menuRecipeAdd'
      }
      aria-label={buttonProps.buttonText}
    >
      <span className={css.buttonText}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line className={css[buttonProps.lineClassName]} y1="7" x2="14" y2="7" strokeWidth="2" />
          {!isInBasket && <line x1="7" y1="14" x2="7" stroke="white" strokeWidth="2" />}
        </svg>
        <span className={css.hideOnMobile}>
          {buttonProps.buttonText}
        </span>
      </span>
    </button>
  )
}
AddRecipeButton.propTypes = {
  recipeId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  originalId: PropTypes.string.isRequired,
  basketRecipeAddAttempt: PropTypes.func.isRequired,
  basketRecipeRemove: PropTypes.func.isRequired,
  recipeVariantDropdownExpanded: PropTypes.func.isRequired,
  isInBasket: PropTypes.bool.isRequired,
  hasBasketPostcode: PropTypes.bool.isRequired,
  isBasketLimitReached: PropTypes.bool.isRequired,
  buttonProps: PropTypes.shape({
    buttonClassName: PropTypes.string,
    lineClassName: PropTypes.string,
    buttonText: PropTypes.string,
  }).isRequired,
  recipeVariants: PropTypes.shape({
    type: PropTypes.string,
    alternatives: PropTypes.arrayOf(PropTypes.shape),
    sides: PropTypes.arrayOf(PropTypes.shape),
  }),
  mandatoryVariantFeatureEnabled: PropTypes.bool,
}

AddRecipeButton.defaultProps = {
  recipeVariants: null,
  mandatoryVariantFeatureEnabled: false
}
