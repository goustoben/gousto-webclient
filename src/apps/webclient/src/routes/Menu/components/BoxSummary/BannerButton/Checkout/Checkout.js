import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { useSelector } from 'react-redux'
import { basketSum, okRecipes } from 'utils/basket'
import config from 'config/basket'
import { getIsSimplifyBasketBarEnabled } from 'routes/Menu/selectors/features'
import { usePricing } from 'routes/Menu/domains/pricing'
import css from './Checkout.css'
import { BaseBannerButton } from '../BaseBannerButton'
import { CheckoutCounter } from '../CheckoutCounter/CheckoutCounter'

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
    isButtonHovered,
    shouldRenderCounter,
  } = props
  const { pricing } = usePricing()
  const isSimplifyBasketBarEnabled = useSelector(getIsSimplifyBasketBarEnabled)
  const isPending =
    checkoutPending ||
    pricingPending ||
    basketPreviewOrderChangePending ||
    orderSavePending ||
    loadingOrderPending ||
    menuFetchData
  const numRecipes = basketSum(okRecipes(recipes, menuRecipes, stock, numPortions))
  const isDisabled =
    checkoutPending ||
    numRecipes < config.minRecipesNum

  const handleClick = useCallback((e) => {
    e.stopPropagation()
    checkoutBasket({ section, view, pricing })
  }, [checkoutBasket, section, view, pricing])

  return (
    <BaseBannerButton
      view={view}
      dataTesting="boxSummaryButton"
      disabled={isDisabled}
      pending={isSimplifyBasketBarEnabled ? false : isPending}
      spinnerClassName={isSimplifyBasketBarEnabled ? css.displayNone : css.coSpinner}
      spinnerContainerClassName={
        isSimplifyBasketBarEnabled ? css.displayNone : css.coSpinnerContainer
      }
      onClick={handleClick}
      isSimplifyBasketBarEnabled={isSimplifyBasketBarEnabled}
    >
      {isSimplifyBasketBarEnabled ? (
        <>
          <div className={css.checkoutLabel}>Checkout</div>
          {shouldRenderCounter && (
          <CheckoutCounter isDisabled={isDisabled} isButtonHovered={isButtonHovered} numRecipes={numRecipes} />
          )}
        </>
      ) : (
        <>Checkout</>
      )}
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
  isButtonHovered: PropTypes.bool,
  shouldRenderCounter: PropTypes.bool,
}

Checkout.defaultProps = {
  menuFetchData: false,
  loadingOrderPending: false,
  checkoutPending: false,
  pricingPending: false,
  orderSavePending: false,
  recipes: Immutable.Map({}),
  basketPreviewOrderChangePending: false,
  isButtonHovered: false,
  shouldRenderCounter: false,
}

export { Checkout }
