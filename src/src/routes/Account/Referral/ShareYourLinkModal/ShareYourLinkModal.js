import React from 'react'
import PropTypes from 'prop-types'

import ModalPanel from 'Modal/ModalPanel'
import css from './ShareYourLinkModal.css'

class ShareYourLinkModal extends React.PureComponent {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  }

  render() {
    const { onClose } = this.props

    return (
    <ModalPanel
      closePortal={onClose}
      className={css.modal}
      disableOverlay
    >
    </ModalPanel>
    )
  }

}
export { ShareYourLinkModal }
