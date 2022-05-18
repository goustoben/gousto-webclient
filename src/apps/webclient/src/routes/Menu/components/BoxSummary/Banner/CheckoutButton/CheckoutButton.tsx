import React, { useState, useCallback } from 'react'
import classNames from 'classnames'

import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@gousto-internal/citrus-react'
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

type Props = {
  view: string
  section: string
  hideCounter?: boolean
  isFullWidth?: boolean
}

const useCheckoutButtonIsPending = () => {
  const orderSaveError = useSelector(createGetErrorForActionType(actionTypes.ORDER_SAVE))

  const { isPending: pricingPending } = usePricing()

  const checkoutPending = useSelector(createGetActionTypeIsPending(actionTypes.BASKET_CHECKOUT))
  const basketPreviewOrderChangePending = useSelector(
    createGetActionTypeIsPending('BASKET_PREVIEW_ORDER_CHANGE'),
  )
  const orderSavePending = useSelector(createGetActionTypeIsPending('ORDER_SAVE'))
  const loadingOrderPending = useSelector(createGetActionTypeIsPending(actionTypes.LOADING_ORDER))
  const menuFetchData = useSelector(createGetActionTypeIsPending(actionTypes.MENU_FETCH_DATA))

  const isPending =
    (checkoutPending ||
      pricingPending ||
      basketPreviewOrderChangePending ||
      orderSavePending ||
      loadingOrderPending ||
      menuFetchData) &&
    orderSaveError === null

  return isPending
}

export const CheckoutButton = ({
  view,
  section,
  hideCounter = false,
  isFullWidth = false,
}: Props) => {
  const checkoutPending = useSelector(createGetActionTypeIsPending(actionTypes.BASKET_CHECKOUT))
  const orderSaveError = useSelector(createGetErrorForActionType(actionTypes.ORDER_SAVE))

  const recipes = useSelector(getBasketRecipes)
  const menuRecipes = useSelector(getMenuRecipeIds)
  const stock = useSelector(getStock)

  const { numPortions } = useBasket()

  const numRecipes = basketSum(okRecipes(recipes, menuRecipes, stock, numPortions))

  const isPending = useCheckoutButtonIsPending()
  const isDisabled = isPending || numRecipes < config.minRecipesNum || orderSaveError !== null

  const { pricing } = usePricing()

  const dispatch = useDispatch()

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation()
      dispatch(checkoutBasket({ section, view, pricing }))
    },
    [dispatch, section, view, pricing],
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
