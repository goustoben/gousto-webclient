export const mockSnowplowCallbackAPI = () => {
  // See documentation link in getSnowplowDomainUserId().
  window.snowplow = jest.fn((callback) => {
    const cf = {
      getDomainUserId() {
        return 'snowplowUserId'
      }
    }
    const trackerHolder = { cf }
    callback.apply(trackerHolder)
  })
}
