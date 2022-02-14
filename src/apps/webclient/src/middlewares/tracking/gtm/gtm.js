import { canUseWindow } from 'utils/browserEnvironment'

export const gtmMiddleware = (action) => {
  if (canUseWindow() && window.dataLayer) {
    if (action.gtmEvent) {
      window.dataLayer.push(action.gtmEvent)
    }
  }
}
