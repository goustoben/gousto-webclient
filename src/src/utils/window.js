export function isWindowDefined() {
  return typeof global.window === 'object'
}

export function redirect(path) {
  global.window.location.assign(path)
}

export function replace(path) {
  global.window.location.replace(path)
}

export const documentLocation = () => (
  (global.window) ? global.window.document.location : {}
)

export function getDocumentElement(id) {
  return global.window.document.getElementById(id)
}

export function getWindow() {
  return global.window
}

export function windowLocation() {
  return global.window.location
}

/**
 * Opens new tab for Chrome, new window for Safari and Firefox.
 */
export function windowOpen(url) {
  global.window.open(url, '_blank', 'noopener noreferrer')
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
