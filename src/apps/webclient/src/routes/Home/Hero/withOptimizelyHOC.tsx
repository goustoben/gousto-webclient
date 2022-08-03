import React, { ComponentType } from 'react'

import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts/useOptimizely.hook'

/**
 * Fetches Optimizely feature flag status and passes it down to the Wrapped component
 * @param WrappedComponent<Props> a component, wrapped with the withOptimizelyHOC
 * @param featureFlag a feature flag name from Optimizely
 * @returns WrappedComponent<Props & { isOptimizelyFeatureEnabled: boolean }>
 */
export const withOptimizelyHOC =
  <Props extends object>(WrappedComponent: ComponentType<Props>, featureFlag: string) =>
  /* eslint-disable-next-line react/display-name */
  (props: Props) => {
    const isOptimizelyFeatureEnabled = useIsOptimizelyFeatureEnabled(featureFlag)

    /* eslint-disable-next-line react/jsx-props-no-spreading */
    return <WrappedComponent {...props} isOptimizelyFeatureEnabled={isOptimizelyFeatureEnabled} />
  }
