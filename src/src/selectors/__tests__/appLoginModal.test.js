import { fromJS } from 'immutable'
import { getIsAppAwarenessLoginEnabled } from '../appLoginModal'

describe('appAwareness selector', () => {
  let windowSpy

  beforeEach(() => {
    windowSpy = jest.spyOn(global, 'window', 'get')
  })

  afterEach(() => {
    windowSpy.mockRestore()
  })

  describe('When getIsAppAwarenessLoginEnabled is called', () => {
    const mockState = {
      loginVisibility: fromJS({
        helpPreLogin: false,
      }),
      features: fromJS({
        isAppAwarenessEnabled: {
          value: true,
        },
      }),
      request: fromJS({
        browser: 'desktop',
      }),
    }
    describe('And the AppAwareness feature flag is enabled', () => {
      describe('And HelpPreLogin is closed', () => {
        test('Then getAppAwareness should return true', () => {
          expect(getIsAppAwarenessLoginEnabled(mockState)).toEqual(true)
        })
      })

      describe('And HelpPreLogin is open', () => {
        const state = {
          ...mockState,
          loginVisibility: fromJS({
            helpPreLogin: true,
          }),
        }
        test('Then getAppAwareness should return false', () => {
          expect(getIsAppAwarenessLoginEnabled(state)).toEqual(false)
        })
      })

      describe('And the user is on a mobile browser', () => {
        const state = {
          ...mockState,
          request: fromJS({
            browser: 'mobile',
          }),
        }
        test('Then getAppAwareness should return false', () => {
          expect(getIsAppAwarenessLoginEnabled(state)).toEqual(false)
        })
      })

      describe('And the path is invalid', () => {
        test('Then getAppAwareness should return false', () => {
          windowSpy.mockImplementation(() => ({
            location: {
              pathname: '/resetform',
            },
          }))
          expect(getIsAppAwarenessLoginEnabled(mockState)).toEqual(false)
        })
      })
    })

    describe('And the AppAwareness feature flag is disabled', () => {
      const state = {
        ...mockState,
        features: fromJS({
          isAppAwarenessEnabled: {
            value: false,
          },
        }),
      }
      test('Then getAppAwareness should return false', () => {
        expect(getIsAppAwarenessLoginEnabled(state)).toEqual(false)
      })
    })
  })
})
