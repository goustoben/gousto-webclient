import React from 'react'

import { sendClientMetric } from 'routes/Menu/apis/clientMetrics'

import { use5RecipesAwareness } from '../use5RecipesAwareness'

import css from './FiveRecipesAwarenessBanner.css'
import Svg from 'Svg'
import { Button } from '@gousto-internal/citrus-react'
import { Icon } from '@gousto-internal/citrus-react'


export const FiveRecipesAwarenessBanner = () => {
  const { isEnabled, hasClosedBanner, setBannerAsClosed } = use5RecipesAwareness()

  const onBannerClose = () => {
    setBannerAsClosed()
    sendClientMetric('my-deliveries-five-recipes-awareness-4M-2P', 1, 'Count')
  }

  if (!isEnabled || hasClosedBanner) {
    return null
  }

  return (
    <div className={css.container}>
      <div>
        <Svg fileName="icon-info-icon" />
      </div>
      <div
        className={css.closeButtonContainer}
        role="button"
        aria-label="close banner"
        tabIndex={0}
        onClick={() => onBannerClose()}
        onKeyPress={() => {}}
      >
        <Svg fileName="icon-close-banner" />
      </div>

      <div>
        <Icon />
        <Button />
        <h4 className={css.headerTitle}>5 recipes, here we come!</h4>
        <p className={css.bodyText}>Choose up to 5 recipes each week.</p>
      </div>
    </div>
  )
}
