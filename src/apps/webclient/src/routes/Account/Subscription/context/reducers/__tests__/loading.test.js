import { reduceLoadingState } from '../loading'

let result

const mockState = {
  initial: 'state',
  deliveries: {
    slots: [1, 2, 3]
  }
}

describe('loading reducers', () => {
  describe('reduceLoadingState', () => {
    describe('Given an entity and state are provided', () => {
      beforeEach(() => {
        result = reduceLoadingState(mockState, 'deliveries')
      })

      test('Then state is reduced as expected', () => {
        expect(result).toEqual({
          ...mockState,
          deliveries: {
            ...mockState.deliveries,
            requestState: {
              isLoading: true,
              isLoaded: false
            }
          }
        })
      })
    })
  })
})
