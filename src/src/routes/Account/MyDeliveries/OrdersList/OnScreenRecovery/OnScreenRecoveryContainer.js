import { connect } from 'react-redux'

import { getIsMultiSkipEnabled } from 'selectors/features'
import { getHasBoxesToSkip } from 'selectors/user'
import { OnScreenRecovery } from './OnScreenRecovery'
import { getRecoveryContent } from "actions/onScreenRecovery/getRecoveryContent"

const mapStateToProps = (state) => ({
  triggered: state.onScreenRecovery.get('triggered'),
  visible: state.onScreenRecovery.get('modalVisibility'),
  isMultiSkipEnabled: getIsMultiSkipEnabled(state),
  hasBoxesToSkip: getHasBoxesToSkip(state)
})

const mapDispatchToProps = {
  getRecoveryContent,
}

export const OnScreenRecoveryContainer = connect(mapStateToProps, mapDispatchToProps)(OnScreenRecovery)
