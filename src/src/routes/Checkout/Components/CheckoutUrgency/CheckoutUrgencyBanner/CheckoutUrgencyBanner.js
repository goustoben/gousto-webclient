import React, { useContext } from 'react'
import { CheckoutUrgencyContext } from 'routes/Checkout/Components/CheckoutUrgency/CheckoutUrgencyContext'
import Svg from 'Svg'
import {
  Box,
  Icon,
  IconVariant,
  FlexDirection,
  BorderScale,
  Color,
  AlignItems,
  JustifyContent,
  BorderStyle,
  Space,
  Text,
} from '@gousto-internal/citrus-react'
import { formatSeconds } from '../checkoutUrgencyUtils'
import css from './CheckoutUrgencyBanner.css'

export const CheckoutUrgencyBanner = () => {
  const remainingSeconds = useContext(CheckoutUrgencyContext)
  const formattedTime = formatSeconds(remainingSeconds)

  return (
    <div className={css.container}>
      <Box
        bg={Color.Warning_50}
        borderWidth={0.5}
        borderStyle={BorderStyle.Solid}
        borderColor={Color.Warning_100}
        borderRadius={2}
        paddingV={2}
        paddingH={2}
        display="flex"
        flexDirection={FlexDirection.Columm}
      >
        <Icon variant={IconVariant.Error} name="time" />
        <Space direction="horizontal" size={1} />
        <Text>Checkout within {formattedTime} to avoid losing your recipes</Text>
      </Box>
      {/* <div className={css.banner}>
          <div className={css.iconContainer}>
            <Svg className={css.icon} fileName="icon-timer-red" />
          </div>
          <div className={css.content}>
            Checkout within {formattedTime} to avoid losing your recipes
          </div>
        </div> */}
    </div>
  )
}
