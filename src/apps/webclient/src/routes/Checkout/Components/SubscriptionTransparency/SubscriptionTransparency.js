import {
  Box,
  Color,
  Icon,
  IconVariant,
  Text,
  FontFamily,
  Space,
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

    <Box paddingH={[0, 2]} display="flex">
      <Icon name="tick" variant={IconVariant.Confirmation} />
      <Space size={3} direction="horizontal" />
      <Box display="flex">
        <Text color={Color.Success_600} size={2} fontFamily={FontFamily.Bold}>
          No commitment. No cancellation fees.{' '}
        </Text>
        <Text size={2}>Skip a box or cancel your subscription online at anytime.</Text>
      </Box>
    </Box>
  </>
)
