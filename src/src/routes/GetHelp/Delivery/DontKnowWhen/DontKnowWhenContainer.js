import { connect } from 'react-redux'
import { DontKnowWhen } from './DontKnowWhen'
import {
  getAccessToken,
  getIsLoadOrderError,
  getIsOrderLoading,
  getIsTrackingUrlLoading,
  getOrderDeliveryDate,
  getOrderDeliverySlot,
  getTrackingUrl,
} from '../../selectors/selectors'
import { loadOrderById } from "routes/GetHelp/actions/getHelp/loadOrderById"
import { trackClickMyGoustoInSSRDeliveries } from "routes/GetHelp/actions/getHelp/trackClickMyGoustoInSSRDeliveries"
import { trackClickTrackMyBoxInSSRDeliveries } from "routes/GetHelp/actions/getHelp/trackClickTrackMyBoxInSSRDeliveries"
import { trackClickGetInTouchInSSRDeliveries } from "routes/GetHelp/actions/getHelp/trackClickGetInTouchInSSRDeliveries"
import { loadTrackingUrl } from "routes/GetHelp/actions/getHelp/loadTrackingUrl"

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
