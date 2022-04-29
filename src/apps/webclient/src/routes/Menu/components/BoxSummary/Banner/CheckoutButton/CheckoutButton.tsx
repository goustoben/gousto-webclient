import React, { useState, useCallback } from 'react'
import classNames from 'classnames'

import { useSelector, useDispatch } from 'react-redux'
import { Button, Join, Space } from '@gousto-internal/citrus-react'
import { actionTypes } from 'actions/actionTypes'
import config from 'config/basket'
import { basketSum, okRecipes } from 'utils/basket'
import { getBasketRecipes } from 'selectors/basket'
import { createGetActionTypeIsPending, createGetErrorForActionType } from 'selectors/status'
import { CheckoutCounter } from 'routes/Menu/components/BoxSummary/Banner/CheckoutCounter/CheckoutCounter'
import { getMenuRecipeIds, getStock } from 'selectors/root'
import { usePricing } from 'routes/Menu/domains/pricing'
import { useBasket } from 'routes/Menu/domains/basket'
import { checkoutBasket } from 'routes/Menu/actions/menuCheckoutClick'

import css from './CheckoutButton.css'

export const CheckoutButton = ({
  view,
  section,
  hideCounter = false,
  isFullWidth = false,
}: any) => {
  const checkoutPending = useSelector(createGetActionTypeIsPending(actionTypes.BASKET_CHECKOUT))
  const orderSaveError = useSelector(createGetErrorForActionType(actionTypes.ORDER_SAVE))

  const recipes = useSelector(getBasketRecipes)
  const menuRecipes = useSelector(getMenuRecipeIds)
  const stock = useSelector(getStock)

  const { numPortions } = useBasket()

  const numRecipes = basketSum(okRecipes(recipes, menuRecipes, stock, numPortions))

  const isDisabled = checkoutPending || numRecipes < config.minRecipesNum || orderSaveError !== null

  const { pricing } = usePricing()

  const dispatch = useDispatch()

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation()
      dispatch(checkoutBasket({ section, view, pricing }))
    },
    [dispatch, checkoutBasket, section, view, pricing],
  )

  // CheckoutCounter should change background color when the button is hovered.
  // While a css-only solution is possible in theory (`.button:hover
  // .counter`), we cannot refer to class names defined in other css module
  // files, or via CSS-in-JS.
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  return (
    <div
      className={classNames(css.buttonContainer, { [css.isFullWidth]: isFullWidth })}
      data-testing="boxSummaryButton"
      onMouseEnter={() => setIsButtonHovered(true)}
      onMouseLeave={() => setIsButtonHovered(false)}
    >
      <Button
        height={48}
        onClick={handleClick}
        disabled={isDisabled}
        width={isFullWidth ? '100%' : undefined}
      >
        <span className={css.checkoutLabel}>Checkout</span>
        {hideCounter ? null : (
          <CheckoutCounter
            isDisabled={isDisabled}
            isButtonHovered={isButtonHovered}
            numRecipes={numRecipes}
          />
        )}
      </Button>
    </div>
  )
}
