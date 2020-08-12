import { connect } from 'react-redux'
import { OptimizelyRollouts } from './OptimizelyRollouts'
import { getAuthUserId } from '../../selectors/auth'

const mapDispatchToProps = state => ({
  authUserId: getAuthUserId(state)
})

export const OptimizelyRolloutsContainer = connect(mapDispatchToProps)(OptimizelyRollouts)
