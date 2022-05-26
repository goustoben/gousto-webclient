import React from 'react'

import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'

import { Hero } from './Hero'

export const HeroContainer = (props) => {
  const isNewHeroLabelAndFooterEnabled = useIsOptimizelyFeatureEnabled(
    'beetroots_is_new_hero_label_and_footer_enabled',
  )

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Hero {...props} isNewHeroLabelAndFooterEnabled={isNewHeroLabelAndFooterEnabled} />
}
