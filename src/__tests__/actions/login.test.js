import Immutable from 'immutable'

import { documentLocation, getWindow, redirect } from 'utils/window'
import { loadRecommendations } from '../../src/routes/Menu/fetchData/fetchData'

import { postLoginSteps } from 'actions/login'

jest.mock('routes/Menu/fetchData/fetchData', () => ({
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
            justforyou_v2: Immutable.Map({
              value: false,
              experiment: false,
            }),
          }),
        })
      })

      test('should dispatch a loadRecommendations call', async() => {
        await postLoginSteps(false)(dispatch, getState)
        expect(loadRecommendations).toHaveBeenCalled()
      })
    })

  })
})
