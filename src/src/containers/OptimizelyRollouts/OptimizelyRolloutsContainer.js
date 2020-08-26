import { connect } from 'react-redux'
import Cookies from 'utils/GoustoCookies'
import { OptimizelyRollouts } from './OptimizelyRollouts'
import { getAuthUserId } from '../../selectors/auth'
import { trackExperimentInSnowplow } from './trackExperimentInSnowplow'

const mapStateToProps = state => ({
  authUserId: getAuthUserId(state),
  sessionId: Cookies.get('gousto_session_id'),
})

const mapDispatchToProps = {
  trackExperimentInSnowplow,
}

export const OptimizelyRolloutsContainer = connect(mapStateToProps, mapDispatchToProps)(OptimizelyRollouts)
