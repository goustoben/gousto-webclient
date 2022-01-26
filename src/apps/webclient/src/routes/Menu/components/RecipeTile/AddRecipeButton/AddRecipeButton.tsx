import React, { SyntheticEvent } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { useBasket } from 'routes/Menu/domains/basket'
import { menuBrowseCTAVisibilityChange } from 'actions/menu'
import { useShouldShowPaintedDoorButton } from 'components/FiveRecipesPaintedDoorTest/useShouldShowPaintedDoorButton'
import { FiveRecipesAddRecipeButton } from 'components/FiveRecipesPaintedDoorTest/FiveRecipesAddRecipeButton'
import { getRecipeButtonProps } from './recipeButtonPropsSelector'
import css from './AddRecipeButton.css'

export const AddRecipeButton: React.FC<{ recipeId: string }> = ({ recipeId }) => {
  const dispatch = useDispatch()
  const { canAddRecipes, addRecipe, removeRecipe, limitReached, isRecipeInBasket } = useBasket()

  const isInBasket = isRecipeInBasket(recipeId)
  const disabled = limitReached && !isInBasket

  const buttonProps = getRecipeButtonProps(isInBasket)

  const fiveRecipesEnabled = useShouldShowPaintedDoorButton(recipeId)

  const buttonAction: React.EventHandler<SyntheticEvent<unknown>> = (e) => {
    e.stopPropagation()

    if (!canAddRecipes) {
      dispatch(menuBrowseCTAVisibilityChange(true))

      return
    }

    if (isInBasket) {
      removeRecipe(recipeId)
    } else {
      addRecipe(recipeId)
    }
  }

  const buttonKeyPressAction: React.KeyboardEventHandler = (e) => {
    e.stopPropagation()

    if (e.keyCode === 13) {
      buttonAction(e)
    }
  }

  if (fiveRecipesEnabled) return <FiveRecipesAddRecipeButton />

  return (
    <button
      className={css[buttonProps.buttonClassName]}
      name="addRecipeButton"
      type="button"
      disabled={disabled}
      onClick={buttonAction}
      onKeyPress={buttonKeyPressAction}
      data-testing={disabled ? 'menuRecipeAddDisabled' : 'menuRecipeAdd'}
      aria-label={buttonProps.buttonText}
    >
      <span className={css.buttonText}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line className={css[buttonProps.lineClassName]} y1="7" x2="14" y2="7" strokeWidth="2" />
          {!isInBasket && <line x1="7" y1="14" x2="7" stroke="white" strokeWidth="2" />}
        </svg>
        <span className={css.hideOnMobile}>{buttonProps.buttonText}</span>
      </span>
    </button>
  )
}

AddRecipeButton.propTypes = {
  recipeId: PropTypes.string.isRequired,
}
