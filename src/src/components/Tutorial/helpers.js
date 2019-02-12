const DEFAULT_COORDINATES = { x: 0, y: 0 }

const getElementRectBySelector = selector => (
  document.querySelector(selector) ? document.querySelector(selector).getBoundingClientRect() : null
)

const getCenterFromElementRect = ({ x, y, width, height }) => ({
  x: window.scrollX + x + (width / 2),
  y: window.scrollY + y + (height / 2),
})

const getBottomFromElementRect = ({ x, y, width, height }) => ({
  x: window.scrollX + x + (width / 2),
  y: window.scrollY + y + height,
})

const getTopFromElementRect = ({ x, y, width }) => ({
  x: window.scrollX + x + (width / 2),
  y: window.scrollY + y,
})

const getViewportRect = () => ({
  left: window.scrollX,
  top: window.scrollY,
  right: window.scrollX + window.innerWidth,
  bottom: window.scrollY + window.innerHeight,
  center: window.scrollY + (window.innerHeight / 2),
})

const getTooltipDirection = ({ x, y, }, tooltipWidth) => {
  const viewportRect = getViewportRect()
  let direction

  if (y < viewportRect.center) {
    direction = 'top'
  } else {
    direction = 'bottom'
  }

  if (x < 0 + tooltipWidth) {
    direction += '-left'
  } else if (x > viewportRect.right - tooltipWidth) {
    direction += '-right'
  }

  return direction
}

const getTooltipLocation = (selector, arrowDirection) => {
  const elementRect = getElementRectBySelector(selector)
  const getDirectionFunction = arrowDirection.includes('top') ? getBottomFromElementRect : getTopFromElementRect

  return (elementRect) ? getDirectionFunction(elementRect) : DEFAULT_COORDINATES
}

const getTransformOffset = (direction) => {
  let x = -50,
    y = 0

  if (direction.includes('bottom')) {
    y = -100
  }

  if (direction.includes('right')) {
    x = -85
  } else if (direction.includes('left')) {
    x = -15
  }

  return { x, y }
}

export const getSpotlightLocation = (selector) => {
  const elementRect = getElementRectBySelector(selector)

  return (elementRect) ? getCenterFromElementRect(elementRect) : DEFAULT_COORDINATES
}

export const getTooltipProperties = (selector, width) => {
  const elementRect = getElementRectBySelector(selector)
  const arrowDirection = getTooltipDirection(elementRect, width)
  const location = getTooltipLocation(selector, arrowDirection)
  const offset = getTransformOffset(arrowDirection)

  return {
    style: {
      top: `${location.y}px`,
      left: `${location.x}px`,
      transform: `translate(${offset.x}%, ${offset.y}%)`,
      width,
    },
    arrow: arrowDirection,
  }
}
