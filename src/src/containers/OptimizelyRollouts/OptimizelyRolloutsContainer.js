import { connect } from 'react-redux'
import Cookies from 'utils/GoustoCookies'
import { get } from 'utils/cookieHelper2'
import { OptimizelyRollouts } from './OptimizelyRollouts'
import { getAuthUserId } from '../../selectors/auth'
import { trackExperimentInSnowplow } from './trackExperimentInSnowplow'

const mapStateToProps = state => ({
  authUserId: getAuthUserId(state),
  sessionId: get(Cookies, 'gousto_session_id'),

})

const mapDispatchToProps = {
  trackExperimentInSnowplow,
}

export const OptimizelyRolloutsContainer = connect(mapStateToProps, mapDispatchToProps)(OptimizelyRollouts)
