import { trackSubscriptionSettingsChange } from '../subscriptionSettings'
import snowplowTracker from '../../../../../middlewares/tracking/snowplow'
jest.mock('../../../../../middlewares/tracking/snowplow')

describe('Given trackSubscriptionSettingsChange', () => {
  let windowSpy
  const settingName = 'subscription'
  const action = 'edit'
  describe('And window is not defined', () => {
    beforeEach(() => {
      windowSpy = jest.spyOn(global, 'window', 'get')
      windowSpy.mockImplementation(() => undefined)
    })

    describe('When only actionType is sent as param', () => {
      beforeEach(() => {
        trackSubscriptionSettingsChange({ settingName, action })()
      })

      test('Then snowplowTracker is called with pathname server-side', () => {
        expect(snowplowTracker).toHaveBeenCalledWith({
          actionType: 'subscription_edit',
          seCategory: 'SubscriptionSettingsPage'
        }, {
          pathname: 'server-side'
        })
      })
    })

    describe('When trackSubscriptionSettingsChange is called with data', () => {
      const data = {
        property_one: 'data'
      }
      beforeEach(() => {
        trackSubscriptionSettingsChange({ settingName, action })(data)
      })

      test('Then snowplowTracker is called the extra data', () => {
        expect(snowplowTracker).toHaveBeenCalledWith({
          actionType: 'subscription_edit',
          seCategory: 'SubscriptionSettingsPage',
          property_one: 'data'
        }, {
          pathname: 'server-side'
        })
      })
    })
  })

  describe('And window is defined', () => {
    beforeEach(() => {
      windowSpy = jest.spyOn(global, 'window', 'get')
      windowSpy.mockImplementation(() => ({
        location: {
          pathname: '/subscription'
        }
      }))
    })

    describe('When trackSubscriptionSettingsChange is called', () => {
      beforeEach(() => {
        trackSubscriptionSettingsChange({ settingName, action })()
      })

      test('Then snowplowTracker is called with the pathname', () => {
        expect(snowplowTracker).toHaveBeenCalledWith({
          actionType: 'subscription_edit',
          seCategory: 'SubscriptionSettingsPage',
        }, {
          pathname: '/subscription'
        })
      })
    })
  })
})
