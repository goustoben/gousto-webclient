import { actionTypes } from 'actions/actionTypes'
import * as trackingKeys from 'actions/trackingKeys'
import { trackAppStoreLoginButton, trackPlayStoreLoginButton } from '../appAwareness'

describe('app awareness actions', () => {
  describe('when trackAppStoreLoginButton is called', () => {
    let dispatch

    beforeEach(() => {
      dispatch = jest.fn()

      trackAppStoreLoginButton()(dispatch)
    })

    test('TRACKING action type is dispatched', () => {
      expect(dispatch.mock.calls[0][0]).toEqual(
        {
          type: actionTypes.TRACKING,
          trackingData: {
            actionType: trackingKeys.clickAppStoreLoginButton,
          }
        }
      )
    })
  })

  describe('when trackPlayStoreLoginButton is called', () => {
    let dispatch

    beforeEach(() => {
      dispatch = jest.fn()

      trackPlayStoreLoginButton()(dispatch)
    })

    test('TRACKING action type is dispatched', () => {
      expect(dispatch.mock.calls[0][0]).toEqual(
        {
          type: actionTypes.TRACKING,
          trackingData: {
            actionType: trackingKeys.clickPlayStoreLoginButton,
          }
        }
      )
    })
  })
})
