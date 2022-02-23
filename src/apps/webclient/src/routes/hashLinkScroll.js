import { windowLocation, getDocumentElement } from 'utils/window'
import { canUseWindow } from 'utils/browserEnvironment'

export function hashLinkScroll() {
  if (canUseWindow()) {
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
