import { connect } from 'react-redux'
import Cookies from 'utils/GoustoCookies'
import { get } from 'utils/cookieHelper2'
import { OptimizelyRollouts } from './OptimizelyRollouts'
import { getAuthUserId } from '../../selectors/auth'
import { trackExperimentInSnowplow } from './trackExperimentInSnowplow'

const withVersionPrefixAsFalse = false

const mapStateToProps = state => {
  const sessionId = get(Cookies, 'gousto_session_id', withVersionPrefixAsFalse, false )

  return {
    authUserId: getAuthUserId(state),
    sessionId

  }
}

const mapDispatchToProps = {
  trackExperimentInSnowplow,
}

export const OptimizelyRolloutsContainer = connect(mapStateToProps, mapDispatchToProps)(OptimizelyRollouts)
