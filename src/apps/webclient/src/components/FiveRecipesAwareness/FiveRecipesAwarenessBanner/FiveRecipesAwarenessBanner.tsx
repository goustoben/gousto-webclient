import React from 'react'

import { sendClientMetric } from 'routes/Menu/apis/clientMetrics'

import { use5RecipesAwareness } from '../use5RecipesAwareness'

import css from './FiveRecipesAwarenessBanner.css'

export const FiveRecipesAwarenessBanner = () => {
  const { isEnabled, hasClosedBanner, setBannerAsClosed, isNewUser } = use5RecipesAwareness()
  const [isOpen, updateIsOpen] = React.useState(false)

  React.useEffect(() => {
    if (isEnabled && !hasClosedBanner) {
      updateIsOpen(isEnabled && !hasClosedBanner)
    }
  }, [isEnabled, hasClosedBanner])

  const onModalClose = () => {
    setBannerAsClosed()
    updateIsOpen(false)
    sendClientMetric('my-deliveries-five-recipes-awareness-4M-2P', 1, 'Count')
  }

  if (isNewUser || !isOpen) {
    return null
  }

  return (
    <div className={css.container}>
      <div>
        <span className={css.infoIcon} />
      </div>
      <div
        className={css.closeButtonContainer}
        role="button"
        aria-label="close banner"
        tabIndex={0}
        onClick={() => onModalClose()}
        onKeyPress={() => {}}
      >
        <svg
          focusable="false"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          width="20"
          height="20"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z" />
          <title>Close Banner</title>
        </svg>
      </div>

      <div>
        <h4 className={css.headerTitle}>5 recipes, here we come!</h4>
        <p className={css.bodyText}>Choose up to 5 recipes each week.</p>
      </div>
    </div>
  )
}
