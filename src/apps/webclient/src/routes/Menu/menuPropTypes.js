import Immutable from 'immutable'
import PropTypes from 'prop-types'

export const menuPropTypes = {
  basketNumPortionChange: PropTypes.func.isRequired,
  boxSummaryDeliveryDays: PropTypes.instanceOf(Immutable.Map),
  boxSummaryDeliveryDaysLoad: PropTypes.func,
  showOverlay: PropTypes.bool,
  disabled: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loginVisibilityChange: PropTypes.func,
  menuLoadBoxPrices: PropTypes.func.isRequired,
  menuLoadDays: PropTypes.func,
  menuLoadingBoxPrices: PropTypes.bool,
  params: PropTypes.object,
  query: PropTypes.object,
  tariffId: PropTypes.number,
  isActionBarRedesignEnabled: PropTypes.bool,
  addRecipeToBasket: PropTypes.func.isRequired,
}

export const defaultMenuPropTypes = {
  boxSummaryDeliveryDays: Immutable.Map(),
  boxSummaryDeliveryDaysLoad: () => {},
  showOverlay: false,
  loginVisibilityChange: () => {},
  menuLoadDays: () => {},
  menuLoadingBoxPrices: false,
  params: {},
  query: {},
  tariffId: null,
  isActionBarRedesignEnabled: false,
}
