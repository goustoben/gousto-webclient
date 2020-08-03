import Immutable from 'immutable'

import { updateTastePreferences } from 'apis/tastePreferences'
import { updateUserTasteProfile } from 'actions/tastePreferences'
import logger from 'utils/logger'

jest.mock('apis/tastePreferences', () => ({
  updateTastePreferences: jest.fn(),
}))

jest.mock('utils/logger', () => ({
  error: jest.fn(),
}))

jest.mock('utils/GoustoCookies', () => ({
  get: () => 'session_id',
}))

describe('updateUserTasteProfile actions', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()
  // let data

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('updateUserTasteProfile', () => {
    beforeEach(() => {
      getState.mockReturnValueOnce({
        auth: Immutable.Map({
          accessToken: 'update-user-taste-profile'
        }),
        features: Immutable.fromJS({
          tastePreferences: {
            value: true
          }
        })
      })
    })

    test('should dispatch a updateUserTasteProfile call', async () => {
      await updateUserTasteProfile()(dispatch, getState)

      expect(updateTastePreferences).toHaveBeenCalledWith('update-user-taste-profile', 'session_id')
    })

    describe('when updateTastePreferences fails', () => {
      const error = new Error('update-taste-preferences-fail')
      beforeEach(() => {
        updateTastePreferences.mockRejectedValue(error)
      })

      test('should log with the error', async () => {
        await updateUserTasteProfile()(dispatch, getState)

        expect(logger.error).toHaveBeenCalledWith(
          { error, message: 'Could not save taste profile for sessionId: session_id' }
        )
      })
    })
  })
})
