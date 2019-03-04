import Immutable from 'immutable'

import actionTypes from 'actions/actionTypes'

import {
  shouldJfyTutorialBeVisible,
  setTutorialViewed,
  incrementTutorialViewed,
  setTutorialVisible,
} from 'actions/tutorial'

describe('tutorial actions', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()

  afterEach(() => {
    dispatch.mockClear()
    getState.mockClear()
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
})

