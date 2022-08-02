import React from 'react'

import {
  Box,
  Button,
  Icon,
  IconVariant,
  ButtonVariant,
  ButtonColorVariant,
} from '@gousto-internal/citrus-react'

import { sendClientMetric } from 'routes/Menu/apis/clientMetrics'

import { use5RecipesAwareness } from '../use5RecipesAwareness'

import css from './FiveRecipesAwarenessBanner.css'

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
        <Icon name="info" variant={IconVariant.Informative} />
      </div>
      <div className={css.closeButtonContainer}>
        <Box>
          <Button
            title="Close Banner"
            onClick={() => onBannerClose()}
            variant={ButtonVariant.None}
            colorVariant={ButtonColorVariant.Tertiary}
          >
            <Icon name="close" />
          </Button>
        </Box>
      </div>

      <div className={css.textContainer}>
        <h4 className={css.headerTitle}>5 recipes, here we come!</h4>
        <p className={css.bodyText}>Choose up to 5 recipes each week.</p>
      </div>
    </div>
  )
}
