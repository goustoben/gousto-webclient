import { renderHook } from '@testing-library/react-hooks'

import { useSoldOutTracking } from './useSoldOutTracking'

const dispatch = jest.fn()

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => dispatch,
}))

describe('useTracking for RecipeListWrapper', () => {
  describe('trackSoldOutRecipes', () => {
    let trackSoldOutRecipes: (soldOutRecipes: string[] | null) => void

    beforeEach(() => {
      const hook = renderHook(() => useSoldOutTracking())
      trackSoldOutRecipes = hook.result.current.trackSoldOutRecipes
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    describe('when called with null', () => {
      test('should not dispatch event', () => {
        const soldOutRecipes = null

        trackSoldOutRecipes(soldOutRecipes)

        expect(dispatch).not.toHaveBeenCalled()
      })
    })

    describe('when called with an array', () => {
      test('should dispatch sold_out_recipes tracking event', () => {
        const soldOutRecipes = ['3', '5', '8']

        trackSoldOutRecipes(soldOutRecipes)

        expect(dispatch).toHaveBeenCalledWith({
          type: 'TRACKING',
          trackingData: {
            actionType: 'sold_out_recipes',
            soldOutRecipes: ['3', '5', '8'],
          },
        })
      })
    })
  })
})
