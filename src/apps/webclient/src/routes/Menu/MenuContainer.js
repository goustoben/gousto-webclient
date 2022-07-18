import actions from 'actions'
import { connect } from 'react-redux'

import { actionTypes } from 'actions/actionTypes'
import { boxSummaryDeliveryDaysLoad } from 'actions/boxSummary'
import { applyPromoCodeAndShowModal } from 'routes/Home/homeActions'
import { withIsActionBarRedesignEnabled } from 'routes/Menu/components/withIsActionBarRedesignEnabled'

import { MenuWrapper } from './MenuWrapper'
import { menuCalculateTimeToUsable } from './actions/menuCalculateTimeToUsable'
import fetchData from './fetchData'

function mapStateToProps(state, ownProps) {
  const query = ownProps.location && ownProps.location.query
  const showOverlay = state.boxSummaryShow.get('show') || state.menuBrowseCTAShow

  return {
    showOverlay,
    boxSummaryDeliveryDays: state.boxSummaryDeliveryDays,
    query: query || {},
    params: ownProps.params,
    disabled: state.auth.get('isAdmin'),
    isAuthenticated: state.auth.get('isAuthenticated'),
    tariffId: state.basket.get('tariffId'),
    menuLoadingBoxPrices: state.pending.get(actionTypes.MENU_BOX_PRICES_RECEIVE, false),
    forceLoad: state.menu.get('forceLoad', false),
    postcode: state.basket.get('postcode'),
  }
}

const mapDispatchToProps = {
  menuLoadBoxPrices: actions.menuLoadBoxPrices,
  menuLoadDays: actions.menuLoadDays,
  loginVisibilityChange: actions.loginVisibilityChange,
  basketNumPortionChange: actions.basketNumPortionChange,
  boxSummaryDeliveryDaysLoad,
  menuCalculateTimeToUsable,
  fetchData,
  applyPromoCodeAndShowModal,
}

const MenuContainer = withIsActionBarRedesignEnabled(
  connect(mapStateToProps, mapDispatchToProps)(MenuWrapper),
)

MenuContainer.whyDidYouRender = true

export { MenuContainer }
