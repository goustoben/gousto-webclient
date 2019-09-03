const DEFAULT_COORDINATES = { x: 0, y: 0 }
const TOOLTIP_WIDTH = 300

const checkIfSelectorExists = (selector) => {
  return selector && document.querySelector(selector) ? document.querySelector(selector).getBoundingClientRect() : null
}

export const checkIfElementIsVisible = (selector) => {
  const elementRectBySelector = checkIfSelectorExists(selector)
  if (typeof (document) !== 'undefined' && elementRectBySelector) {
    const { top } = elementRectBySelector
    if ((200 < top - 200 < window.innerHeight || top + 200 < window.innerHeight) && top < window.innerHeight) {
      return true
    }
  }

  return false
}

export const getCoordinatesElement = ({ right, left }) => {
  const rightCoordinate = right > TOOLTIP_WIDTH / 2 ? 0 : 'initial'
  const leftCoordinate = left < TOOLTIP_WIDTH / 2 ? 0 : 'initial'

  return ({
    right: rightCoordinate,
    left: leftCoordinate
  })
}

export const getTooltipLocation = (elementRect, arrowDirection) => {

  return (elementRect && arrowDirection) ? getCoordinatesElement(elementRect, arrowDirection) : DEFAULT_COORDINATES
}

export const getTooltipProperties = (selector) => {
  const elementRect = checkIfSelectorExists(selector)
  const location = elementRect && getTooltipLocation(elementRect, 'bottom')

  return elementRect ? {
    style: {
      position: 'absolute',
      right: location.right,
      left: location.left,
      bottom: '30px'
    },
    arrow: 'bottom',
    arrowStyle: {
      right: location.right,
      left: location.left === 0 ? `${location.left + elementRect.width / 2}px` : location.left,
    }
  } : null
}
