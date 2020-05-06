import { connect } from 'react-redux'
import { getBlockedResubscription, getBlockedTransactionalOrders } from 'selectors/features'
import { NotificationCovid } from './NotificationCovid'

const mapStateToProps = (state) => ({
  isResubscriptionBlocked: getBlockedResubscription(state),
  isTransactionalOrdersBlocked: getBlockedTransactionalOrders(state),
})

const NotificationCovidContainer = connect(mapStateToProps, null)(NotificationCovid)

export {
  NotificationCovidContainer
}
