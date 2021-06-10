import { useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

export const HotjarTrigger = ({ name, shouldInvoke }) => {
  useLayoutEffect(() => {
    if (shouldInvoke && typeof window !== 'undefined' && window.hj) {
      window.hj('trigger', name)
    }
  }, [name, shouldInvoke])

  return null
}

HotjarTrigger.propTypes = {
  name: PropTypes.string.isRequired,
  shouldInvoke: PropTypes.bool,
}

HotjarTrigger.defaultProps = {
  shouldInvoke: true,
}
