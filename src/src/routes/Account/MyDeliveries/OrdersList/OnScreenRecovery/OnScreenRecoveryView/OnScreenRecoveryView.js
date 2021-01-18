import PropTypes from 'prop-types'
import React from 'react'
import { Modal, CTA, ModalHeader } from 'goustouicomponents'
import Svg from 'Svg'
import classnames from 'classnames'
import css from './OnScreenRecoveryView.css'
import { SubscriberPricingInfoPanel } from '../../../../AccountComponents/SubscriberPricingInfoPanel'

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
  trackViewDiscountReminder: PropTypes.func.isRequired,
  isSubscriberPricingEnabled: PropTypes.bool,
  isMobileViewport: PropTypes.bool,
}

const defaultProps = {
  offer: {
    message: '',
  },
  title: '',
  keepCopy: '',
  confirmCopy: '',
  triggered: false,
  isSubscriberPricingEnabled: false,
  isMobileViewport: false,
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
    const { onKeep, onConfirm, offer, title, keepCopy, confirmCopy, isSubscriberPricingEnabled, isMobileViewport } = this.props

    return (
      <Modal
        isOpen
        variant={isMobileViewport && isSubscriberPricingEnabled ? 'bottomSheet' : 'floating'}
        name="pause-discount"
        description="modal attempting to prevent sub pause"
        handleClose={this.handleModalClose}
      >
        {
          isSubscriberPricingEnabled && (
            <ModalHeader
              withSeparator
              align="left"
            >
              {title}
            </ModalHeader>
          )
        }
        <div className={css.container}>
          {!isSubscriberPricingEnabled && <div className={css.backgroundHeader} data-testing="modal-background-header" />}
          <div className={css.bodyContainer}>
            {!isSubscriberPricingEnabled && <h2 className={css.header}>{title}</h2>}
            {
              offer && (
                <div className={classnames(css.discountDetails, { [css.discountDetailsSubscriberPricing]: isSubscriberPricingEnabled })}>
                  <div className={css.discountIconContainer}>
                    <Svg fileName="pause-osr-modal-icon" className={css.discountIcon} />
                  </div>
                  <h4 className={css.subHeader} data-testing="pause-discount-offer">{offer.message}</h4>
                </div>
              )
            }
            {
              isSubscriberPricingEnabled && <SubscriberPricingInfoPanel variant={offer ? 'offer' : 'noOffer' } />
            }
            <div className={css.ctaContainer}>
              <div className={css.keepCta}>
                <CTA
                  size="small"
                  testingSelector="keep-subscription-link"
                  onClick={onKeep}
                  isFullWidth
                >
                  {keepCopy}
                </CTA>
              </div>
              <CTA
                size="small"
                testingSelector="continue-to-pause-link"
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
