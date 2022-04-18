import * as React from 'react'
import configureMockStore from 'redux-mock-store'
import { renderHook } from '@testing-library/react-hooks'
import { Provider } from 'react-redux'
import Immutable from 'immutable'
import menuConfig from 'config/menu'
import { useStock } from './useStock'

describe('useStock', () => {
  describe('when using getStockForRecipe', () => {
    it('should return stock level for given recipe and number of portions', () => {
      const recipeId = 'recipe one'
      const mockStore = configureMockStore()
      const store = mockStore({
        basket: Immutable.fromJS({ numPortions: 2 }),
        menuRecipeStock: Immutable.fromJS({
          [recipeId]: {
            2: 100,
            4: 200,
            8: 0,
          },
        }),
      })
      const wrapper = ({ children }: { children: React.ReactElement }) => (
        <Provider store={store}>{children}</Provider>
      )
      const { result } = renderHook(() => useStock(), { wrapper })

      expect(result.current.getStockForRecipe(recipeId)).toEqual(100)
    })
  })

  describe('isRecipeOutOfStock', () => {
    const recipeId = 'recipe one'
    const numPortions = 2

    describe('when stock is lower than threshold', () => {
      it('should return true', () => {
        const mockStore = configureMockStore()
        const store = mockStore({
          basket: Immutable.fromJS({ numPortions }),
          menuRecipeStock: Immutable.fromJS({
            [recipeId]: {
              [numPortions]: menuConfig.stockThreshold - 1,
            },
          }),
        })
        const wrapper = ({ children }: { children: React.ReactElement }) => (
          <Provider store={store}>{children}</Provider>
        )
        const { result } = renderHook(() => useStock(), { wrapper })

        expect(result.current.isRecipeOutOfStock(recipeId)).toEqual(true)
      })
    })

    describe('when stock is higher than threshold', () => {
      it('should return false', () => {
        const mockStore = configureMockStore()
        const store = mockStore({
          basket: Immutable.fromJS({ numPortions }),
          menuRecipeStock: Immutable.fromJS({
            [recipeId]: {
              [numPortions]: menuConfig.stockThreshold + 1,
            },
          }),
        })
        const wrapper = ({ children }: { children: React.ReactElement }) => (
          <Provider store={store}>{children}</Provider>
        )
        const { result } = renderHook(() => useStock(), { wrapper })

        expect(result.current.isRecipeOutOfStock(recipeId)).toEqual(false)
      })
    })

    describe('when recipe is in basket', () => {
      it('should return false', () => {
        const mockStore = configureMockStore()
        const store = mockStore({
          basket: Immutable.fromJS({
            numPortions,
            recipes: { [recipeId]: 1 },
          }),
          menuRecipeStock: Immutable.fromJS({
            [recipeId]: {
              [numPortions]: 0,
            },
          }),
        })
        const wrapper = ({ children }: { children: React.ReactElement }) => (
          <Provider store={store}>{children}</Provider>
        )
        const { result } = renderHook(() => useStock(), { wrapper })

        expect(result.current.isRecipeOutOfStock(recipeId)).toEqual(false)
      })
    })

    describe('when no stock is provided', () => {
      it('should return false', () => {
        const mockStore = configureMockStore()
        const store = mockStore({
          basket: Immutable.fromJS({
            numPortions,
            recipes: { [recipeId]: 1 },
          }),
          menuRecipeStock: Immutable.fromJS({}),
        })
        const wrapper = ({ children }: { children: React.ReactElement }) => (
          <Provider store={store}>{children}</Provider>
        )
        const { result } = renderHook(() => useStock(), { wrapper })

        expect(result.current.isRecipeOutOfStock(recipeId)).toEqual(false)
      })
    })
  })

  describe('getOutOfStockRecipeIds', () => {
    const recipeIds = ['3']
    const numPortions = 2

    describe('when stock is lower than threshold', () => {
      it('result should contain the recipe id', () => {
        const mockStore = configureMockStore()
        const store = mockStore({
          basket: Immutable.fromJS({ numPortions }),
          menuRecipeStock: Immutable.fromJS({
            3: {
              [numPortions]: menuConfig.stockThreshold - 1,
            },
          }),
        })
        const wrapper = ({ children }: { children: React.ReactElement }) => (
          <Provider store={store}>{children}</Provider>
        )
        const { result } = renderHook(() => useStock(), { wrapper })

        expect(result.current.getOutOfStockRecipeIds(recipeIds)).toEqual(['3'])
      })
    })

    describe('when stock is higher than threshold', () => {
      it('result should not contain the recipe id', () => {
        const mockStore = configureMockStore()
        const store = mockStore({
          basket: Immutable.fromJS({ numPortions }),
          menuRecipeStock: Immutable.fromJS({
            3: {
              [numPortions]: menuConfig.stockThreshold + 1,
            },
          }),
        })
        const wrapper = ({ children }: { children: React.ReactElement }) => (
          <Provider store={store}>{children}</Provider>
        )
        const { result } = renderHook(() => useStock(), { wrapper })

        expect(result.current.getOutOfStockRecipeIds(recipeIds)).toEqual([])
      })
    })

    describe('when recipe is in basket', () => {
      it('result should not contain the recipe id', () => {
        const mockStore = configureMockStore()
        const store = mockStore({
          basket: Immutable.fromJS({
            numPortions,
            recipes: { 3: 1 },
          }),
          menuRecipeStock: Immutable.fromJS({
            3: {
              [numPortions]: 0,
            },
          }),
        })
        const wrapper = ({ children }: { children: React.ReactElement }) => (
          <Provider store={store}>{children}</Provider>
        )
        const { result } = renderHook(() => useStock(), { wrapper })

        expect(result.current.getOutOfStockRecipeIds(recipeIds)).toEqual([])
      })
    })

    describe('when no stock is provided', () => {
      it('should return null', () => {
        const mockStore = configureMockStore()
        const store = mockStore({
          basket: Immutable.fromJS({
            numPortions,
            recipes: { 3: 1 },
          }),
          menuRecipeStock: Immutable.fromJS({}),
        })
        const wrapper = ({ children }: { children: React.ReactElement }) => (
          <Provider store={store}>{children}</Provider>
        )
        const { result } = renderHook(() => useStock(), { wrapper })

        expect(result.current.getOutOfStockRecipeIds(recipeIds)).toBeNull()
      })
    })
  })
})
