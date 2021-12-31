import React, { useContext } from 'react'
import { CheckoutUrgencyContext } from 'routes/Checkout/Components/CheckoutUrgency/CheckoutUrgencyContext'
import { jsx } from '@emotion/react'
import { Icon, Box, Text } from '@gousto-internal/zest-react'
import Svg from 'Svg'
import { formatSeconds } from '../checkoutUrgencyUtils'
import css from './CheckoutUrgencyBanner.css'

export const CheckoutUrgencyBanner = () => {
  const remainingSeconds = useContext(CheckoutUrgencyContext)
  const formattedTime = formatSeconds(remainingSeconds)

  return (
    <div className={css.container}>
      <Box
        bg="Warning_50"
        borderColor="Warning_100"
        borderStyle="solid"
        borderWidth={0.5}
        borderRadius={2}
        paddingV={2.5}
        paddingH={2.5}
        display="flex"
      >
        <Icon name="time" size={5} variant="Error" style={{ marginRight: '0.5rem' }} />
        <Text>Checkout within {formattedTime} to avoid losing your recipes</Text>
      </Box>
    </div>
  )
}
