import Immutable from 'immutable'
// eslint-disable-next-line import/no-extraneous-dependencies
import configureMockStore from 'redux-mock-store'

import { initialState as basketInitialState } from 'reducers/basket'
import { initialState as trackingInitialState } from 'reducers/tracking'

export const createMockBasketStore = (
  basketOverrides: Partial<ReturnType<typeof basketInitialState>>,
  {
    menuRecipeDetails,
    tracking,
    menuCollections,
  }: Partial<{
    menuRecipeDetails: any
    tracking: typeof trackingInitialState
    menuCollections: any
  }> = {},
) => {
  const initialState = {
    basket: basketOverrides ? basketInitialState().merge(basketOverrides) : basketInitialState(),
    tracking: tracking ? trackingInitialState.merge(tracking) : trackingInitialState,
    menuRecipeDetails: menuRecipeDetails || Immutable.Map(),
    menuCollections: menuCollections || Immutable.OrderedMap(),
  }

  const mockStore = configureMockStore()

  const store = mockStore(initialState)

  // eslint-disable-next-line no-undef
  store.dispatch = jest.fn().mockReturnValue(Promise.resolve())

  return store
}
