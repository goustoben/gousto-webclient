import Immutable from 'immutable'

import { documentLocation, getWindow, redirect } from 'utils/window'
import { loadRecommendations } from 'actions/recipes'

import { postLoginSteps } from 'actions/login'

jest.mock('actions/recipes', () => ({
  loadRecommendations: jest.fn(),
}))

jest.mock('utils/window', () => ({
  documentLocation: jest.fn(),
  getWindow: jest.fn(),
  redirect: jest.fn(),
}))

describe('login actions', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()

  afterEach(() => {
    dispatch.mockClear()
    getState.mockClear()
    loadRecommendations.mockClear()
  })

  describe('postLoginSteps', () => {
    beforeEach(() => {
      documentLocation.mockReturnValue({
        pathname: 'menu',
      })
    })

    describe('when the justforyou experiment is not set', () => {
      beforeEach(() => {
        getState.mockReturnValue({
          features: Immutable.Map({
            justforyou: Immutable.Map({
              value: false,
              experiment: false,
            }),
          }),
        })
      })

      test('should dispatch a loadRecommendations call', () => {
        postLoginSteps(false)(dispatch, getState)

        expect(loadRecommendations).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalled()
      })
    })

    describe('when the justforyou experiment is set', () => {
      beforeEach(() => {
        getState.mockReturnValue({
          features: Immutable.Map({
            justforyou: Immutable.Map({
              value: true,
              experiment: true,
            }),
          }),
        })
      })

      test('should not dispatch a loadRecommendations call', () => {
        postLoginSteps(false)(dispatch, getState)

        expect(loadRecommendations).not.toHaveBeenCalled()
        expect(dispatch).not.toHaveBeenCalled()
      })
    })
  })
})
