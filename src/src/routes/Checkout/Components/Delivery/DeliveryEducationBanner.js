import React from 'react'
import css from './Delivery.module.css'

const DeliveryEducationBanner = () => (
  <div className={css.deliveryEducationBanner}>
    <div className={css.deliverySection}>
      <div className={css.insulatedPackaging} />
      <p>Insulated packaging keeps your ingredients fresh for up to 12 hours.</p>
    </div>
    <div className={css.deliverySection}>
      <div className={css.deliverySlot} />
      <p>Delivery slot updates on the day via text and email.</p>
    </div>
  </div>
)

export { DeliveryEducationBanner }
