import { windowLocation, getDocumentElement } from 'utils/window'
import globals from 'config/globals'

export function hashLinkScroll() {
  if (globals.client) {
    const {hash} = windowLocation()
    if (hash) {
      const id = hash.replace('#', '')
      const element = getDocumentElement(id)
      if (element) {
        element.scrollIntoView()

        return true
      }
    }
  }

  return false
}
