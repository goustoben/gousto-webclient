import React from 'react'
import { CTA, Modal, ModalHeader } from 'goustouicomponents'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { browserHistory } from 'react-router'

import css from './SubscriberPricingBannerModal.css'
import { SubscriberPricingInfoPanel } from '../../../AccountComponents/SubscriberPricingInfoPanel'

const MODAL_CONTENT = {
  active: {
    title: 'We\'ve lowered our prices with savings on every repeat order',
    body: 'By being a subscriber, you help us plan our food shop, so we can reduce food waste in our kitchen as well as yours.'
  },
  inactive: {
    title: 'We\'ve lowered our prices',
    body: 'And you can save even more by restarting your Gousto subscription.',
    subBody: 'You can edit your settings any time after you’ve restarted.'
  },
}

export const SubscriberPricingBannerModal = ({ showModal, updateShowModal, subscriptionStatus }) => {
  const reactivateSubscription = () => {
    browserHistory.push('/subscription-settings')
  }

  return (
    <div className={css.wrapper}>
      <Modal
        withOverlay
        isOpen={showModal}
        name="subscriber-pricing-banner-modal"
        description="Subscriber banner pricing modal"
        handleClose={() => updateShowModal(false)}
        variant="floating"
        animated={false}
        data-testing="subscriber-pricing-banner-modal"
      >
        <div className={classnames(
          css.backgroundHeader,
          {[subscriptionStatus === 'active' ? css.backgroundHeaderActive : css.backgroundHeaderInactive]: true}
        )}
        />
        <div className={css.headerWrapper}>
          <ModalHeader
            align="left"
            data-testing="resub-modal-header"
          >
            {MODAL_CONTENT[subscriptionStatus].title}
          </ModalHeader>
        </div>

        <div className={css.container}>
          <div className={css.copy}>
            <p>
              {MODAL_CONTENT[subscriptionStatus].body}
            </p>
          </div>

          <div className={subscriptionStatus === 'active' ? css.panelActive : css.panelInactive}>
            <SubscriberPricingInfoPanel variant="resubscribe" />
          </div>

          {subscriptionStatus === 'inactive' && <div className={css.subCopy}>{MODAL_CONTENT[subscriptionStatus].subBody}</div>}

          {
            subscriptionStatus === 'inactive' ? (
              <div className={css.ctaContainer}>
                <CTA data-testing="close-cta" variant="secondary" onClick={() => updateShowModal(false)}>
                  No thanks
                </CTA>
                <div className={css.secondCTA}>
                  <CTA
                    data-testing="reactivate-cta"
                    onClick={reactivateSubscription}
                  >
                    Restart my subscription
                  </CTA>
                </div>
              </div>
            ) : (
              <CTA
                variant="primary"
                onClick={() => updateShowModal(false)}
                isFullWidth
                data-testing="close-cta"
              >
                Done
              </CTA>
            )
          }
        </div>
      </Modal>
    </div>
  )
}

SubscriberPricingBannerModal.propTypes = {
  updateShowModal: PropTypes.func.isRequired,
  subscriptionStatus: PropTypes.string,
  showModal: PropTypes.bool.isRequired,
}

SubscriberPricingBannerModal.defaultProps = {
  subscriptionStatus: 'inactive',
}
