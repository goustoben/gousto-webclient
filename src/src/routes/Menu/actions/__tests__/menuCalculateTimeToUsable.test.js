import Immutable from 'immutable'
import { safeJestMock } from '_testing/mocks'
import { menuCalculateTimeToUsable } from '../menuCalculateTimeToUsable/menuCalculateTimeToUsable'
import * as browserTimings from '../utils/browserTimings'
import { actionTypes } from '../../../../actions/actionTypes'
import { menuTimeToUsable } from '../../../../actions/trackingKeys'
import * as clientMetrics from '../../apis/clientMetrics/clientMetrics'

describe('given menuCalculateTimeToUsable action is called', () => {
  let state
  const dispatch = jest.fn()
  const authId = 'test-auth-id'
  const getState = () => state
  const timeSinceRequest = safeJestMock(browserTimings, 'getTimeSinceRequestStart')
  const timeToFirstByte = safeJestMock(browserTimings, 'getTimeToFirstByte')
  const mockSendClientMetric = safeJestMock(clientMetrics, 'sendClientMetric')

  timeSinceRequest.mockReturnValue(123)
  timeToFirstByte.mockReturnValue(456)

  beforeEach(() => {
    state = {
      auth: Immutable.Map({
        id: authId
      }),
      menu: Immutable.fromJS({
        hasCalculatedTimeToUsable: false,
        hasVisitedNonMenuPage: false,
        menuPrefetched: true
      })
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when hasCalculatedTimeToUsable is false', () => {
    beforeEach(() => {
      state.menu = state.menu.set('hasCalculatedTimeToUsable', false)
    })

    describe('and hasVisitedNonMenuPage is false', () => {
      beforeEach(() => {
        state.menu = state.menu.set('hasVisitedNonMenuPage', false)
      })

      test('then it should dispatch the tracking data', () => {
        menuCalculateTimeToUsable()(dispatch, getState)

        expect(dispatch.mock.calls[0]).toEqual([
          {
            type: actionTypes.MENU_SET_CALCULATED_TIME_TO_USABLE,
            trackingData: {
              actionType: menuTimeToUsable,
              timeToFirstByte: 456,
              timeToUsable: 123,
              menuPrefetched: true
            }
          }
        ])
      })

      test('then it should call sendClientMetric with the correct info', () => {
        menuCalculateTimeToUsable()(dispatch, getState)
        expect(mockSendClientMetric).toHaveBeenCalledWith('menu-load-complete', 1, 'Count')
      })
    })

    describe('and hasVisitedNonMenuPage is true', () => {
      beforeEach(() => {
        state.menu = state.menu.set('hasVisitedNonMenuPage', true)
      })

      test('then it should not dispatch the tracking data', () => {
        menuCalculateTimeToUsable()(dispatch, getState)

        expect(dispatch).not.toHaveBeenCalled()
      })
    })
  })

  describe('when hasCalculatedTimeToUsable is true', () => {
    beforeEach(() => {
      state.menu = state.menu.set('hasCalculatedTimeToUsable', true)
    })

    describe('and hasVisitedNonMenuPage is false', () => {
      beforeEach(() => {
        state.menu = state.menu.set('hasVisitedNonMenuPage', false)
      })

      test('then it should dispatch the tracking data', () => {
        menuCalculateTimeToUsable()(dispatch, getState)

        expect(dispatch).not.toHaveBeenCalled()
      })
    })

    describe('and hasVisitedNonMenuPage is true', () => {
      beforeEach(() => {
        state.menu = state.menu.set('hasVisitedNonMenuPage', true)
      })

      test('then it should not dispatch the tracking data', () => {
        menuCalculateTimeToUsable()(dispatch, getState)

        expect(dispatch).not.toHaveBeenCalled()
      })
    })
  })
})
