import React from 'react'
import { connect } from 'react-redux'
import actions from 'actions'
import { actionTypes } from 'actions/actionTypes'
import { boxSummaryVisibilityChange, trackingUnavailableRecipeList } from 'actions/boxSummary'
import { getBasketSlotId } from 'selectors/basket'
import { getFullScreenBoxSummary } from 'selectors/features'
import { getOkRecipeIds, getUnavailableRecipeIds } from 'routes/Menu/selectors/basket'
import { usePricing } from 'routes/Menu/domains/pricing'
import { menuRecipeDetailVisibilityChange } from '../../../actions/menuRecipeDetails'
import { basketRecipeRemove } from '../../../actions/basketRecipes'
import { Details } from './Details'
import { checkoutBasket } from '../../../actions/menuCheckoutClick'

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

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Details {...props} pricingPending={isPending} prices={pricing} />
}

const DetailsContainer = connect(mapStateToProps, {
  basketNumPortionChange: actions.basketNumPortionChange,
  portionSizeSelectedTracking: actions.portionSizeSelectedTracking,
  basketPostcodeChange: actions.basketPostcodeChange,
  onRemove: basketRecipeRemove,
  clearSlot: actions.basketSlotClear,
  basketRestorePreviousDate: actions.basketRestorePreviousDate,
  showRecipeDetailsOnClick: menuRecipeDetailVisibilityChange,
  boxSummaryVisibilityChange,
  trackingUnavailableRecipeList,
  checkoutBasket,
})(DetailsPure)

export { DetailsContainer }
