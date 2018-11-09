export default (action, state = {}) => {
  if (__CLIENT__ && window.dataLayer) {
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
