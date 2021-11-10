import ReactDOM from 'react-dom'
import scrollIntoView from 'scroll-into-view'
import { logger } from 'utils/logger'

export const DOMHelper = {
  getBoundingClientRect,
  getFirstMatchingNode,
  scrollToFirstMatchingNode,
  getElementHeight,
  getElementOffsetTop
}

export function getBoundingClientRect(ref) {
  let size = {}
  if (ref && ref.getBoundingClientRect) {
    size = ref.getBoundingClientRect()
  }

  return size
}

export function getFirstMatchingNode(keys = [], refs = {}) {
  let matchingNode

  const matchFound = keys.some(key => {
    if (refs[key]) {
      try {
        matchingNode = ReactDOM.findDOMNode(refs[key])
      } catch (err) {
        logger.warning(`getFirstMatchingNode: ${err}`)
      }
    }

    return matchingNode
  })

  return matchFound ? matchingNode : undefined
}

export function scrollToFirstMatchingNode(keys = [], refs = {}) {
  const firstFoundErrorEl = DOMHelper.getFirstMatchingNode(keys, refs)

  if (firstFoundErrorEl) {
    scrollIntoView(firstFoundErrorEl)
  } else {
    logger.warning('scrollToFirstMatchingNode: no matches found in refs')
  }
}

export function getElementHeight(document, selector) {
  return document && document.querySelector(selector) && document.querySelector(selector).offsetHeight
}

export function getElementOffsetTop(document, selector) {
  return document && document.querySelector(selector) && document.querySelector(selector).offsetTop
}

export const isNodeInRoot = (node, root) => {
  let parent = node
  while (parent) {
    if (parent === root) {
      return true
    }
    parent = parent.parentNode
  }

  return false
}
