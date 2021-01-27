import { connect } from 'react-redux'
import Cookies from 'utils/GoustoCookies'
import { get } from 'utils/cookieHelper2'
import { OptimizelyRollouts } from './OptimizelyRollouts'
import { getAuthUserId } from '../../selectors/auth'
import { trackExperimentInSnowplow } from './trackExperimentInSnowplow'
import { actionTypes } from '../../actions/actionTypes'
import { loadOptimizelySDK } from '../../actions/optimizely'

const withVersionPrefixAsFalse = false

const mapStateToProps = state => {
  const sessionId = get(Cookies, 'gousto_session_id', withVersionPrefixAsFalse, false )

  return {
    authUserId: getAuthUserId(state),
    sessionId,
    isLoading: state.pending.get(actionTypes.OPTIMIZELY_ROLLOUT_LOADING, true)
  }
}

const mapDispatchToProps = {
  trackExperimentInSnowplow,
  loadOptimizelySDK
}

export const OptimizelyRolloutsContainer = connect(mapStateToProps, mapDispatchToProps)(OptimizelyRollouts)
