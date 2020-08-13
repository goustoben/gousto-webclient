import { connect } from 'react-redux'
import { OptimizelyRollouts } from './OptimizelyRollouts'
import { getAuthUserId } from '../../selectors/auth'
import { trackExperimentInSnowplow } from './trackExperimentInSnowplow'

const mapDispatchToProps = state => ({
  authUserId: getAuthUserId(state)
})

export const OptimizelyRolloutsContainer = connect(mapDispatchToProps, { trackExperimentInSnowplow })(OptimizelyRollouts)
