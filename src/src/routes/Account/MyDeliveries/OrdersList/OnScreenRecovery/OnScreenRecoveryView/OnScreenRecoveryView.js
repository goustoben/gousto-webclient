import PropTypes from 'prop-types'
import React from 'react'
import { Modal, CTA } from 'goustouicomponents'
import Svg from 'Svg'
import css from './OnScreenRecoveryView.css'

const propTypes = {
  offer: PropTypes.shape({
    message: PropTypes.string,
    formatted_value: PropTypes.string,
    raw_message: PropTypes.shape({
      text: PropTypes.string,
      values: PropTypes.shape({
        date: PropTypes.string,
        value: PropTypes.string,
      }),
    }),
  }),
  onConfirm: PropTypes.func.isRequired,
  onKeep: PropTypes.func.isRequired,
  title: PropTypes.string,
  keepCopy: PropTypes.string,
  confirmCopy: PropTypes.string,
  triggered: PropTypes.bool,
  getRecoveryContent: PropTypes.func.isRequired,
  modalVisibilityChange: PropTypes.func.isRequired,
  trackViewDiscountReminder: PropTypes.func.isRequired
}

const defaultProps = {
  offer: {
    message: '',
  },
  title: '',
  keepCopy: '',
  confirmCopy: '',
  triggered: false,
}

export class OnScreenRecoveryView extends React.Component {
  componentDidMount() {
    const { trackViewDiscountReminder } = this.props
    trackViewDiscountReminder()
  }

  componentDidUpdate(prevProps) {
    const { triggered, getRecoveryContent } = this.props

    if (triggered && (prevProps.triggered !== triggered)) {
      getRecoveryContent()
    }
  }

  handleModalClose = () => {
    const { modalVisibilityChange } = this.props
    modalVisibilityChange({ modalVisibility: false, modalType: 'subscription' })
  }

  render() {
    const { onKeep, onConfirm, offer, title, keepCopy, confirmCopy } = this.props

    return (
      <Modal
        isOpen
        variant="floating"
        name="pause-discount"
        description="modal attempting to prevent sub pause"
        handleClose={this.handleModalClose}
      >
        <div className={css.container}>
          <div className={css.backgroundHeader} />
          <div className={css.bodyContainer}>
            <h2 className={css.header}>{title}</h2>
            {
              offer && (
                <div className={css.discountDetails}>
                  <div className={css.discountIconContainer}>
                    <Svg fileName="pause-osr-modal-icon" className={css.discountIcon} />
                  </div>
                  <h4 className={css.subHeader}>{offer.message}</h4>
                </div>
              )
            }
            <div className={css.ctaContainer}>
              <div className={css.keepCta}>
                <CTA
                  size="small"
                  data-testing="keep-subscription-link"
                  onClick={onKeep}
                  isFullWidth
                >
                  {keepCopy}
                </CTA>
              </div>
              <CTA
                size="small"
                data-testing="continue-to-pause-link"
                onClick={onConfirm}
                variant="secondary"
                isFullWidth
              >
                {confirmCopy}
              </CTA>
            </div>
          </div>

        </div>
      </Modal>
    )
  }
}

OnScreenRecoveryView.propTypes = propTypes

OnScreenRecoveryView.defaultProps = defaultProps
