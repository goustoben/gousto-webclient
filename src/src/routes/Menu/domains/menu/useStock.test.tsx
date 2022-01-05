import * as React from 'react'
import configureMockStore from 'redux-mock-store'
import { renderHook } from '@testing-library/react-hooks'
import { Provider } from 'react-redux'
import Immutable from 'immutable'
import { useStock } from './useStock'

describe('useGetStockForRecipe', () => {
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
          }
        }),
      })
      const wrapper = ({ children }: {children: React.ReactElement}) => <Provider store={store}>{children}</Provider>
      const { result } = renderHook(() => useStock(), { wrapper })

      expect(result.current.getStockForRecipe(recipeId)).toEqual(100)
    })
  })
})
