import { connect } from 'react-redux'
import { getSubscriptionState } from 'selectors/subscription'
import { NotificationCovid } from './NotificationCovid'

const mapStateToProps = (state) => ({
  hasSubscriptionEnabled: getSubscriptionState(state) === 'active'
})

const NotificationCovidContainer = connect(mapStateToProps, null)(NotificationCovid)

export {
  NotificationCovidContainer
}
