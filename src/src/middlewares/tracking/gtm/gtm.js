export const gtmMiddleware = (action) => {
  if (__CLIENT__ && window.dataLayer) {
    if (action.gtmEvent) {
      window.dataLayer.push(action.gtmEvent)
    }
  }
}