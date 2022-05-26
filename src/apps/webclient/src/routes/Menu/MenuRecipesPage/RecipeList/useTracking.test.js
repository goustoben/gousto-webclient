import * as React from 'react'

import { renderHook } from '@testing-library/react-hooks'
import Immutable from 'immutable'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { v4 as uuid } from 'uuid'

import { useTracking } from './useTracking'

jest.mock('uuid', () => ({
  ...jest.requireActual('uuid'),
  v4: jest.fn(),
}))

describe('useTracking', () => {
  let wrapper
  let store
  const mockIdentifier = 'mockIdentifier'
  const mockCollectionId = 'mockCollectionId'
  const mockDisplayedOrder = ['123', '456']

  beforeEach(() => {
    uuid.mockReturnValue(mockIdentifier)

    const mockStore = configureMockStore()
    store = mockStore({
      basket: Immutable.Map({
        orderId: 'mockOrderId',
        date: '2018-05-04',
        currentMenuId: 'mockCurrentMenuId',
      }),
      menuBrowseCTAShow: false,
      recipes: Immutable.Map({
        a: Immutable.Map({ isRecommended: true }),
        b: Immutable.Map({ isRecommended: false }),
      }),
      boxSummaryDeliveryDays: Immutable.Map({
        '2018-05-04': Immutable.Map({ id: 'mockDeliveryDayId' }),
      }),
      menu: Immutable.Map({}),
      filters: Immutable.Map({
        currentCollectionId: '678',
      }),
      menuCollections: Immutable.Map({
        [mockCollectionId]: Immutable.Map({
          id: mockCollectionId,
          slug: 'dairy-free',
          published: true,
          recipesInCollection: ['111'],
        }),
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
    })

    // eslint-disable-next-line react/prop-types
    wrapper = ({ children }) => <Provider store={store}>{children}</Provider>
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('when calling useTracking', () => {
    test('it does not dispatch actions on initial render', () => {
      renderHook(() => useTracking(), { wrapper })

      const actions = store.getActions()
      expect(actions).toHaveLength(0)
    })

    test('it dispatches correct TRACKING payload when calling function returned from hook', () => {
      const { result } = renderHook(() => useTracking(), { wrapper })

      result.current(mockCollectionId, mockDisplayedOrder)

      const actions = store.getActions()
      expect(actions).toHaveLength(2)
      expect(actions[0]).toEqual({
        type: 'RECIPES_SHOWN',
        trackingData: {
          actionType: 'recipes_shown',
          identifier: mockIdentifier,
          displayedOrder: mockDisplayedOrder,
        },
      })
      expect(actions[1]).toEqual({
        type: 'VIEW_RECIPE_LIST',
        trackingData: {
          actionType: 'view_recipe_list',
          identifier: mockIdentifier,
          collectionId: mockCollectionId,
          collectionName: 'dairy-free',
          deliveryDayId: 'mockDeliveryDayId',
          orderId: 'mockOrderId',
          browseMode: false,
          recommenderVersion: 'v1',
          currentMenuId: 'mockCurrentMenuId',
          transactionType: 'not set',
          severedVariantExperimentBucket: 'control',
        },
      })
    })
  })
})
