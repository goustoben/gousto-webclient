import { safeJestMock } from '_testing/mocks'
import * as experimentActions from 'actions/experiments'
import { experimentsMiddleware } from './experiments'

const mockedFetchUserExperiments = safeJestMock(experimentActions, 'fetchUserExperiments')
const mockedRemoveUserExperiments = safeJestMock(experimentActions, 'removeUserExperiments')

describe('experiments middleware', () => {
  describe('experimentsMiddleware', () => {
    let store
    let next

    beforeEach(() => {
      store = { dispatch: jest.fn() }
      next = jest.fn()
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    describe.each(['USER_LOGGED_IN', 'USER_LOGGED_OUT'])('When %s is received', (actionType) => {
      beforeEach(() => {
        mockedFetchUserExperiments.mockReturnValue('mocked-fetch-user-experiments')
        mockedRemoveUserExperiments.mockReturnValue('mocked-remove-user-experiments')
      })

      test('dispatches action to clear user experiments', () => {
        const action = { type: actionType }

        experimentsMiddleware(store)(next)(action)

        expect(store.dispatch).toHaveBeenCalledWith('mocked-remove-user-experiments')
      })

      test('dispatches action to fetch user experiments', () => {
        const action = { type: actionType }

        experimentsMiddleware(store)(next)(action)

        expect(store.dispatch).toHaveBeenCalledWith('mocked-fetch-user-experiments')
      })
    })

    test('should call next with action', () => {
      const action = { type: 'some_mock_action' }

      experimentsMiddleware(store)(next)(action)
      expect(next).toHaveBeenCalledWith(action)
    })
  })
})
