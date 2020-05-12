import { connect } from 'react-redux'
import { getBlockedResubscription, getBlockedTransactionalOrders } from 'selectors/features'
import { getUserId } from 'selectors/user'
import { NotificationCovid } from './NotificationCovid'

const mapStateToProps = (state) => ({
  isResubscriptionBlocked: getBlockedResubscription(state),
  isTransactionalOrdersBlocked: getBlockedTransactionalOrders(state),
  userId: getUserId(state),
})

const NotificationCovidContainer = connect(mapStateToProps, null)(NotificationCovid)

export {
  NotificationCovidContainer
}
