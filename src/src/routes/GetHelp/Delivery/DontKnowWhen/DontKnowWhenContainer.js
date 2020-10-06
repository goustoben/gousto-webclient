import { connect } from 'react-redux'
import { loadOrderById } from 'actions/getHelp'
import { DontKnowWhen } from './DontKnowWhen'
import { loadTrackingUrl } from '../../actions/getHelp'

const mapStateToProps = (state) => ({
  accessToken: state.auth.get('accessToken'),
  deliveryDate: state.getHelp.getIn(['order', 'deliveryDate']),
  deliverySlot: state.getHelp.getIn(['order', 'deliverySlot']).toJS(),
  isLoadOrderError: state.error.get('GET_HELP_LOAD_ORDERS_BY_ID'),
  isOrderLoading: state.pending.get('GET_HELP_LOAD_ORDERS_BY_ID'),
  isTrackingUrlLoading: state.pending.get('GET_HELP_LOAD_TRACKING_URL'),
  trackingUrl: state.getHelp.getIn(['order', 'trackingUrl']),
})

const DontKnowWhenContainer = connect(mapStateToProps, {
  loadOrderById,
  loadTrackingUrl,
})(DontKnowWhen)

export { DontKnowWhenContainer }
