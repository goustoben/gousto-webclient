import PropTypes from 'prop-types'
import React from 'react'
import ModalPanel from 'Modal/ModalPanel'
import Overlay from 'Overlay'
import css from './NewAddressModal.css'
import NewAddressForm from './NewAddressForm'

class NewAddressModal extends React.PureComponent {

  static propTypes = {
    isModalOpen: PropTypes.bool,
    userToggleNewAddressModal: PropTypes.func,
  }

  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  static defaultProps = {
    isModalOpen: false,
  }

  closeModal = () => {
    this.props.userToggleNewAddressModal(false)
  }

  render() {
    return (
      <Overlay open={Boolean(this.props.isModalOpen)} from="top">
        <ModalPanel closePortal={() => this.closeModal()} disableClickOutside disableOverlay>
          <div className={css.body}>
            <h2 className={css.modalTitle}>Add new address</h2>
            <NewAddressForm close={() => this.closeModal()} />
          </div>
        </ModalPanel>
      </Overlay>
    )
  }
}

export default NewAddressModal
