import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { DeliveryCard } from 'routes/Checkout/Components/Delivery/DeliveryCard'
import css from './SocialBelongingBanner.css'

export const SocialBelongingBanner = ({ amountOfCustomers, district, trackBannerAppearance }) => {
  useEffect(trackBannerAppearance, [trackBannerAppearance])

  return (
    <div className={css.socialBelongingContainer}>
      <DeliveryCard
        iconName="icon-serving-size-blue"
        cardStyle="blue"
        customClass={css.socialPadding}
      >
        <span className={css.bold}>
          Join our community of {amountOfCustomers.toLocaleString()} Gousto customers in {district}{' '}
          today!
        </span>
      </DeliveryCard>
    </div>
  )
}

SocialBelongingBanner.propTypes = {
  amountOfCustomers: PropTypes.number.isRequired,
  district: PropTypes.string.isRequired,
  trackBannerAppearance: PropTypes.func.isRequired,
}
