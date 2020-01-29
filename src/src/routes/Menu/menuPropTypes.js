import PropTypes from 'prop-types'
import Immutable from 'immutable'

export const menuPropTypes = {
  basketNumPortionChange: PropTypes.func.isRequired,
  boxSummaryDeliveryDays: PropTypes.instanceOf(Immutable.Map),
  boxSummaryDeliveryDaysLoad: PropTypes.func,
  showOverlay: PropTypes.bool,
  disabled: PropTypes.bool.isRequired,
  forceLoad: PropTypes.bool,
  isAuthenticated: PropTypes.bool.isRequired,
  loginVisibilityChange: PropTypes.func,
  menuLoadBoxPrices: PropTypes.func.isRequired,
  menuLoadDays: PropTypes.func,
  menuLoadingBoxPrices: PropTypes.bool,
  menuVariation: PropTypes.string,
  orderCheckoutAction: PropTypes.func.isRequired,
  orderHasAnyProducts: PropTypes.func.isRequired,
  orderUpdateProducts: PropTypes.func.isRequired,
  params: PropTypes.object,
  postcode: PropTypes.string,
  query: PropTypes.object,
  recipesCount: PropTypes.number.isRequired,
  tariffId: PropTypes.number,
  menuCollectionRecipes: PropTypes.instanceOf(Immutable.Map)
}

export const defaultMenuPropTypes = {
  boxSummaryDeliveryDays: Immutable.Map(),
  boxSummaryDeliveryDaysLoad: () => { },
  showOverlay: false,
  disabled: false,
  forceLoad: false,
  isAuthenticated: false,
  loginVisibilityChange: () => { },
  menuLoadDays: () => { },
  menuLoadingBoxPrices: false,
  menuVariation: '',
  orderCheckout: {
    orderId: '',
    url: ''
  },
  params: {},
  postcode: '',
  query: {},
  tariffId: null,
  menuCollectionRecipes: Immutable.Map()
}
