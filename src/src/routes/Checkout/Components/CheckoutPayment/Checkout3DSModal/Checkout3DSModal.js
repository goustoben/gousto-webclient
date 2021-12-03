import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Overlay from 'components/Overlay'
import ModalPanel from 'Modal/ModalPanel'
import { getUrlParams } from 'utils/url'

import css from './Checkout3DSModal.module.css'

class Checkout3DSModal extends PureComponent {
  onIframeLoad = (e) => {
    try {
      const url = e.target.contentWindow.location.href
      this.onFrameUrlChange(url)
    } catch (e) {
      // challenge URL is always on another domain (i.e. bank)
      // because of this we will always get cross site reference scripting security restrictions
    }
  }

  onFrameUrlChange(url) {
    const { onChallengeDone } = this.props
    const sessionIdName = 'cko-session-id'
    let sessionId

    if (url.indexOf(sessionIdName) >= 0) {
      sessionId = getUrlParams(url)[sessionIdName]
      onChallengeDone(sessionId)
    }
  }

  render() {
    const { challengeURL, isOpen } = this.props
    const showIframe = !!challengeURL && isOpen

    return (
      <Overlay open={isOpen} from="top">
        <ModalPanel
          className={css.modal}
          containerClassName={css.modalContainer}
          disableClickOutside
          disableOverlay
          showCloseButton={false}
        >
          <h4 className={css.heading}>Card verification</h4>
          <div className={css.modalContent}>
            <p>
              You&apos;re almost there, Your bank will now verify your card details. If you&apos;re
              experiencing difficulties, please contact your bank.
            </p>
            {showIframe && (
              <iframe
                src={challengeURL}
                onLoad={this.onIframeLoad}
                className={css.frame}
                title="3DS frame"
              />
            )}
          </div>
        </ModalPanel>
      </Overlay>
    )
  }
}

Checkout3DSModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  challengeURL: PropTypes.string,
  onChallengeDone: PropTypes.func.isRequired,
}

Checkout3DSModal.defaultProps = {
  challengeURL: '',
}

export { Checkout3DSModal }
