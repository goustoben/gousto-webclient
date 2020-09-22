import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import { initialState, loggingManager } from 'reducers/loggingmanager'

describe('loggingmanager reducer', () => {
  describe('when action type is LOGGING_MANAGER_EVENT_SENT', () => {
    let newState

    beforeEach(() => {
      newState = loggingManager(initialState, {
        type: actionTypes.LOGGING_MANAGER_EVENT_SENT,
        response: { key: 'goustoAppLinkSMS', value: true },
      })
    })

    test('goustoAppLinkSMS sent event is set to true', () => {
      expect(newState).toEqual(Immutable.fromJS({ eventSent: { goustoAppLinkSMS: true } }))
    })
  })
})
