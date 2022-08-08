import React from 'react'

import {
  AlignItems,
  Box,
  Display,
  FlexDirection,
  FontFamily,
  Icon,
  IconVariant,
  JustifyContent,
  Space,
  Text,
} from '@gousto-internal/citrus-react'

import { useGetDiscountData } from './yourBoxHooks'

type BenefitItemProps = {
  accentText: string
  infoText: string
}

export const BenefitItem = ({ accentText, infoText }: BenefitItemProps) => (
  <Box
    display={Display.Flex}
    flexDirection={FlexDirection.Row}
    justifyContent={JustifyContent.FlexStart}
    alignItems={AlignItems.Center}
  >
    <Icon name="tick" variant={IconVariant.Confirmation} />
    <Text fontFamily={FontFamily.SemiBold} size={2}>
      {accentText}
    </Text>
    &nbsp;
    <Text fontFamily={FontFamily.UI} size={2}>
      {infoText}
    </Text>
  </Box>
)

export const Benefits = () => {
  const { isDiscountEnabled, discountTip, pricePerPortionDiscounted } = useGetDiscountData()

  return (
    <Box
      display={Display.Flex}
      flexDirection={FlexDirection.Column}
      justifyContent={JustifyContent.FlexStart}
      alignItems={AlignItems.FlexStart}
      paddingV={3}
      paddingBottom={0.5}
    >
      <BenefitItem accentText="No lock in:" infoText="pause or cancel for free anytime" />
      <Space size={2} />
      {isDiscountEnabled && discountTip ? (
        <BenefitItem
          accentText={`${discountTip}:`}
          infoText={`that’s £${pricePerPortionDiscounted} per serving`}
        />
      ) : null}
    </Box>
  )
}
