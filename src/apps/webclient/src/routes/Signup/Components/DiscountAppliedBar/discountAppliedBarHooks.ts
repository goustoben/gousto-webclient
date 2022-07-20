import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { useDiscountDescriptor } from 'routes/Menu/components/BoxSummary/Banner/PriceAndDiscountTip/priceAndDiscountTipUtils'

import { formatDiscountTip } from './discountAppliedBarUtils'

export const useDiscountAppliedData = () => {
  const isHighlightDiscountExperimentEnabled = useIsOptimizelyFeatureEnabled(
    'beetroots_highlight_discount_web_enabled',
  )
  const discountDescriptor = useDiscountDescriptor()
  const { isDiscountEnabled } = discountDescriptor
  const discountTip = formatDiscountTip(discountDescriptor)

  return {
    isHighlightDiscountExperimentEnabled,
    discountTip,
    isDiscountEnabled,
  }
}
