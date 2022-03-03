import {
  Box,
  Color,
  Icon,
  IconVariant,
  Text,
  FontFamily,
  Space,
  JustifyContent,
  AlignItems,
} from '@gousto-internal/citrus-react'

import React from 'react'
import Svg from 'Svg'
import css from './SubscriptionTransparency.css'

export const SubscriptionTransparency = () => (
  <>
    <div className={css.container}>
      <Svg className={css.tick} fileName="icon-success-tick" />
      <div className={css.text}>
        <span className={css.highlighted}>No commitment. No cancellation fees.</span>{' '}
        <span>Skip a box or cancel your subscription online at anytime.</span>
      </div>
    </div>

    <Box
      paddingH={[0]}
      display="flex"
      justifyContent={JustifyContent.Center}
      maxWidth={['25.6rem']}
      alignItems={AlignItems.Center}
      textAlign="center"
    >
      <Box>
        <Icon name="tick" variant={IconVariant.Confirmation} />
        <Space size={1} direction="horizontal" />
      </Box>

      <Text size={2} textAlign="center">
        <Text fontWeight={FontFamily.Bold} color={Color.Success_600} display="inline-block">
          No commitment. No cancellation fees.
        </Text>{' '}
        Skip a box or cancel your subscription online at anytime.
      </Text>
    </Box>
  </>
)
