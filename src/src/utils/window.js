export function isWindowDefined() {
  return typeof window === 'object'
}

export function redirect(path) {
  window.location.assign(path)
}

export function replace(path) {
  window.location.replace(path)
}

export const documentLocation = () => (
  (document) ? document.location : {}
)

export function getDocumentElement(id) {
  return document.getElementById(id)
}

export function getWindow() {
  return window
}

export function windowLocation() {
  return window.location
}

/**
 * Opens new tab for Chrome, new window for Safari and Firefox.
 */
export function windowOpen(url) {
  window.open(url, '_blank', 'noopener noreferrer')
}

// eslint-disable-next-line import/no-default-export
export default {
  getWindow,
  documentLocation,
  redirect,
  windowLocation,
  getDocumentElement,
  windowOpen,
}
