import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */
import { appBanner, initialState } from 'reducers/appBanner'

describe('app banner reducer', () => {
  test('initial state', () => {
    expect(
      Immutable.is(appBanner.appBanner(undefined, {}), initialState),
    ).toEqual(true)
  })

  test('unknown actions', () => {
    const result = appBanner.appBanner(initialState, { type: 'unknown' })

    expect(Immutable.is(result, initialState)).toEqual(true)
  })

  describe('APP_BANNER_DISMISSED', () => {
    test('isDismissed set to true in the state', () => {
      const result = appBanner.appBanner(initialState, {
        type: actionTypes.APP_BANNER_DISMISSED
      })

      expect(result.get('isDismissed')).toEqual(true)
    })
  })
})
