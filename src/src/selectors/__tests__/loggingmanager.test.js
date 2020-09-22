import Immutable from 'immutable'
import {
  getGoustoAppEventName,
  getEventErrorMessage,
  showEventPending,
  showEventSent
} from '../loggingmanager'

describe('loggingmanager selector', () => {
  describe('getGoustoAppEventName', () => {
    beforeAll(() => {
      window.navigatorBackup = window.navigator

      delete window.navigator

      window.navigator = {
        userAgent: '',
      }
    })

    afterAll(() => {
      window.navigator = window.navigatorBackup
    })

    describe('when user agent is android', () => {
      let expected

      beforeEach(() => {
        window.navigator.userAgent = 'Android'
        expected = getGoustoAppEventName()
      })

      test('send-gousto-app-link-play-store-sms is returned', () => {
        expect(expected).toBe('send-gousto-app-link-play-store-sms')
      })
    })

    describe('when user agent is iPhone', () => {
      let expected

      beforeEach(() => {
        window.navigator.userAgent = 'iPhone'
        expected = getGoustoAppEventName()
      })

      test('send-gousto-app-link-app-store-sms is returned', () => {
        expect(expected).toBe('send-gousto-app-link-app-store-sms')
      })
    })

    describe('when user is not on mobile', () => {
      let expected

      beforeEach(() => {
        window.navigator.userAgent = 'Macintosh'
        expected = getGoustoAppEventName()
      })

      test('send-gousto-app-link-not-specified-store-sms is returned', () => {
        expect(expected).toBe('send-gousto-app-link-not-specified-store-sms')
      })
    })
  })

  describe('when getEventErrorMessage is called', () => {
    const state = {
      error: Immutable.fromJS({
        LOGGING_MANAGER_EVENT_ERROR: 'error test message'
      })
    }

    test('returns true', () => {
      expect(getEventErrorMessage(state)).toBe('error test message')
    })
  })

  describe('when showEventPending is called', () => {
    const state = {
      pending: Immutable.fromJS({
        LOGGING_MANAGER_EVENT_PENDING: true
      })
    }

    test('returns true', () => {
      expect(showEventPending(state)).toBe(true)
    })
  })

  describe('when showEventSent is called', () => {
    const state = {
      loggingManager: Immutable.fromJS({
        eventSent: {
          goustoAppLinkSMS: true,
        },
      }),
    }

    test('returns true', () => {
      expect(showEventSent(state)).toBe(true)
    })
  })
})
