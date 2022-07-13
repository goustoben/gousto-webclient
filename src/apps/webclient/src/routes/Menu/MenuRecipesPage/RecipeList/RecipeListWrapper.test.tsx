import React from 'react'

import { mount, ReactWrapper } from 'enzyme'
import Immutable from 'immutable'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import { useMenu } from 'routes/Menu/domains/menu'

import { RecipeList } from './RecipeList'
import { RecipeListWrapper } from './RecipeListWrapper'

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

jest.mock('routes/Menu/domains/menu')
const useMenuMock = useMenu as jest.MockedFunction<typeof useMenu>

describe('RecipeListWrapper', () => {
  let wrapper: ReactWrapper

  const recipeId = 'recipe one'
  const mockStore = configureMockStore()
  const store = mockStore({
    basket: Immutable.fromJS({ numPortions: 2 }),
    menuRecipeStock: Immutable.fromJS({
      [recipeId]: {
        2: 100,
        4: 200,
        8: 0,
      },
    }),
    menuService: {
      data: [
        {
          meta: {
            swapsExperimentUserAllocationGroup: 'control',
          },
        },
      ],
      meta: {
        recommendations: {
          version: 'v1',
        },
      },
    },
    menuCollections: Immutable.Map({
      mockCollectionId: Immutable.Map({
        id: 'mockCollectionId',
        slug: 'dairy-free',
        published: true,
        recipesInCollection: ['111'],
      }),
    }),
    boxSummaryDeliveryDays: Immutable.Map({
      '2018-05-04': Immutable.Map({ id: 'mockDeliveryDayId' }),
    }),
  })

  beforeEach(() => {
    useMenuMock.mockReturnValue({
      getRecipesForCollectionId: () => [],
      getOptionsForRecipe: () => [],
    })
  })

  describe('when rendered', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <RecipeListWrapper />
        </Provider>,
      )
    })

    test('should render RecipeList', () => {
      const recipeList = wrapper.find(RecipeList)

      expect(recipeList.exists()).toBe(true)
    })
  })
})
