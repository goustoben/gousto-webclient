import Immutable from 'immutable'

import actionTypes from 'actions/actionTypes'

import { set } from 'utils/cookieHelper2'
import Cookies from 'utils/GoustoCookies'
import { tutorialViewedExpireTime } from 'config/cookies'

import {
  shouldJfyTutorialBeVisible,
  setTutorialViewed,
  incrementTutorialViewed,
  setTutorialVisible,
  tutorialTracking,
  persistTutorialViewed,
} from 'actions/tutorial'

jest.mock('utils/cookieHelper2', () => ({
  set: jest.fn(),
}))

jest.mock('utils/GoustoCookies')

jest.mock('config/cookies', () => ({
  tutorialViewedExpireTime: 60,
}))

describe('tutorial actions', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()

  afterEach(() => {
    dispatch.mockClear()
    getState.mockClear()
    set.mockClear()
  })

  const getTutorialState = ({ collections = {}, viewed = {}, visible = {} }) => ({
    menuCollections: [
      Immutable.Map({
        ...collections,
      })
    ],
    tutorial: Immutable.Map({
      viewed: Immutable.Map({
        ...viewed,
      }),
      visible: Immutable.Map({
        ...visible,
      })
    })
  })

  describe('shouldJfyTutorialBeVisible', () => {
    describe("when tutorial has been seen and collection is present", () => {
      beforeEach(() => {
        getState.mockReturnValueOnce(getTutorialState({
          collections: { slug: 'recommendations' },
          viewed: { justforyou: 2 },
        }))
      })

      it('should call dispatch with correct action and properties', () => {
        shouldJfyTutorialBeVisible()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({
          type: actionTypes.SET_TUTORIAL_VISIBLE,
          name: 'justforyou',
          value: false
        })
      })
    })

    describe("when tutorial hasn't been seen and collection isn't present", () => {
      beforeEach(() => {
        getState.mockReturnValueOnce(getTutorialState({
          collections: { slug: 'all-recipes' },
          viewed: { justforyou: 0 },
        }))
      })

      it('should call dispatch with correct action and properties', () => {
        shouldJfyTutorialBeVisible()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({
          type: actionTypes.SET_TUTORIAL_VISIBLE,
          name: 'justforyou',
          value: false
        })
      })
    })

    describe("when tutorial hasn't been seen and collection is present", () => {
      beforeEach(() => {
        getState.mockReturnValueOnce(getTutorialState({
          collections: { slug: 'recommendations' },
          viewed: { justforyou: 0 },
        }))
      })

      it('should call dispatch with correct action and properties', () => {
        shouldJfyTutorialBeVisible()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({
          type: actionTypes.SET_TUTORIAL_VISIBLE,
          name: 'justforyou',
          value: true
        })
      })
    })
  })

  describe('setTutorialVisible', () => {
    test('should dispatch a SET_TUTORIAL_VISIBLE with the given name and value', () => {
      const name = 'testTutorial'
      const value = true

      setTutorialVisible(name, value)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.SET_TUTORIAL_VISIBLE,
        name,
        value,
      })
    })
  })

  describe('setTutorialViewed', () => {
    beforeEach(() => {
      getState.mockReturnValueOnce(getTutorialState({
        viewed: { justforyou: 2 },
      }))
    })

    test('should dispatch a SET_TUTORIAL_VIEWED with the given name and value', () => {
      const name = 'testTutorial'
      const count = 1

      setTutorialViewed(name, count)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.SET_TUTORIAL_VIEWED,
        name,
        count,
      })
    })
  })

  describe('persistTutorialViewed', ()=> {
    const viewed = { justforyou: 2 }
    beforeEach(() => {
      getState.mockReturnValueOnce(getTutorialState({
        viewed,
      }))
    })

    describe('when on the server', () => {
      beforeEach(() => {
        global.__CLIENT__ = false
      })

      test('should not set a cookie', () => {
        persistTutorialViewed(getState)

        expect(set).not.toHaveBeenCalled()
      })
    })

    describe('when on the client', () => {
      beforeEach(() => {
        global.__CLIENT__  = true
      })

      test('should set a tutorial viewed cookie with tutorial viewed state', () => {
        persistTutorialViewed(getState)

        expect(set).toHaveBeenCalledWith(
          Cookies,
          'tutorial_viewed',
          viewed,
          tutorialViewedExpireTime,
        )
      })
    })
  })

  describe('tutorialTracking', () => {
    test('should dispatch TUTORIAL_TRACKING with the given name, step and dismissed boolean', () => {
      const tutorialName = 'testTutorial'
      const turorialStep = 1
      const dismissed = true

      tutorialTracking(tutorialName, turorialStep, dismissed)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.TUTORIAL_TRACKING,
        trackingData: {
          actionType: 'TutorialModal Dismissed',
          tutorial_name: tutorialName,
          turorial_step: 2,
        },
      })
    })

    test('should return actionType as TutorialModal Viewed if dismissed is false', () => {
      const tutorialName = 'testTutorial'
      const turorialStep = 1
      const dismissed = false

      tutorialTracking(tutorialName, turorialStep, dismissed)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.TUTORIAL_TRACKING,
        trackingData: {
          actionType: 'TutorialModal Viewed',
          tutorial_name: tutorialName,
          turorial_step: 2,
        },
      })
    })
  })
})

