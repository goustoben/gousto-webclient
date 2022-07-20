import * as React from 'react'

import { renderHook } from '@testing-library/react-hooks'
import Immutable from 'immutable'
import { Provider, useDispatch } from 'react-redux'

import * as loggingmanagerActions from 'actions/loggingmanager'

import { actionTypes } from '../../../../../../actions/actionTypes'
import * as trackingKeys from '../../../../../../actions/trackingKeys'
import { useCurrentCollectionId } from '../../../collections/internal/useCurrentCollection'
import { useRecipeLimitReached } from '../limits'
import { createMockBasketStore } from '../testing/createMockBasketStore'
import { useRemoveRecipe } from './useRemoveRecipe'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}))
const useDispatchMock = useDispatch as jest.MockedFn<typeof useDispatch>

jest.mock('../limits')
const useRecipeLimitReachedMock = useRecipeLimitReached as jest.MockedFn<
  typeof useRecipeLimitReached
>

jest.mock('../../../collections/internal/useCurrentCollection')
const useCurrentCollectionIdMock = useCurrentCollectionId as jest.MockedFn<
  typeof useCurrentCollectionId
>
useCurrentCollectionIdMock.mockReturnValue('1365e0ac-5b1a-11e7-a8dc-001c421e38fa')

describe('useRemoveRecipe', () => {
  let dispatch: jest.Mock

  beforeEach(() => {
    dispatch = jest.fn()
    useDispatchMock.mockReturnValue(dispatch)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('when useRemoveRecipe is called passing recipeId only', () => {
    const basketStore = createMockBasketStore({
      recipes: Immutable.Map([['111', 3]]),
    })

    const wrapper: React.FC = ({ children }) => <Provider store={basketStore}>{children}</Provider>
    const renderForTest = () => renderHook(() => useRemoveRecipe(), { wrapper })

    beforeEach(() => {
      jest.spyOn(loggingmanagerActions, 'trackUserAddRemoveRecipe')
      useRecipeLimitReachedMock.mockReturnValue(false)
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    test('should dispatch BASKET_LIMIT_REACHED, MENU_RECIPE_STOCK_CHANGE and BASKET_RECIPE_REMOVE action types with correct recipe id and limit reached', () => {
      const { result } = renderForTest()
      result.current('123')
      expect(dispatch.mock.calls).toHaveLength(4)

      expect(dispatch.mock.calls[0]).toEqual([
        {
          type: actionTypes.BASKET_RECIPE_REMOVE,
          recipeId: '123',
          trackingData: {
            actionType: trackingKeys.removeRecipe,
            recipeId: '123',
            view: undefined,
            position: undefined,
            collection: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
            recipe_count: 0,
          },
        },
      ])

      expect(dispatch.mock.calls[1]).toEqual([
        {
          type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
          stock: { 123: { 2: 1 } },
        },
      ])

      expect(dispatch.mock.calls[2]).toEqual([
        {
          type: actionTypes.BASKET_LIMIT_REACHED,
          limitReached: false,
          trackingData: {
            view: undefined,
            source: actionTypes.RECIPE_REMOVED,
            actionType: trackingKeys.basketLimit,
            limitReached: false,
          },
        },
      ])
    })

    test('then trackUserAddRemoveRecipe is called correctly', () => {
      const { result } = renderForTest()
      result.current('123')
      expect(loggingmanagerActions.trackUserAddRemoveRecipe).toHaveBeenCalledTimes(1)
    })
  })

  describe('when useRemoveRecipe is called passing recipeId and view only', () => {
    test('should map through the given view argument through to trackingData', () => {
      const basketStore = createMockBasketStore({
        recipes: Immutable.Map([['111', 3]]),
      })

      const wrapper: React.FC = ({ children }) => (
        <Provider store={basketStore}>{children}</Provider>
      )
      const renderForTest = () => renderHook(() => useRemoveRecipe(), { wrapper })

      jest.spyOn(loggingmanagerActions, 'trackUserAddRemoveRecipe')
      useRecipeLimitReachedMock.mockReturnValue(false)

      useCurrentCollectionIdMock.mockReturnValue('1365e0ac-5b1a-11e7-a8dc-001c421e38fa')
      const { result } = renderForTest()
      result.current('123', 'boxsummary')

      expect(dispatch.mock.calls).toHaveLength(4)

      expect(dispatch.mock.calls[0]).toEqual([
        {
          type: actionTypes.BASKET_RECIPE_REMOVE,
          recipeId: '123',
          trackingData: {
            actionType: trackingKeys.removeRecipe,
            recipeId: '123',
            view: 'boxsummary',
            position: undefined,
            collection: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
            recipe_count: 0,
          },
        },
      ])

      expect(dispatch.mock.calls[1]).toEqual([
        {
          type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
          stock: { 123: { 2: 1 } },
        },
      ])

      expect(dispatch.mock.calls[2]).toEqual([
        {
          type: actionTypes.BASKET_LIMIT_REACHED,
          limitReached: false,
          trackingData: {
            view: 'boxsummary',
            source: actionTypes.RECIPE_REMOVED,
            actionType: trackingKeys.basketLimit,
            limitReached: false,
          },
        },
      ])
    })
  })

  describe('when useRemoveRecipe is called when limit and numPortions are reached', () => {
    test('should dispatch correctly when limit and numportion reached', () => {
      const basketStore = createMockBasketStore({
        recipes: Immutable.Map([
          ['111', 1],
          ['222', 1],
          ['333', 1],
        ]),
      })

      jest.spyOn(loggingmanagerActions, 'trackUserAddRemoveRecipe')
      useRecipeLimitReachedMock.mockReturnValue(true)

      const wrapper: React.FC = ({ children }) => (
        <Provider store={basketStore}>{children}</Provider>
      )
      const renderForTest = () => renderHook(() => useRemoveRecipe(), { wrapper })

      useCurrentCollectionIdMock.mockReturnValue('1365e0ac-5b1a-11e7-a8dc-001c421e38fa')
      const { result } = renderForTest()
      result.current('123')

      expect(dispatch.mock.calls).toHaveLength(3)

      expect(dispatch.mock.calls[0]).toEqual([
        {
          type: actionTypes.BASKET_RECIPE_REMOVE,
          recipeId: '123',
          trackingData: {
            actionType: trackingKeys.removeRecipe,
            recipeId: '123',
            view: undefined,
            position: undefined,
            collection: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
            recipe_count: 2,
          },
        },
      ])

      expect(dispatch.mock.calls[1]).toEqual([
        {
          type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
          stock: { 123: { 2: 1 } },
        },
      ])
      expect(loggingmanagerActions.trackUserAddRemoveRecipe).toHaveBeenCalledTimes(1)
    })
  })
})
