import React from 'react'

import { H3 } from 'Page/Header'

import { InfoToggle } from './InfoToggle'

import css from './SubHeader.css'

export const DeliveryInfo = ({ mobile = false }: { mobile: boolean }) => (
  <InfoToggle>
    <div className={mobile ? css.mobileDeliveryInfo : css.deliveryInfo}>
      <span>
        About Delivery <span className={css.iconArrowDown} />
      </span>
    </div>
    <div>
      <div className={css.tooltipTitle}>
        <H3 headlineFont defaults="md">
          How does delivery work?
        </H3>
      </div>
      <p className={css.tooltipText}>
        Our insulated box and ice packs help keep your food cool. And if you’re not home, we can
        leave your box in your chosen safe place.
      </p>
    </div>
  </InfoToggle>
)
