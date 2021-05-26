import { useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

export const HotjarTrigger = ({ name }) => {
  useLayoutEffect(() => {
    if (typeof window !== 'undefined' && window.hj) {
      window.hj('trigger', name)
    }
  }, [name])

  return null
}

HotjarTrigger.propTypes = {
  name: PropTypes.string.isRequired,
}
