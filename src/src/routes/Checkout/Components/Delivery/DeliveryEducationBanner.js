import React from 'react'
import {
  Box,
  Text,
  Color,
  BorderStyle,
  FlexDirection,
  Icon,
  Space,
} from '@gousto-internal/citrus-react'
import css from './Delivery.css'
const DeliveryEducationBanner = () => (
  <>
    <Box
      bg={Color.Informative_50}
      borderStyle={BorderStyle.Solid}
      borderColor={Color.Informative_200}
      borderRadius={2}
      borderWidth={0.5}
      paddingV={4}
      paddingH={4}
    >
      <Box display="flex" flexDirection={FlexDirection.Row}>
        <Icon name="delivery" />
        <Space direction="horizontal" size={3} />
        <Text>Insulated packaging keeps your ingredients fresh for up to 12 hours.</Text>
      </Box>
      <Space size={3} />
      <Box display="flex" flexDirection={FlexDirection.Row}>
        <Icon name="cool" />
        <Space direction="horizontal" size={3} />
        <Text>Delivery slot updates on the day via text and email.</Text>
      </Box>
    </Box>
    {/* <div className={css.deliveryEducationBanner}>
      <div className={css.deliverySection}>
        <div className={css.insulatedPackaging} />
        <p>Insulated packaging keeps your ingredients fresh for up to 12 hours.</p>
      </div>
      <div className={css.deliverySection}>
        <div className={css.deliverySlot} />
        <p>Delivery slot updates on the day via text and email.</p>
      </div>
    </div> */}
  </>
)

export { DeliveryEducationBanner }
