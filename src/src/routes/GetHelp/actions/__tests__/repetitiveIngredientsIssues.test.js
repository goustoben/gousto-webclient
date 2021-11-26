import { actionTypes as webClientActionTypes } from 'actions/actionTypes'
import { safeJestMock } from '_testing/mocks'
import { trackContinueToSsrClick, updateHasSeenRepetitiveIssuesScreen } from '../repetitiveIngredientsIssues'
import { actionTypes, trackingKeys } from '../actionTypes'
import * as selectorsSelectors from '../../selectors/selectors'
const getNumOrdersChecked = safeJestMock(selectorsSelectors, 'getNumOrdersChecked')
const getNumOrdersCompensated = safeJestMock(selectorsSelectors, 'getNumOrdersCompensated')

describe('trackContinueToSsrClick', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('trackContinueToSsrClick', () => {
    const dispatch = jest.fn()
    const getState = jest.fn()
    beforeEach(() => {
      getNumOrdersChecked.mockReturnValue(2)
      getNumOrdersCompensated.mockReturnValue(1)
    })

    test('dispatch the tracking action with correct values', () => {
      trackContinueToSsrClick()(dispatch, getState)
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: webClientActionTypes.TRACKING,
        trackingData: {
          actionType: trackingKeys.continueToSsrClick,
          numOrdersChecked: 2,
          numOrdersCompensated: 1,
        }
      })
    })
  })

  describe('updateHasSeenRepetitiveIssuesScreen', () => {
    const HAS_SEEN_REPETITIVE_ISSUES = 'can be true or false'
    const dispatch = jest.fn()

    test('dispatch the action with correct value', () => {
      updateHasSeenRepetitiveIssuesScreen(HAS_SEEN_REPETITIVE_ISSUES)(dispatch)
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: actionTypes.GET_HELP_HAS_SEEN_REPETITIVE_ISSUES,
        hasSeenRepetitiveIssuesScreen: HAS_SEEN_REPETITIVE_ISSUES,
      })
    })
  })
})
