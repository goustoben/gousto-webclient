import PropTypes from 'prop-types'
import React from 'react'
import ModalPanel from 'Modal/ModalPanel'
import Overlay from 'Overlay'
import css from './ExpiredBillingModal.css'
import BillingForm from './BillingForm'

class ExpiredBillingModal extends React.PureComponent {
  onCloseExpiredBillingModal = () => {
    const { closeExpiredBillingModal } = this.props
    closeExpiredBillingModal(false)
  }

  render() {
    const { expiredBillingModalOpen } = this.props

    return (
      <Overlay open={Boolean(expiredBillingModalOpen)} contentClassName={css.mobileModalContent} from="top">
        <ModalPanel closePortal={this.onCloseExpiredBillingModal} disableOverlay disableClickOutside>
          <div className={css.body}>
            <h2 className={css.modalTitle}>Your account is on hold</h2>
            <div className={css.modalBodyText}>
              Your card has expired. Update your payment info now to order more recipes
            </div>
            <div>
              <BillingForm />
            </div>
          </div>
        </ModalPanel>
      </Overlay>
    )
  }
}

ExpiredBillingModal.propTypes = {
  expiredBillingModalOpen: PropTypes.bool,
  closeExpiredBillingModal: PropTypes.func.isRequired,
}

ExpiredBillingModal.defaultProps = {
  expiredBillingModalOpen: false,
}

ExpiredBillingModal.contextTypes = {
  store: PropTypes.instanceOf(Object).isRequired
}

export default ExpiredBillingModal
