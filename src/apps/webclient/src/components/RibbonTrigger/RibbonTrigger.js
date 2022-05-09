import { useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

export const RibbonTrigger = ({
  name,
  probabilityPercentage,
  isRibbonTriggered,
  setRibbonTriggered,
  shouldLimitToOncePerSession,
}) => {
  useLayoutEffect(() => {
    if (shouldLimitToOncePerSession && isRibbonTriggered) {
      return
    }

    if (!(name && typeof window !== 'undefined' && window.ribbon)) {
      return
    }

    const flip = Math.random() * 100
    const shouldTrigger = flip < probabilityPercentage
    if (!shouldTrigger) {
      return
    }

    window.ribbon('trigger', name)
    if (setRibbonTriggered) {
      setRibbonTriggered()
    }
  }, [
    name,
    isRibbonTriggered,
    setRibbonTriggered,
    probabilityPercentage,
    shouldLimitToOncePerSession,
  ])

  return null
}

RibbonTrigger.propTypes = {
  name: PropTypes.string.isRequired,
  probabilityPercentage: PropTypes.number,
  setRibbonTriggered: PropTypes.func,
  isRibbonTriggered: PropTypes.bool,
  shouldLimitToOncePerSession: PropTypes.bool,
}

RibbonTrigger.defaultProps = {
  setRibbonTriggered: null,
  probabilityPercentage: 100,
  isRibbonTriggered: false,
  shouldLimitToOncePerSession: false,
}
