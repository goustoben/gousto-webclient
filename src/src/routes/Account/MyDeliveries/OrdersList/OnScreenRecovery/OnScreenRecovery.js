import PropTypes from 'prop-types'
import React from 'react'

import ModalComponent from 'ModalComponent'
import { OnScreenRecoverySteps } from './OnScreenRecoverySteps'

import css from './OnScreenRecovery.module.css'

const propTypes = {
  visible: PropTypes.bool,
  triggered: PropTypes.bool,
  getRecoveryContent: PropTypes.func,
  isMultiSkipEnabled: PropTypes.bool.isRequired,
  hasBoxesToSkip: PropTypes.bool.isRequired
}

const defaultProps = {
  visible: undefined,
  triggered: false,
  getRecoveryContent: () => null,
}

export class OnScreenRecovery extends React.Component {
  componentDidUpdate(prevProps) {
    const {
      triggered,
      getRecoveryContent,
    } = this.props

    if (triggered && (prevProps.triggered !== triggered)) {
      getRecoveryContent()
    }
  }

  render() {
    const {
      visible,
      isMultiSkipEnabled,
      hasBoxesToSkip
    } = this.props

    return (
      <ModalComponent styleName={css.modalComponent} visible={visible}>
        {/* Recovery steps as its own stateful component */}
        {/* As <Overlay/> cannot re-render its top-level children */}
        <OnScreenRecoverySteps
          hasBoxesToSkip={hasBoxesToSkip}
          isMultiSkipEnabled={isMultiSkipEnabled}
        />
      </ModalComponent>
    )
  }
}

OnScreenRecovery.propTypes = propTypes

OnScreenRecovery.defaultProps = defaultProps
