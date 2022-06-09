import React from 'react'

import mediumBanner from './assets/Banner_Medium.jpg'
import smallBanner from './assets/Banner_Small.jpg'

import css from './GradientMarketplaceHeader.css'

export const GradientMarketplaceHeader = () => (
  <picture>
    <source srcSet={mediumBanner} media="(min-width: 821px)" />
    <img className={css.gradientImage} src={smallBanner} alt="Gousto Market Bundles" />
  </picture>
)
