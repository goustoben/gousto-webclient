import PropTypes from 'prop-types'
import React from 'react'
import Overlay from 'Overlay'
import ModalPanel from 'Modal/ModalPanel'
import { Button } from 'goustouicomponents'
import PromoModalBody from './PromoModalBody'
import css from './PromoModal.css'
import AgeVerify from './AgeVerify'

class PromoModal extends React.Component {
  handleClick = () => {
    const { error, promoApply, justApplied } = this.props

    return (error || justApplied) ? Overlay.forceCloseAll() : promoApply()
  }

  render() {
    const { text, title, error, buttonText, needsAgeVerification, isAgeVerified, pending } = this.props

    return (
      <ModalPanel closePortal={() => this.handleClick()} closePortalFromButton={() => this.handleClick()} disableOverlay>
        <div className={css.body} data-testing="promoModal">
          <PromoModalBody title={title} text={text} error={error} />
          <span className={css.buttonContainer}>
            {needsAgeVerification && !error ? <AgeVerify /> : null}
            <Button
              className={css.buttonSegment}
              data-testing="promoModalButton"
              disabled={(needsAgeVerification && !isAgeVerified && !error) || pending}
              onClick={() => this.handleClick()}
              pending={pending}
            >
              {buttonText}
            </Button>
          </span>
        </div>
      </ModalPanel>
    )
  }
}

PromoModal.propTypes = {
  text: PropTypes.string,
  title: PropTypes.string,
  error: PropTypes.string,
  promoApply: PropTypes.func,
  needsAgeVerification: PropTypes.bool,
  isAgeVerified: PropTypes.bool,
  buttonText: PropTypes.string,
  pending: PropTypes.bool,
  justApplied: PropTypes.bool,
}

export default PromoModal
