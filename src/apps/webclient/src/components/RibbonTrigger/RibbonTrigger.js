import { useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

export const RibbonTrigger = ({
  name,
  probabilityPercentage,
  isRibbonTriggered,
  setRibbonTriggered,
}) => {
  useLayoutEffect(() => {
    if (isRibbonTriggered) {
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

    window.ribbon(window.ribbon.ribbonID, name)
    setRibbonTriggered()
  }, [name, isRibbonTriggered, setRibbonTriggered, probabilityPercentage])

  return null
}

RibbonTrigger.propTypes = {
  name: PropTypes.string.isRequired,
  probabilityPercentage: PropTypes.number,
  setRibbonTriggered: PropTypes.func.isRequired,
  isRibbonTriggered: PropTypes.bool,
}

RibbonTrigger.defaultProps = {
  probabilityPercentage: 100,
  isRibbonTriggered: false,
}
