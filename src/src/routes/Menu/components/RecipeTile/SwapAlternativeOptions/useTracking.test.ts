import { renderHook } from '@testing-library/react-hooks'
import { useTracking } from '.'

const dispatch = jest.fn()

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => dispatch,
}))

describe('useTracking for SwapAlternativeOptions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when calling trackRecipeAlternativeOptionsMenuOpen', () => {
    test('it dispatches correct TRACKING payload', () => {
      const { result } = renderHook(() => useTracking())

      result.current.trackRecipeAlternativeOptionsMenuOpen({
        recipeId: 'recipe_1',
        collectionId: 'collection_1',
      })

      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        trackingData: {
          event: 'recipe-alternative-options-menu-open',
          collectionId: 'collection_1',
          recipeId: 'recipe_1',
        },
      })
    })
  })

  describe('when calling trackRecipeAlternativeOptionsMenuSwapRecipes', () => {
    test('it dispatches correct TRACKING payload', () => {
      const { result } = renderHook(() => useTracking())

      result.current.trackRecipeAlternativeOptionsMenuSwapRecipes({
        previousRecipeId: 'recipe_1',
        nextRecipeId: 'recipe_2',
        collectionId: 'collection_1',
      })

      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        trackingData: {
          event: 'recipe-alternative-options-menu-swap-recipes',
          collectionId: 'collection_1',
          previousRecipeId: 'recipe_1',
          nextRecipeId: 'recipe_2',
        },
      })
    })
  })
})
