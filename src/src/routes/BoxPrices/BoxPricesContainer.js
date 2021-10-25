import { connect } from 'react-redux'
import actions from 'actions'
import { actionTypes } from 'actions/actionTypes'
import { boxPricesBoxSizeSelected } from 'actions/boxPrices'
import { getIsJpgImagesEnabled } from 'selectors/features'
import { getNumPersonsToBoxDescriptors, getIsBoxPricesRedesignEnabled } from './boxPricesSelectors'
import { BoxPrices } from './BoxPrices'

const mapStateToProps = (state) => ({
  numPersonsToBoxDescriptors: getNumPersonsToBoxDescriptors(state),
  loading: state.pending.get(actionTypes.MENU_BOX_PRICES_RECEIVE),
  error: state.error.get(actionTypes.MENU_BOX_PRICES_RECEIVE),
  isBoxPricesRedesignEnabled: getIsBoxPricesRedesignEnabled(state),
  isJpgImagesEnabled: getIsJpgImagesEnabled(state),
})

const mapDispatchToProps = {
  basketNumPortionChange: actions.basketNumPortionChange,
  boxPricesBoxSizeSelected,
}

export const BoxPricesContainer = connect(mapStateToProps, mapDispatchToProps)(BoxPrices)
