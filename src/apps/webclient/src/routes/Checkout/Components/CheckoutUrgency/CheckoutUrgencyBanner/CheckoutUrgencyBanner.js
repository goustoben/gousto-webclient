import { Box, Color, Space, BorderStyle, Icon, AlignItems } from '@gousto-internal/citrus-react'
import React, { useContext } from 'react'
import { CheckoutUrgencyContext } from 'routes/Checkout/Components/CheckoutUrgency/CheckoutUrgencyContext'
import { formatSeconds } from '../checkoutUrgencyUtils'

export const CheckoutUrgencyBanner = () => {
  const remainingSeconds = useContext(CheckoutUrgencyContext)
  const formattedTime = formatSeconds(remainingSeconds)

  return (
    <Box paddingV={[2, 4, 8]} paddingH={[2, 0, 8]}>
      <Box
        display="flex"
        bg={Color.Warning_50}
        borderStyle={BorderStyle.Solid}
        borderColor={Color.Warning_100}
        borderWidth={0.5}
        borderRadius={3}
        paddingV={2}
        paddingH={2}
        alignItems={AlignItems.Center}
      >
        <Icon name="time" variant="Error" />

        <Space size={1} direction="horizontal" />
        <Box paddingV={1}>Checkout within {formattedTime} to avoid losing your recipes</Box>
      </Box>
    </Box>
  )
}
