import React from 'react'

import actions from 'actions'
import { connect } from 'react-redux'

import { actionTypes } from 'actions/actionTypes'
import { boxSummaryVisibilityChange, trackingUnavailableRecipeList } from 'actions/boxSummary'
import { useSupportedBoxTypes } from 'routes/Menu/domains/basket/internal/useSupportedBoxTypes'
import { usePricing } from 'routes/Menu/domains/pricing'
import { getOkRecipeIds, getUnavailableRecipeIds } from 'routes/Menu/selectors/basket'
import { getBasketSlotId } from 'selectors/basket'
import { getFullScreenBoxSummary } from 'selectors/features'

import { checkoutBasket } from '../../../actions/menuCheckoutClick'
import { menuRecipeDetailVisibilityChange } from '../../../actions/menuRecipeDetails'
import { useBasket } from '../../../domains/basket'
import { Details } from './Details'

const mapStateToProps = (state) => ({
  accessToken: state.auth.get('accessToken'),
  deliveryDays: state.boxSummaryDeliveryDays,
  menuBoxPrices: state.menuBoxPrices,
  promoCode: state.basket.get('promoCode'),
  recipesStore: state.recipes,
  okRecipeIds: getOkRecipeIds(state),
  slotId: getBasketSlotId(state),
  menuFetchPending: state.pending.get(actionTypes.MENU_FETCH_DATA),
  orderSaveError: state.error.get(actionTypes.ORDER_SAVE),
  unavailableRecipeIds: getUnavailableRecipeIds(state),
  shouldDisplayFullScreenBoxSummary: getFullScreenBoxSummary(state),
})

const DetailsPure = (props) => {
  const { isPending, pricing } = usePricing()
  const { isPortionSizeAllowedByRecipeCount, maxRecipesForPortion, minRecipesForPortion } =
    useSupportedBoxTypes()
  const { removeRecipe } = useBasket()

  return (
    <Details
      {...props} // eslint-disable-line react/jsx-props-no-spreading
      pricingPending={isPending}
      prices={pricing}
      isPortionSizeAllowedByRecipeCount={isPortionSizeAllowedByRecipeCount}
      maxRecipesForPortion={maxRecipesForPortion}
      minRecipesForPortion={minRecipesForPortion}
      onRemove={removeRecipe}
    />
  )
}

const DetailsContainer = connect(mapStateToProps, {
  basketNumPortionChange: actions.basketNumPortionChange,
  portionSizeSelectedTracking: actions.portionSizeSelectedTracking,
  basketPostcodeChange: actions.basketPostcodeChange,
  clearSlot: actions.basketSlotClear,
  basketRestorePreviousDate: actions.basketRestorePreviousDate,
  showRecipeDetailsOnClick: menuRecipeDetailVisibilityChange,
  boxSummaryVisibilityChange,
  trackingUnavailableRecipeList,
  checkoutBasket,
})(DetailsPure)

export { DetailsContainer }
