import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { basketSum, okRecipes } from 'utils/basket'
import config from 'config/basket'
import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
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
    openSidesModal,
    isBasketTransactionalOrder,
    userId,
    trackExperimentInSnowplow,
  } = props
  const sidesExperimentEnabled = useIsOptimizelyFeatureEnabled({
    name: 'radishes_menu_api_recipe_agnostic_sides_mvp_web_enabled',
    userId,
    trackExperimentInSnowplow
  })
  const showSideModal = sidesExperimentEnabled && !isBasketTransactionalOrder

  return (
    <BaseBannerButton
      view={view}
      dataTesting="boxSummaryButton"
      disabled={checkoutPending || (basketSum(okRecipes(recipes, menuRecipes, stock, numPortions)) < config.minRecipesNum)}
      pending={checkoutPending || pricingPending || basketPreviewOrderChangePending || orderSavePending}
      spinnerClassName={css.coSpinner}
      spinnerContainerClassName={css.coSpinnerContainer}
      onClick={() => (showSideModal ? openSidesModal() : checkoutBasket(section, view))}
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
  openSidesModal: PropTypes.func.isRequired,
  recipes: PropTypes.instanceOf(Immutable.Map),
  checkoutPending: PropTypes.bool,
  pricingPending: PropTypes.bool,
  orderSavePending: PropTypes.bool,
  basketPreviewOrderChangePending: PropTypes.bool,
  isBasketTransactionalOrder: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  trackExperimentInSnowplow: PropTypes.func.isRequired,
}

Checkout.defaultProps = {
  checkoutPending: false,
  pricingPending: false,
  orderSavePending: false,
  recipes: Immutable.Map({}),
  basketPreviewOrderChangePending: false,
}

export { Checkout }
