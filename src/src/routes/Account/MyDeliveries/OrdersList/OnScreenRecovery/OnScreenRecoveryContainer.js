import { connect } from 'react-redux'

import { getRecoveryContent } from 'actions/onScreenRecovery'
import { getIsMultiSkipEnabled } from 'selectors/features'
import { OnScreenRecovery } from './OnScreenRecovery'

const mapStateToProps = (state) => ({
  triggered: state.onScreenRecovery.get('triggered'),
  visible: state.onScreenRecovery.get('modalVisibility'),
  isMultiSkipEnabled: getIsMultiSkipEnabled(state),
})

const mapDispatchToProps = {
  getRecoveryContent,
}

export const OnScreenRecoveryContainer = connect(mapStateToProps, mapDispatchToProps)(OnScreenRecovery)
