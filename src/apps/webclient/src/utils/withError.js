import React from 'react'

import ErrorPage from 'ErrorPage'

export function withError(WrappedComponent, options = {}) {
  // eslint-disable-next-line react/prop-types
  const component = ({ error, ...props }) => {
    const errorProp = error || (options.errorProp && options.errorProp(props))

    // eslint-disable-next-line react/jsx-props-no-spreading
    return errorProp ? <ErrorPage /> : <WrappedComponent {...props} />
  }
  component.displayName = `withError(${WrappedComponent.displayName})`

  return component
}
