import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ModalPanel from 'Modal/ModalPanel'
import { ReferAFriendContainer } from 'components/ReferAFriend'
import css from './ReferAFriendModal.module.css'

const propTypes = {
  onClose: PropTypes.func.isRequired,
  credit: PropTypes.string.isRequired
}

class ReferAFriendModal extends PureComponent {
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
          <h4 className={css.heading}>
            Refer a friend - Get
            {' '}
            {credit}
          </h4>
          <ReferAFriendContainer />
        </div>
      </ModalPanel>
    )
  }
}

ReferAFriendModal.propTypes = propTypes

export { ReferAFriendModal }
