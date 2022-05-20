import React from 'react'
import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { PriceComparisonTable } from 'routes/Home/PriceComparisonTable/PriceComparisonTable'

export function PriceComparisonTableContainer() {
  const isPriceComparisonTableEnabled = useIsOptimizelyFeatureEnabled(
    'beetroots_price_comparison_table_web_enabled',
  )

  return isPriceComparisonTableEnabled ? <PriceComparisonTable /> : null
}
