import * as React from 'react'

import { renderHook } from '@testing-library/react-hooks'
import Immutable from 'immutable'
import { Provider, useDispatch } from 'react-redux'

import * as loggingmanagerActions from 'actions/loggingmanager'
import { menuRecipeDetailVisibilityChange } from 'routes/Menu/actions/menuRecipeDetails'

import { createMockBasketStore } from '../testing/createMockBasketStore'
import { useAddRecipe } from './useAddRecipe'
import { useAddValidRecipeToBasket } from './useAddValidRecipeToBasket'
import { useValidateMenuLimitsForBasket } from './useValidateMenuLimitsForBasket'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}))
const useDispatchMock = useDispatch as jest.MockedFn<typeof useDispatch>

jest.mock('./useValidateMenuLimitsForBasket')
const useValidateMenuLimitsMock = useValidateMenuLimitsForBasket as jest.MockedFn<
  typeof useValidateMenuLimitsForBasket
>

jest.mock('./useAddValidRecipeToBasket')
const useAddValidRecipeToBasketMock = useAddValidRecipeToBasket as jest.MockedFn<
  typeof useAddValidRecipeToBasket
>

jest.mock('routes/Menu/actions/menuRecipeDetails')
const menuRecipeDetailVisibilityChangeMock = menuRecipeDetailVisibilityChange as jest.MockedFn<
  typeof menuRecipeDetailVisibilityChange
>
menuRecipeDetailVisibilityChangeMock.mockReturnValue('menuRecipeDetailVisibilityChange' as any)

describe('useAddRecipe', () => {
  let dispatch: jest.Mock

  beforeEach(() => {
    dispatch = jest.fn()
    useDispatchMock.mockReturnValue(dispatch)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  const recipeIdA = '1234-5678'
  const recipeIdB = '0000-0000'

  const recipeStore = createMockBasketStore(
    {
      recipes: Immutable.Map({
        [recipeIdA]: 2,
        [recipeIdB]: 2,
      }),
    },
    { menuRecipeDetails: Immutable.Map({ recipeId: recipeIdA }) },
  )

  const wrapper: React.FC = ({ children }) => <Provider store={recipeStore}>{children}</Provider>
  const renderForTest = () => renderHook(() => useAddRecipe(), { wrapper })

  describe('when there are rules that will break the basket', () => {
    const brokenRules = [
      {
        items: ['3037'],
        message: 'Only 1 oven ready meal is available per order',
        name: 'charlie-binghams-basket-limit',
      },
      {
        items: ['3037'],
        message: 'Only 1 new-rule meal is available per order',
        name: 'new-rule',
      },
    ]

    beforeEach(() => {
      useValidateMenuLimitsMock.mockReturnValue(() => brokenRules)
    })

    test('then it should dispatch menuRecipeDetailVisibilityChange', () => {
      const { result } = renderForTest()
      result.current('123', 'view', undefined, 4)
      expect(dispatch).toBeCalledWith('menuRecipeDetailVisibilityChange')
    })
  })

  describe('when there are no rules that will break the basket', () => {
    beforeEach(() => {
      jest.spyOn(loggingmanagerActions, 'trackUserAddRemoveRecipe')
      useValidateMenuLimitsMock.mockReturnValue(() => [])
      useAddValidRecipeToBasketMock.mockReturnValue(() => 'useAddValidRecipeToBasket')
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    test('then it should call useValidateMenuLimitsForBasket', () => {
      const { result } = renderForTest()
      result.current('123', 'view', undefined, 4)
      expect(useValidateMenuLimitsMock).toHaveBeenCalledTimes(1)
    })

    test('then it should call addValidRecipeToBasket', () => {
      const { result } = renderForTest()
      result.current('123', 'view', undefined, 4)
      expect(useAddValidRecipeToBasketMock).toHaveBeenCalledTimes(1)
    })

    test('then it should dispatch trackUserAddRemoveRecipe', () => {
      const { result } = renderForTest()
      result.current('123', 'view', undefined, 4)
      expect(loggingmanagerActions.trackUserAddRemoveRecipe).toHaveBeenCalledTimes(1)
    })
  })
})
