import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ModalPanel from 'Modal/ModalPanel'
import css from './ReferAFriendModal.css'
import ReferAFriend from '../ReferAFriend'

class ReferAFriendModal extends PureComponent {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    credit: PropTypes.string.isRequired
  }

  render() {
    const { onClose, credit } = this.props

    return (
      <ModalPanel
        closePortal={onClose}
        className={css.modal}
        containerClassName={css.modalContainer}
        disableOverlay
      >
      <div className={css.modalContent}>
        <h4 className={css.heading}>Refer a friend - Get {credit}</h4>
        <ReferAFriend />
      </div>
      </ModalPanel>
    )
  }
}

export { ReferAFriendModal }
