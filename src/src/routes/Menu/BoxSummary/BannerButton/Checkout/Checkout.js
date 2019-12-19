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
  const {
    basketPreviewOrderChangePending,
    checkoutPending,
    isAddOnsFeatureFlagOn,
    isAuthenticated,
    menuRecipes,
    numPortions,
    orderSavePending,
    pricingPending,
    recipes,
    stock,
    view,
  } = props

  const onClick = () => {
    const {
      basketCheckedOut, basketProceedToCheckout, boxSummaryVisibilityChange, deliveryDayId,
      orderUpdate, orderId, slotId,
      checkoutTransactionalOrder, userOrders
    } = props

    boxSummaryVisibilityChange(false)
    basketCheckedOut(recipes.size, view)

    if (orderId) {
      orderUpdate(orderId, formatRecipes(recipes), deliveryDayId, slotId, numPortions, getOrderAction(userOrders, orderId))
    } else if (!props.isAuthenticated) {
      basketProceedToCheckout()
    } else {
      checkoutTransactionalOrder('create')
    }
  }

  return (
    <BaseBannerButton
      view={view}
      dataTesting='boxSummaryButton'
      disabled={checkoutPending || (basketSum(okRecipes(recipes, menuRecipes, stock, numPortions)) < config.minRecipesNum)}
      pending={checkoutPending || pricingPending || basketPreviewOrderChangePending || orderSavePending}
      spinnerClassName={css.coSpinner}
      spinnerContainerClassName={css.coSpinnerContainer}
      onClick={onClick}
    >
      {isAddOnsFeatureFlagOn && isAuthenticated ? 'Confirm' : 'Checkout'}
    </BaseBannerButton>
  )
}

Checkout.propTypes = {
  menuRecipes: PropTypes.instanceOf(Immutable.List).isRequired,
  numPortions: PropTypes.number.isRequired,
  stock: PropTypes.instanceOf(Immutable.Map).isRequired,
  view: PropTypes.string.isRequired,
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
  userOrders: PropTypes.instanceOf(Immutable.Map).isRequired,
  isAddOnsFeatureFlagOn: PropTypes.bool,
}

Checkout.defaultProps = {
  checkoutPending: false,
  pricingPending: false,
  orderSavePending: false,
  recipes: Immutable.Map({}),
  basketPreviewOrderChangePending: false,
  userOrders: Immutable.Map({}),
  isAddOnsFeatureFlagOn: false,
}

export { Checkout }
