import React from 'react'
import { useIsOptimizelyFeatureEnabled } from './index'

type OptimizelyFeatureProps = {
  enabled: boolean,
  children: React.ReactNode,
  name: string,
}

export const OptimizelyFeature = ({
  name,
  enabled = false,
  children,
}: OptimizelyFeatureProps) => {
  const isFeatureEnabled = useIsOptimizelyFeatureEnabled(name)

  if (isFeatureEnabled === enabled) {
    return <>{children}</>
  }

  return null
}
