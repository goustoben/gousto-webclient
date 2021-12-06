import React from 'react'

import ErrorPage from 'ErrorPage'

export function withError(WrappedComponent, options = {}) {
  return ({ error, ...props }) => { // eslint-disable-line react/prop-types
    const errorProp = error || options.errorProp && options.errorProp(props)

    return (errorProp)
      ? <ErrorPage />
      : <WrappedComponent {...props} />
  }
}
