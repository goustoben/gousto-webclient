import { Color } from '@gousto-internal/citrus-react'

import type { OrderState } from '../../../types'

export const ORDER_STATE_TO_COLOR_MAPPING: Record<OrderState, Color> = {
  cancelled: Color.Primary_500,
  confirmed: Color.ColdGrey_600,
  delivered: Color.Success_500,
  dispatched: Color.Success_500,
  'menu open': Color.Warning_500,
  'recipes chosen': Color.Success_500,
  scheduled: Color.Success_500,
}
