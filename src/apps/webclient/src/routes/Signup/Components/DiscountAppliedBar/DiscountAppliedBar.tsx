import React, { useState, useEffect } from 'react'

import {
  Box,
  Text,
  Icon,
  Color,
  Display,
  FlexDirection,
  JustifyContent,
  AlignItems,
  BorderStyle,
  IconVariant,
  FontFamily,
  Position,
} from '@gousto-internal/citrus-react'

import { useGetDiscountAppliedBarData } from './discountAppliedBarHooks'

interface Props {
  wizardStep: string
}

export const DiscountAppliedBar = ({ wizardStep }: Props) => {
  const {
    isDiscountAppliedBarDismissed,
    promoModalVisible,
    isPromoBarHidden,
    dispatchDismissSignupDiscountAppliedBar,
    dispatchTrackDiscountVisibilityBannerAppearance,
  } = useGetDiscountAppliedBarData(wizardStep)

  const [hidden, setHidden] = useState(
    isDiscountAppliedBarDismissed || promoModalVisible || isPromoBarHidden,
  )

  useEffect(() => {
    if (hidden) {
      dispatchTrackDiscountVisibilityBannerAppearance()
    }

    setHidden(isPromoBarHidden)
  }, [isPromoBarHidden, dispatchTrackDiscountVisibilityBannerAppearance, hidden, wizardStep])

  const onClose = () => {
    setHidden(true)
    dispatchDismissSignupDiscountAppliedBar()
  }

  if (hidden) {
    return null
  }

  return (
    <Box paddingV={0} paddingBottom={[4, 8, 8, 8]} width="100%">
      <Box
        width="100%"
        display={Display.Flex}
        flexDirection={FlexDirection.Row}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
        minHeight="3.25rem"
        paddingH={[3, 0, 0, 0]}
        paddingRight={[8, 0, 0, 0]}
        paddingV={[4, 4, 4, 4]}
        bg={Color.Success_50}
        borderStyle={BorderStyle.Solid}
        borderWidth={0.5}
        borderColor={Color.Success_800}
      >
        <Position position="relative">
          <Box paddingH={3} paddingRight={0}>
            <Icon name="success" variant={IconVariant.Confirmation} size={6} />
          </Box>
          <Text fontFamily={FontFamily.UI} size={2}>
            Discount Text
            <Text fontFamily={FontFamily.SemiBold} size={2}>
              discount 50%
            </Text>
          </Text>
          <Position position="absolute" right="0.75rem">
            <Icon name="close" size={6} onClick={onClose} style={{ cursor: 'pointer' }} />
          </Position>
        </Position>
      </Box>
    </Box>
  )
}
