import { connect } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import { boxPricesBoxSizeSelected } from 'actions/boxPrices'
import { trackUTMAndPromoCode } from 'actions/tracking'
import { menuLoadBoxPrices } from 'actions/menu'
import { getNumPersonsToBoxDescriptors } from './boxPricesSelectors'
import { BoxPrices } from './BoxPrices'

const mapStateToProps = (state) => ({
  numPersonsToBoxDescriptors: getNumPersonsToBoxDescriptors(state),
  loading: state.pending.get(actionTypes.MENU_BOX_PRICES_RECEIVE),
  error: state.error.get(actionTypes.MENU_BOX_PRICES_RECEIVE),
})

const mapDispatchToProps = {
  boxPricesBoxSizeSelected,
  trackUTMAndPromoCode,
  menuLoadBoxPrices,
}

export const BoxPricesContainer = connect(mapStateToProps, mapDispatchToProps)(BoxPrices)
