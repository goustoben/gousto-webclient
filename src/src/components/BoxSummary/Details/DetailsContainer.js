import { connect } from 'react-redux'
import actions from 'actions'
import actionTypes from 'actions/actionTypes'
import Details from './Details'

function mapStateToProps(state) {
  return {
    accessToken: state.auth.get('accessToken'),
    deliveryDays: state.boxSummaryDeliveryDays,
    menuBoxPrices: state.menuBoxPrices,
    promoCode: state.basket.get('promoCode'),
    recipes: state.menuRecipes,
    recipesStore: state.recipes,
    slotId: state.basket.get('slotId'),
    stock: state.menuRecipeStock,
    menuFetchPending: state.pending.get(actionTypes.MENU_FETCH_DATA),
    orderSaveError: state.error.get(actionTypes.ORDER_SAVE),
    pricingPending: state.pricing.get('pending'),
    prices: state.pricing.get('prices'),
  }
}

const DetailsContainer = connect(mapStateToProps, {
  basketNumPortionChange: actions.basketNumPortionChange,
  portionSizeSelectedTracking: actions.portionSizeSelectedTracking,
  basketPostcodeChange: actions.basketPostcodeChange,
  onRemove: actions.basketRecipeRemove,
  clearSlot: actions.basketSlotClear,
  basketRestorePreviousDate: actions.basketRestorePreviousDate,
  boxSummaryVisibilityChange: actions.boxSummaryVisibilityChange,
})(Details)

export default DetailsContainer
