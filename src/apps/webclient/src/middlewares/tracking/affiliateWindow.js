import { canUseWindow } from 'utils/browserEnvironment'

export default (action, state = {}) => {
  if (canUseWindow() && window.dataLayer) {
    if (action.asource === 'awin' || (Array.isArray(action.asource) && action.asource.includes('awin'))) {
      const event = {
        eventType: 'affiliateEvent',
        ...action,
        asource: 'awin',
        state,
      }

      window.dataLayer.push(event)
    }
  }
}
