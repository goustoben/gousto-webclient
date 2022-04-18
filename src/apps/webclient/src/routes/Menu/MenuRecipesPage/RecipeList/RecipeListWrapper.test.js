import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'
import { RecipeListWrapper } from './RecipeListWrapper'
import { RecipeList } from './RecipeList'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(() => jest.fn()),
}))
jest.mock('actions/tracking')
jest.mock('containers/OptimizelyRollouts')
jest.mock('../../actions/menuRecipeDetails')
jest.mock('../../domains/collections', () => ({
  ...jest.requireActual('../../domains/collections'),
  useCollections: () => ({ currentCollectionId: '1', changeCollectionById: 3 }),
  useCurrentCollectionId: () => '3',
}))
jest.mock('../../domains/menu', () => ({
  useMenu: () => ({
    getRecipesForCollectionId: jest.fn(() => ({ recipes: Immutable.List([]) }))
  }),
  useStock: () => ({
    getOutOfStockRecipeIds: jest.fn(() => null)
  }),
}))

describe('RecipeListWrapper', () => {
  let wrapper
  const mockStore = configureMockStore()
  const store = mockStore({})

  describe('when rendered', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <RecipeListWrapper />
        </Provider>)
    })

    test('should render RecipeList', () => {
      const recipeList = wrapper.find(RecipeList)

      expect(recipeList.exists()).toBe(true)
    })
  })
})
