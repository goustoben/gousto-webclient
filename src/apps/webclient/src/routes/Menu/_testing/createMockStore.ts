import Immutable from 'immutable'
// eslint-disable-next-line import/no-extraneous-dependencies
import configureMockStore from 'redux-mock-store'

import { initialState as authInitialState } from 'reducers/auth'
import { initialState as basketInitialState } from 'reducers/basket'
import { menuInitialState } from 'reducers/menu'
import { initialState as trackingInitialState } from 'reducers/tracking'

const menuInitialStateOverride = () => Immutable.fromJS(menuInitialState)
const menuRecipeDetailsEmpty = () => Immutable.fromJS({})
const trackingInitialStateOverride = () => Immutable.fromJS(trackingInitialState)
const menuCollectionsEmpty = () => Immutable.fromJS({})

type PartialInitialState = Partial<{
  auth: Partial<ReturnType<typeof authInitialState>>
  basket: Partial<ReturnType<typeof basketInitialState>>
  menu: Partial<ReturnType<typeof menuInitialStateOverride>>
  menuRecipeDetails: Partial<ReturnType<typeof menuRecipeDetailsEmpty>>
  tracking: Partial<ReturnType<typeof trackingInitialStateOverride>>
  menuCollections: Partial<ReturnType<typeof menuCollectionsEmpty>>
}>

export const createMockInitialState = ({
  auth,
  basket,
  menu,
  menuRecipeDetails,
  tracking,
  menuCollections,
}: PartialInitialState) => ({
  auth: auth ? authInitialState().merge(auth) : authInitialState(),
  basket: basket ? basketInitialState().merge(basket) : basketInitialState(),
  menu: menu ? menuInitialStateOverride().merge(menu) : menuInitialStateOverride(),
  menuRecipeDetails: menuRecipeDetails
    ? menuRecipeDetailsEmpty().merge(menuRecipeDetails)
    : menuRecipeDetailsEmpty(),
  tracking: tracking
    ? trackingInitialStateOverride().merge(trackingInitialState)
    : trackingInitialStateOverride(),
  menuCollections: menuCollections
    ? menuCollectionsEmpty().merge(menuCollections)
    : menuCollectionsEmpty(),
})

export const createMockStore = (partialState: PartialInitialState = {}) => {
  const initialState = createMockInitialState(partialState)
  const mockStore = configureMockStore()

  const store = mockStore(initialState)

  // eslint-disable-next-line no-undef
  store.dispatch = jest.fn().mockReturnValue(Promise.resolve())

  return store
}
