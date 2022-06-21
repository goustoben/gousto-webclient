import React from 'react'

import {
  Box,
  Icon,
  Text,
  Color,
  Display,
  AlignItems,
  JustifyContent,
  FontFamily,
  FontWeight,
  IconVariant,
} from '@gousto-internal/citrus-react'
import { useDispatch } from 'react-redux'

import { trackClickSubheadingBanner } from './highlightChoiceActions'
import { useIsHighlightChoiceFeatureEnabled } from './highlightChoiceHooks'

export const HighlightChoiceBanner = () => {
  const dispatch = useDispatch()
  const isHighlightChoiceFeatureEnabled = useIsHighlightChoiceFeatureEnabled()

  const dispatchTrackClickSubheadingBanner = () => dispatch(trackClickSubheadingBanner())

  if (!isHighlightChoiceFeatureEnabled) {
    return null
  }

  return (
    <Box
      paddingV={0}
      paddingBottom={4}
      display={Display.Flex}
      justifyContent={[
        JustifyContent.Center,
        JustifyContent.FlexStart,
        JustifyContent.FlexStart,
        JustifyContent.FlexStart,
      ]}
      data-testid="HighlightChoiceBannerContainer"
      onClick={dispatchTrackClickSubheadingBanner}
    >
      <Box
        bg={Color.Success_50}
        width="19rem"
        height="2.5rem"
        display={Display.Flex}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
        gap="0.75rem"
        style={{ borderRadius: '3rem' }}
      >
        <Icon name="meals_per_box" size={6} variant={IconVariant.Confirmation} />
        <Text
          color={Color.ColdGrey_800}
          fontFamily={FontFamily.UI}
          fontWeight={FontWeight.Normal}
          size={2}
        >
          28+ veggie and 10+ vegan recipes
        </Text>
      </Box>
    </Box>
  )
}
