import Immutable from 'immutable'

import actionTypes from 'actions/actionTypes'

import {
  shouldJfyTutorialBeVisible,
  setTutorialViewed,
  incrementTutorialViewed,
} from 'actions/tutorial'

describe('tutorial actions', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()

  afterEach(() => {
    dispatch.mockClear()
    getState.mockClear()
  })

  describe('shouldJfyTutorialBeVisible', () => {
    const getJFYState = (collections, viewed) => ({
      menuCollections: [
        Immutable.Map({
          ...collections,
        })
      ],
      tutorial: Immutable.Map({
        viewed: Immutable.Map({
          viewed,
        })
      })
    })

    describe("when tutorial has been seen and collection is present", () => {
      beforeEach(() => {
        getState.mockReturnValueOnce(getJFYState(
          { slug: 'recommendations' },
          { justforyou: 2 },
        ))
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
        getState.mockReturnValueOnce(getJFYState(
          { slug: 'all-recipes' },
          { justforyou: 0 },
        ))
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
        getState.mockReturnValueOnce(getJFYState(
          { slug: 'recommendations' },
          { justforyou: 0 },
        ))
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
})

