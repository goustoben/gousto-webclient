export const gtmMiddleware = (action) => {
  if (__CLIENT__ && global.window && global.window.dataLayer) {
    if (action.gtmEvent) {
      global.window.dataLayer.push(action.gtmEvent)
    }
  }
}
