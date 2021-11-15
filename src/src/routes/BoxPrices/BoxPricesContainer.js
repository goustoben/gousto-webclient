import { connect } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import { getIsBoxPricesRedesignEnabled, getNumPersonsToBoxDescriptors } from './boxPricesSelectors'
import { BoxPrices } from './BoxPrices'
import { basketNumPortionChange } from "actions/basket/basketNumPortionChange"
import { boxPricesBoxSizeSelected } from "actions/boxPrices/boxPricesBoxSizeSelected"

const mapStateToProps = (state) => ({
  numPersonsToBoxDescriptors: getNumPersonsToBoxDescriptors(state),
  loading: state.pending.get(actionTypes.MENU_BOX_PRICES_RECEIVE),
  error: state.error.get(actionTypes.MENU_BOX_PRICES_RECEIVE),
  isBoxPricesRedesignEnabled: getIsBoxPricesRedesignEnabled(state),
})

const mapDispatchToProps = {
  basketNumPortionChange,
  boxPricesBoxSizeSelected,
}

export const BoxPricesContainer = connect(mapStateToProps, mapDispatchToProps)(BoxPrices)
