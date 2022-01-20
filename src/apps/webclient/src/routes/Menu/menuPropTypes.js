import PropTypes from 'prop-types'
import Immutable from 'immutable'

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
  recipesCount: PropTypes.number.isRequired,
  tariffId: PropTypes.number,
}

export const defaultMenuPropTypes = {
  boxSummaryDeliveryDays: Immutable.Map(),
  boxSummaryDeliveryDaysLoad: () => { },
  showOverlay: false,
  loginVisibilityChange: () => { },
  menuLoadDays: () => { },
  menuLoadingBoxPrices: false,
  params: {},
  query: {},
  tariffId: null,
}
