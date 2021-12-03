import React, { useState } from 'react'
import { Heading } from 'goustouicomponents'
import Svg from 'Svg'
import PropTypes from 'prop-types'

import css from './SubscriberPricingBanner.module.css'
import { SubscriberPricingBannerModal } from './SubscriberPricingBannerModal'

const SubscriberPricingBanner = ({
  trackMyGoustoSubscriberPricingBannerClick,
  subscriptionStatus,
}) => {
  const [showModal, updateShowModal] = useState(false)
  const [showBanner, updateShowBanner] = useState(true)

  const handleCTAClick = () => {
    trackMyGoustoSubscriberPricingBannerClick()
    updateShowModal(true)
  }

  const handleClose = () => {
    updateShowBanner(false)
  }

  return showBanner ? (
    <div className={css.wrapper}>
      <div className={css.heading}>
        <Heading
          size="fontStyle2XL"
          type="h3"
        >
          We&apos;ve lowered our prices
        </Heading>
      </div>
      <p className={css.copy}>
        After the year we&apos;ve all had, we figured a win was in order.
      </p>

      <button data-testing="subscriber-pricing-cta" type="button" className={css.linkButton} onClick={handleCTAClick}>
        Find out more
        <Svg fileName="arrow-right" className={css.arrow} />
      </button>

      <button data-testing="close-banner-cta" type="button" className={css.linkButton} onClick={handleClose}>
        <Svg fileName="icon-close-new" className={css.close} />
      </button>

      <SubscriberPricingBannerModal
        showModal={showModal}
        updateShowModal={updateShowModal}
        subscriptionStatus={subscriptionStatus}
      />
    </div>
  ) : null
}

SubscriberPricingBanner.propTypes = {
  trackMyGoustoSubscriberPricingBannerClick: PropTypes.func,
  subscriptionStatus: PropTypes.string,
}

SubscriberPricingBanner.defaultProps = {
  trackMyGoustoSubscriberPricingBannerClick: () => {},
  subscriptionStatus: 'inactive',
}

export {
  SubscriberPricingBanner
}
