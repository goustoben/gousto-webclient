import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { basketSum, okRecipes } from 'utils/basket'
import config from 'config/basket'
import css from './Checkout.css'
import { BaseBannerButton } from '../BaseBannerButton'

const Checkout = (props) => {
  const {
    basketPreviewOrderChangePending,
    checkoutPending,
    menuRecipes,
    numPortions,
    orderSavePending,
    pricingPending,
    recipes,
    stock,
    view,
    section,
    checkoutBasket,
    loadingOrderPending,
    menuFetchData,
  } = props

  return (
    <BaseBannerButton
      view={view}
      dataTesting="boxSummaryButton"
      disabled={checkoutPending || (basketSum(okRecipes(recipes, menuRecipes, stock, numPortions)) < config.minRecipesNum)}
      pending={
        checkoutPending
        || pricingPending
        || basketPreviewOrderChangePending
        || orderSavePending
        || loadingOrderPending
        || menuFetchData
      }
      spinnerClassName={css.coSpinner}
      spinnerContainerClassName={css.coSpinnerContainer}
      onClick={() => checkoutBasket(section, view)}
    >
      Checkout
    </BaseBannerButton>
  )
}

Checkout.propTypes = {
  menuRecipes: PropTypes.instanceOf(Immutable.List).isRequired,
  numPortions: PropTypes.number.isRequired,
  stock: PropTypes.instanceOf(Immutable.Map).isRequired,
  view: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
  checkoutBasket: PropTypes.func.isRequired,
  recipes: PropTypes.instanceOf(Immutable.Map),
  menuFetchData: PropTypes.bool,
  loadingOrderPending: PropTypes.bool,
  checkoutPending: PropTypes.bool,
  pricingPending: PropTypes.bool,
  orderSavePending: PropTypes.bool,
  basketPreviewOrderChangePending: PropTypes.bool,
}

Checkout.defaultProps = {
  menuFetchData: false,
  loadingOrderPending: false,
  checkoutPending: false,
  pricingPending: false,
  orderSavePending: false,
  recipes: Immutable.Map({}),
  basketPreviewOrderChangePending: false,
}

export { Checkout }
