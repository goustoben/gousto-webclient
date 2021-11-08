import PropTypes from 'prop-types'
import React from 'react'
import ModalPanel from 'Modal/ModalPanel'
import Overlay from 'Overlay'
import { CancelOrderModalContentContainer } from './CancelOrderModalContent'

const propTypes = {
  close: PropTypes.func,
  cancelOrderModalOpen: PropTypes.bool,
}

const defaultProps = {
  close: () => {},
  cancelOrderModalOpen: false,
}

export class CancelOrderModal extends React.PureComponent {
  render() {
    const { cancelOrderModalOpen, close } = this.props

    return (
      <Overlay open={Boolean(cancelOrderModalOpen)} from="top">
        <ModalPanel closePortal={close} disableOverlay>
          <CancelOrderModalContentContainer close={close} />
        </ModalPanel>
      </Overlay>
    )
  }
}

CancelOrderModal.propTypes = propTypes
CancelOrderModal.defaultProps = defaultProps
