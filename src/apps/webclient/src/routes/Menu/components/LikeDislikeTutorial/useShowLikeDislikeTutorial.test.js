import React from 'react'

import { renderHook } from '@testing-library/react-hooks'
import Immutable from 'immutable'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import * as TutorialActions from 'actions/tutorial'

import { useShowLikeDislikeTutorial } from './useShowLikeDislikeTutorial'

describe('useShowLikeDislikeTutorial', () => {
  beforeEach(() => {
    jest.spyOn(TutorialActions, 'tutorialTracking').mockImplementation(() => ({ type: 'foo' }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when used in different browsers', () => {
    describe('when browser is Edge', () => {
      test('should not render', () => {
        const { result } = renderUseShowLikeDislikeTutorialHook({ userAgent: 'Edge' })
        expect(result.current).toEqual(false)
      })
    })

    describe('when browser is IE', () => {
      test('should not render', () => {
        const { result } = renderUseShowLikeDislikeTutorialHook({ userAgent: 'Trident' })
        expect(result.current).toEqual(false)
      })
    })

    describe('when browser is Chrome', () => {
      test('should render', () => {
        const { result } = renderUseShowLikeDislikeTutorialHook({ userAgent: 'Chrome' })
        expect(result.current).toEqual(true)
      })
    })
  })

  describe('when likeDislikeRecipes Tutorial already seen', () => {
    test('should not render', () => {
      const { result } = renderUseShowLikeDislikeTutorialHook({
        tutorial: Immutable.fromJS({
          viewed: {
            likedislikerecipes: 1,
          },
        }),
      })
      expect(result.current).toEqual(false)
    })
  })
})

const renderUseShowLikeDislikeTutorialHook = ({
  userAgent = 'Chrome',
  tutorial = Immutable.fromJS({}),
} = {}) => {
  const mockStore = configureMockStore()
  const initialState = {
    auth: Immutable.fromJS({}),
    basket: Immutable.fromJS({
      numPortions: 2,
    }),
    request: Immutable.fromJS({
      userAgent,
    }),
    tutorial,
    routing: {
      locationBeforeTransitions: {
        query: {},
      },
    },
  }
  const store = mockStore(initialState)

  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>

  return renderHook(() => useShowLikeDislikeTutorial(), { wrapper })
}
