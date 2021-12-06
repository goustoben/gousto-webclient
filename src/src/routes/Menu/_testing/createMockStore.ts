// eslint-disable-next-line import/no-extraneous-dependencies
import configureMockStore from 'redux-mock-store'
import { initialState as basketInitialState } from 'reducers/basket'

type PartialInitialState = Partial<{
  basket: Partial<ReturnType<typeof basketInitialState>>
}>

export const createMockInitialState = ({ basket }: PartialInitialState) => ({
  basket: (
    basket
      ? basketInitialState().merge(basket)
      : basketInitialState()
  )
})

export const createMockStore = (partialState: PartialInitialState) => {
  const initialState = createMockInitialState(partialState)
  const mockStore = configureMockStore()

  const store = mockStore(initialState)

  // eslint-disable-next-line no-undef
  store.dispatch = jest.fn().mockReturnValue(Promise.resolve())

  return store
}
