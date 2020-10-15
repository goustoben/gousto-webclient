import { connect } from 'react-redux'
import { loadOrderById } from 'actions/getHelp'
import { loadTrackingUrl } from '../../actions/getHelp'
import { DidntArrive } from './DidntArrive'

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

const DidntArriveContainer = connect(mapStateToProps, {
  loadOrderById,
  loadTrackingUrl,
})(DidntArrive)

export { DidntArriveContainer }
