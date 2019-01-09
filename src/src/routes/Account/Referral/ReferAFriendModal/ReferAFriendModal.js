import React from 'react'
import PropTypes from 'prop-types'
import ModalPanel from 'Modal/ModalPanel'
import css from './ReferAFriendModal.css'
import { ReferAFriend } from '../ReferAFriend'

class ReferAFriendModal extends React.PureComponent {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    userReferAFriend: PropTypes.func.isRequired,
  }

  render() {
    const { onClose, userReferAFriend } = this.props

    return (
      <ModalPanel
        closePortal={onClose}
        className={css.modal}
        containerClassName={css.modalContainer}
        disableOverlay
      >
      <div className={css.modalContent}>
        <h4 className={css.heading}>Refer a friend - Get £15</h4>
        <ReferAFriend userReferAFriend={userReferAFriend} />
      </div>
      </ModalPanel>
    )
  }
}

export { ReferAFriendModal }
