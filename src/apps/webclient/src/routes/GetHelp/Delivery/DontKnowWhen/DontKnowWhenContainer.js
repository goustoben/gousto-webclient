import { connect } from 'react-redux'
import { DontKnowWhen } from './DontKnowWhen'
import {
  loadOrderById,
  loadTrackingUrl,
  trackClickGetInTouchInSSRDeliveries,
  trackClickMyGoustoInSSRDeliveries,
  trackClickTrackMyBoxInSSRDeliveries,
} from '../../actions/getHelp'
import {
  getAccessToken,
  getIsLoadOrderError,
  getIsOrderLoading,
  getIsTrackingUrlLoading,
  getOrderDeliveryDate,
  getOrderDeliverySlot,
  getTrackingUrl,
} from '../../selectors/selectors'

const mapStateToProps = (state) => ({
  accessToken: getAccessToken(state),
  deliveryDate: getOrderDeliveryDate(state),
  deliverySlot: getOrderDeliverySlot(state),
  isLoadOrderError: getIsLoadOrderError(state),
  isOrderLoading: getIsOrderLoading(state),
  isTrackingUrlLoading: getIsTrackingUrlLoading(state),
  trackingUrl: getTrackingUrl(state),
})

const DontKnowWhenContainer = connect(mapStateToProps, {
  loadOrderById,
  loadTrackingUrl,
  trackClickGetInTouchInSSRDeliveries,
  trackClickMyGoustoInSSRDeliveries,
  trackClickTrackMyBoxInSSRDeliveries,
})(DontKnowWhen)

export { DontKnowWhenContainer }
