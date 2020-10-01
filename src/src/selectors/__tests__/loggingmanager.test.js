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

      test('sendsmsapplink-playstore is returned', () => {
        expect(expected).toBe('sendsmsapplink-playstore')
      })
    })

    describe('when user agent is iPhone', () => {
      let expected

      beforeEach(() => {
        window.navigator.userAgent = 'iPhone'
        expected = getGoustoAppEventName()
      })

      test('sendsmsapplink-appstore is returned', () => {
        expect(expected).toBe('sendsmsapplink-appstore')
      })
    })

    describe('when user is not on mobile', () => {
      let expected

      beforeEach(() => {
        window.navigator.userAgent = 'Macintosh'
        expected = getGoustoAppEventName()
      })

      test('sendsmsapplink-notspecified is returned', () => {
        expect(expected).toBe('sendsmsapplink-notspecified')
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
