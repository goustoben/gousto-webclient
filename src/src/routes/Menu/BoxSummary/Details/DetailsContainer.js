import { connect } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import { getBasketSlotId } from 'selectors/basket'
import { getFullScreenBoxSummary } from 'selectors/features'
import { getOkRecipeIds, getUnavailableRecipeIds, } from 'routes/Menu/selectors/basket'
import { Details } from './Details'
import { boxSummaryVisibilityChange } from "actions/boxSummary/boxSummaryVisibilityChange"
import { trackingUnavailableRecipeList } from "actions/boxSummary/trackingUnavailableRecipeList"
import { basketNumPortionChange } from "actions/basket/basketNumPortionChange"
import { portionSizeSelectedTracking } from "actions/basket/portionSizeSelectedTracking"
import { basketPostcodeChange } from "actions/basket/basketPostcodeChange"
import { basketSlotClear } from "actions/basket/basketSlotClear"
import { basketRestorePreviousDate } from "actions/basket/basketRestorePreviousDate"
import { basketRecipeRemove } from "routes/Menu/actions/basketRecipes/basketRecipeRemove"
import { menuRecipeDetailVisibilityChange } from "routes/Menu/actions/menuRecipeDetails/menuRecipeDetailVisibilityChange"

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
  pricingPending: state.pricing.get('pending'),
  prices: state.pricing.get('prices'),
  unavailableRecipeIds: getUnavailableRecipeIds(state),
  shouldDisplayFullScreenBoxSummary: getFullScreenBoxSummary(state),
})

const DetailsContainer = connect(mapStateToProps, {
  basketNumPortionChange,
  portionSizeSelectedTracking,
  basketPostcodeChange,
  onRemove: basketRecipeRemove,
  clearSlot: basketSlotClear,
  basketRestorePreviousDate,
  showRecipeDetailsOnClick: menuRecipeDetailVisibilityChange,
  boxSummaryVisibilityChange,
  trackingUnavailableRecipeList,
})(Details)

export { DetailsContainer }
