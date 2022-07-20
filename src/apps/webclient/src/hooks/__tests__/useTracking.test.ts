import { renderHook } from '@testing-library/react-hooks'
import * as ReactRedux from 'react-redux'

import { useCreateTrackEvent } from '../useTracking'

describe('useCreateTrackEvent', () => {
  const dispatch = jest.fn()

  beforeEach(() => {
    jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => dispatch)
  })

  afterEach(jest.clearAllMocks)

  describe('when calling useCreateTrackEvent is called with tracking data', () => {
    test('it dispatches a TRACKING payload', () => {
      const { result } = renderHook(() =>
        useCreateTrackEvent({
          event: 'recipe-alternative-options-menu-open',
          collectionId: 'collection_1',
          recipeId: 'recipe_1',
        }),
      )

      result.current()

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

  describe('when method useCreateTrackEvent returns is called with tracking data', () => {
    test('it dispatches a TRACKING payload', () => {
      const { result } = renderHook(() => useCreateTrackEvent())

      result.current({
        event: 'recipe-alternative-options-menu-open',
        collectionId: 'collection_1',
        recipeId: 'recipe_1',
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
})
