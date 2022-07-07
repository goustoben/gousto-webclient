// FYI: this will remove after 5 recipes experiment
import Immutable from 'immutable'
// eslint-disable-next-line import/no-extraneous-dependencies
import configureMockStore from 'redux-mock-store'

import { initialState as basketInitialState } from 'reducers/basket'

export const createMockBasketStore = (
  valueOverrides: Partial<ReturnType<typeof basketInitialState>>,
) => {
  const initialState = {
    basket: valueOverrides ? basketInitialState().merge(valueOverrides) : basketInitialState(),
    // FYI: this will remove after 5 recipes experiment
    auth: Immutable.fromJS({}),
  }

  const mockStore = configureMockStore()

  const store = mockStore(initialState)

  // eslint-disable-next-line no-undef
  store.dispatch = jest.fn().mockReturnValue(Promise.resolve())

  return store
}
