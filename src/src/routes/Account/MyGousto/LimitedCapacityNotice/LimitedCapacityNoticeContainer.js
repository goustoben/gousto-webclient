import { connect } from 'react-redux'
import { getBlockedResubscription, getBlockedTransactionalOrders, getIsLimitedCapacityChristmas } from 'selectors/features'
import { getUserId } from 'selectors/user'
import { LimitedCapacityNotice } from './LimitedCapacityNotice'

const mapStateToProps = (state) => ({
  isLimitedCapacityChristmas: getIsLimitedCapacityChristmas(state),
  isResubscriptionBlocked: getBlockedResubscription(state),
  isTransactionalOrdersBlocked: getBlockedTransactionalOrders(state),
  userId: getUserId(state),
})

const LimitedCapacityNoticeContainer = connect(mapStateToProps, null)(LimitedCapacityNotice)

export {
  LimitedCapacityNoticeContainer
}
