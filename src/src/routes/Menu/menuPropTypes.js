import PropTypes from 'prop-types'
import Immutable from 'immutable'

export const menuPropTypes = {
  addressId: PropTypes.string,
  basketNumPortionChange: PropTypes.func.isRequired,
  basketOrderLoaded: PropTypes.func.isRequired,
  basketProducts: PropTypes.oneOfType([
    PropTypes.instanceOf(Immutable.Map),
    PropTypes.instanceOf(Immutable.Iterable),
  ]),
  basketRestorePreviousValues: PropTypes.func.isRequired,
  boxDetailsVisibilityChange: PropTypes.func.isRequired,
  boxSummaryDeliveryDays: PropTypes.instanceOf(Immutable.Map),
  boxSummaryDeliveryDaysLoad: PropTypes.func,
  boxSummaryShow: PropTypes.bool,
  cutOffDate: PropTypes.string.isRequired,
  deliveryDayId: PropTypes.string,
  detailVisibilityChange: PropTypes.func,
  disabled: PropTypes.bool.isRequired,
  filterRecipeGrouping: PropTypes.func,
  forceLoad: PropTypes.bool,
  foodBrandDetails: PropTypes.shape({
    slug: PropTypes.string,
    name: PropTypes.string,
    borderColor: PropTypes.string,
  }),
  isAuthenticated: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  loginVisibilityChange: PropTypes.func,
  menuBrowseCTAShow: PropTypes.bool,
  menuBrowseCTAVisibilityChange: PropTypes.func,
  menuLoadBoxPrices: PropTypes.func.isRequired,
  menuLoadDays: PropTypes.func,
  menuLoadingBoxPrices: PropTypes.bool,
  menuVariation: PropTypes.string,
  numPortions: PropTypes.number,
  orderCheckoutAction: PropTypes.func.isRequired,
  orderHasAnyProducts: PropTypes.func.isRequired,
  orderId: PropTypes.string,
  orderUpdateProducts: PropTypes.func.isRequired,
  params: PropTypes.object,
  portionSizeSelectedTracking: PropTypes.func,
  postcode: PropTypes.string,
  productsLoadProducts: PropTypes.func.isRequired,
  productsLoadStock: PropTypes.func.isRequired,
  promoCode: PropTypes.string,
  query: PropTypes.object,
  recipeGroupingSelected: PropTypes.shape({
    slug: PropTypes.string,
    name: PropTypes.string,
    borderColor: PropTypes.string,
  }),
  recipes: PropTypes.arrayOf(PropTypes.string).isRequired,
  shouldJfyTutorialBeVisible: PropTypes.func,
  slotId: PropTypes.string.isRequired,
  storeOrderId: PropTypes.string,
  tariffId: PropTypes.number,
  userOrders: PropTypes.instanceOf(Immutable.Map).isRequired,
  menuCollectionRecipes: PropTypes.instanceOf(Immutable.Map)
}

export const defaultMenuPropTypes = {
  addressId: '',
  basketProducts: Immutable.Map(),
  basketRestorePreviousValues: () => { },
  boxSummaryDeliveryDays: Immutable.Map(),
  boxSummaryDeliveryDaysLoad: () => { },
  boxSummaryShow: false,
  deliveryDayId: '',
  detailVisibilityChange: () => { },
  disabled: false,
  filterRecipeGrouping: () => { },
  foodBrandDetails: null,
  forceLoad: false,
  isAuthenticated: false,
  isLoading: false,
  loginVisibilityChange: () => { },
  menuBrowseCTAShow: false,
  menuBrowseCTAVisibilityChange: () => { },
  menuLoadDays: () => { },
  menuLoadingBoxPrices: false,
  menuVariation: '',
  numPortions: 2,
  orderCheckout: {
    orderId: '',
    url: ''
  },
  orderId: '',
  params: {},
  portionSizeSelectedTracking: () => { },
  postcode: '',
  promoCode: '',
  query: {
    orderId: ''
  },
  recipeGroupingSelected: null,
  shouldJfyTutorialBeVisible: () => { },
  storeOrderId: '',
  tariffId: null,
  menuCollectionRecipes: Immutable.Map()
}
