import React from 'react'
import { useIsActionBarRedesignEnabled } from 'routes/Menu/hooks/useIsActionBarRedesignEnabled'

export const withIsActionBarRedesignEnabled = (Component) => {
  const Wrapper = (props) => {
    const isActionBarRedesignEnabled = useIsActionBarRedesignEnabled()

    // This is a higher-order component, eslint shouldn't worry about prop
    // spreading.

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...props} isActionBarRedesignEnabled={isActionBarRedesignEnabled} />
  }

  Wrapper.displayName = `withIsActionBarRedesignEnabled(${Component.displayName})`

  return Wrapper
}
