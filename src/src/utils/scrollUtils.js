/* eslint-disable no-param-reassign */

/**
 * Polyfill for https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo
 */
export const elementScrollTo = (element, left, top) => {
  if (element.scrollTo) {
    element.scrollTo(left, top)
  } else {
    element.scrollLeft = left
    element.scrollTop = top
  }
}

/**
 * Polyfill for https://developer.mozilla.org/en-US/docs/Web/API/Element/scroll
 *
 * Supports only the `element.scroll(options)` case.
 */
export const elementScroll = (element, options) => {
  if (element.scroll) {
    element.scroll(options)
  } else {
    if ('left' in options) {
      element.scrollLeft = options.left
    }

    if ('top' in options) {
      element.scrollTop = options.top
    }
  }
}
