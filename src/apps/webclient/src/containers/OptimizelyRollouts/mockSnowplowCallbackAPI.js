export const mockSnowplowCallbackAPI = (returnedId) => {
  // See documentation link in getSnowplowDomainUserId().
  window.snowplow = jest.fn((callback, ...args) => {
    const cf = {
      getDomainUserId() {
        return returnedId
      }
    }
    const trackerHolder = { cf }
    callback.call(trackerHolder, ...args)
  })
}
