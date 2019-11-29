import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { basketSum, okRecipes } from 'utils/basket'
import config from 'config/basket'
import css from './Checkout.css'
import { BaseBannerButton } from '../BaseBannerButton'

const formatRecipes = (recipes) => (
  recipes.reduce((recipesArray, qty, recipeId) => {
    for (let i = 1; i <= qty; i++) {
      recipesArray.push(recipeId)
    }

    return recipesArray
  }, [])
)

const getOrderAction = (userOrders, orderId) => {
  const userOrder = userOrders.find(order => order.get('id') === orderId)
  const recipeAction = (userOrder && userOrder.get('recipeItems').size > 0) ? 'update' : 'choice'
  const orderAction = orderId ? `recipe-${recipeAction}` : 'create'

  return orderAction
}

const Checkout = (props) => {
  const { view, recipes, menuRecipes, stock, numPortions, checkoutPending, pricingPending, basketPreviewOrderChangePending, orderSavePending } = props

  const onClick = () => {
    const {
      basketCheckedOut, basketProceedToCheckout, boxSummaryVisibilityChange, deliveryDayId,
      isAuthenticated, orderUpdate, orderId, slotId,
      checkoutTransactionalOrder, userOrders
    } = props

    boxSummaryVisibilityChange(false)
    basketCheckedOut(recipes.size, view)

    if (orderId) {
      orderUpdate(orderId, formatRecipes(recipes), deliveryDayId, slotId, numPortions, getOrderAction(userOrders, orderId))
    } else if (!isAuthenticated) {
      basketProceedToCheckout()
    } else {
      checkoutTransactionalOrder('create')
    }
  }

  return (
    <BaseBannerButton
      data-testing={`${view}BoxSummaryButton`}
      disabled={checkoutPending || (basketSum(okRecipes(recipes, menuRecipes, stock, numPortions)) < config.minRecipesNum)}
      pending={checkoutPending || pricingPending || basketPreviewOrderChangePending || orderSavePending}
      spinnerClassName={css.coSpinner}
      spinnerContainerClassName={css.coSpinnerContainer}
      onClick={onClick}
    >
      Checkout
    </BaseBannerButton>
  )
}

Checkout.propTypes = {
  menuRecipes: PropTypes.instanceOf(Immutable.List).isRequired,
  numPortions: PropTypes.number.isRequired,
  stock: PropTypes.instanceOf(Immutable.Map).isRequired,
  view: PropTypes.string,
  recipes: PropTypes.instanceOf(Immutable.Map),
  checkoutPending: PropTypes.bool,
  pricingPending: PropTypes.bool,
  orderSavePending: PropTypes.bool,
  basketPreviewOrderChangePending: PropTypes.bool,
  deliveryDayId: PropTypes.string,
  slotId: PropTypes.string.isRequired,
  basketCheckedOut: PropTypes.func.isRequired,
  basketProceedToCheckout: PropTypes.func.isRequired,
  orderUpdate: PropTypes.func,
  isAuthenticated: PropTypes.bool.isRequired,
  boxSummaryVisibilityChange: PropTypes.func.isRequired,
  checkoutTransactionalOrder: PropTypes.func,
  orderId: PropTypes.string,
  userOrders: PropTypes.instanceOf(Immutable.Map).isRequired
}

Checkout.defaultProps = {
  view: 'desktop',
  checkoutPending: false,
  pricingPending: false,
  orderSavePending: false,
  recipes: Immutable.Map({}),
  basketPreviewOrderChangePending: false,
  userOrders: Immutable.Map({}),
}

export { Checkout }
