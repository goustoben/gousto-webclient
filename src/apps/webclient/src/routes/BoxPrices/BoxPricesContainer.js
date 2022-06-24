import { connect } from 'react-redux'

import { actionTypes } from 'actions/actionTypes'
import { menuLoadBoxPrices } from 'actions/menu'
import { trackUTMAndPromoCode } from 'actions/tracking'

import { BoxPrices } from './BoxPrices'
import { boxPricesBoxSizeSelected } from './boxPricesActions'
import { getNumPersonsToBoxDescriptors } from './boxPricesSelectors'

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
