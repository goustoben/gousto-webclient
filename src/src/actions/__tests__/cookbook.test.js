import Immutable from 'immutable'
import * as collectionsApi from 'apis/collections'
import cookbookActions from '../cookbook'
import { actionTypes } from '../actionTypes'
import { safeJestMock } from '../../_testing/mocks'

describe('cookbookLoadCollectionSets', () => {
  test('should return the right action', () => {
    const result = cookbookActions.cookbookLoadCollectionSets({ startSet: 1, endSet: 4 })
    expect(result).toEqual({
      type: actionTypes.COOKBOOK_LOAD_COLLECTION_SETS,
      startSet: 1,
      endSet: 4
    })
  })
})

describe('cookbookLoadRecipeSets', () => {
  test('should return the right action', () => {
    const result = cookbookActions.cookbookLoadRecipeSets({ startSet: 1, endSet: 4 })
    expect(result).toEqual({
      type: actionTypes.COOKBOOK_LOAD_RECIPE_SETS,
      startSet: 1,
      endSet: 4
    })
  })
})

describe('cookbookResetCollectionRecipes', () => {
  test('should return the right action', () => {
    const result = cookbookActions.cookbookResetCollectionRecipes()
    expect(result).toEqual({
      type: actionTypes.COOKBOOK_RESET_RECIPE_SETS,
    })
  })
})

describe('cookbookLoadCollections', () => {
  let fetchCollectionsSpy
  let dispatch
  let getState
  describe('when fetchCollections returns data', () => {
    beforeEach(() => {
      dispatch = jest.fn()
      getState = () => ({
        auth: Immutable.Map({
          accessToken: ''
        })
      })
      fetchCollectionsSpy = safeJestMock(collectionsApi, 'fetchCollections')
      fetchCollectionsSpy.mockReturnValue(
        new Promise(resolve => {
          resolve({
            data: [],
            meta: {}
          })
        })
      )
    })
    test('should call fetchCollectionsSpy', () => {
      cookbookActions.cookbookLoadCollections({ limit: 5, setNum: 1 })(dispatch, getState)
      expect(fetchCollectionsSpy).toHaveBeenCalled()
    })

    test('should dispatch COOKBOOK_RECEIVE_COLLECTIONS', async () => {
      await cookbookActions.cookbookLoadCollections({ limit: 5, setNum: 1 })(dispatch, getState)

      expect(dispatch).toBeCalledWith({
        type: actionTypes.COOKBOOK_RECEIVE_COLLECTIONS,
        collections: [],
        meta: {},
        setNum: 1,
      })
    })
  })

  describe('when fails to get auth from state', () => {
    beforeEach(() => {
      dispatch = jest.fn()
      getState = () => ({})
      fetchCollectionsSpy = safeJestMock(collectionsApi, 'fetchCollections')
      fetchCollectionsSpy.mockReturnValue(
        new Promise(resolve => {
          resolve({
            data: [],
            meta: {}
          })
        })
      )
    })

    test('should dispatch error', async () => {
      await cookbookActions.cookbookLoadCollections({ limit: 5, setNum: 1 })(dispatch, getState)

      expect(dispatch).toBeCalledWith({
        type: 'ERROR',
        key: actionTypes.COOKBOOK_RECEIVE_COLLECTIONS,
        value: null
      })
    })
  })
})
