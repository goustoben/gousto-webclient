import React, { useContext } from 'react'
import { CheckoutUrgencyContext } from 'routes/Checkout/Components/CheckoutUrgency/CheckoutUrgencyContext'
import Svg from 'Svg'
import { formatSeconds } from '../checkoutUrgencyUtils'
import css from './CheckoutUrgencyBanner.css'
import {
  Badge,
  Box,
  Color,
  Space,
  Display,
  AlignItems,
  JustifyContent,
} from '@gousto-internal/citrus-react'

// export const CheckoutUrgencyBanner = () => {
//   const remainingSeconds = useContext(CheckoutUrgencyContext)
//   const formattedTime = formatSeconds(remainingSeconds)

//   return (
//     <div className={css.container}>
//       <div className={css.banner}>
//         <div className={css.iconContainer}>
//           <Svg className={css.icon} fileName="icon-timer-red" />
//         </div>
//         <div className={css.content}>
//           Checkout within {formattedTime} to avoid losing your recipes
//         </div>
//       </div>
//     </div>
//   )
// }

export const CheckoutUrgencyBanner = () => {
  const remainingSeconds = useContext(CheckoutUrgencyContext)
  const formattedTime = formatSeconds(remainingSeconds)

  return (
    <Box bg={Color.Warning_50} borderWidth={3} borderColor={Color.Warning_200}>
      <Box className={css.container} paddingV={1} display="flex" alignItems={AlignItems.Center}>
        <Box>
          <Svg className={css.icon} fileName="icon-timer-red" />
        </Box>
        <Space size={1} direction="horizontal" />
        <Box paddingV={(0, 1)}> Checkout within {formattedTime} to avoid losing your recipes</Box>
      </Box>
    </Box>
  )
}
