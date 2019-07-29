import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'

import actionTypes from 'actions/actionTypes'
import { basketDateChange, basketSlotChange } from 'actions/basket'
import { recommendationsSlug } from 'config/collections'
import { getPreselectedCollectionName, selectCollection, setSlotFromIds } from '../utils'

jest.mock('actions/basket', () => ({
  basketDateChange: jest.fn(),
  basketSlotChange: jest.fn()
}))

describe('getPreselectedCollectionName', () => {
  const state = {
    features: {}
  }

  describe('when collectionFreeze feature is set to non-empty string value', () => {
    beforeEach(() => {
      state.features = Immutable.fromJS({
        collectionFreeze: {
          value: 'non-empty string'
        }
      })
    })

    it('should return value of collectionFreeze', () => {
      expect(getPreselectedCollectionName(state)).toEqual('non-empty string')
    })
  })

  describe('when collectionFreeze feature is empty value', () => {
    beforeEach(() => {
      state.features = Immutable.fromJS({
        collectionFreeze: {
          value: ''
        }
      })
    })

    describe('and just for you collection is present', () => {
      beforeEach(() => {
        state.menuCollections = Immutable.fromJS({
          recommendations: { slug: 'recommendations' },
        })
      })

      describe('and collection name from query param is empty', () => {
        const collectionNameFormQueryParam = ''

        it('should return recommendations collection short title', () => {
          expect(getPreselectedCollectionName(state, collectionNameFormQueryParam)).toEqual(recommendationsSlug)
        })
      })

      describe('and collection name from query param is not empty', () => {
        const collectionNameFormQueryParam = 'query-collection-name'

        it('should return collection name from query param', () => {
          expect(getPreselectedCollectionName(state, collectionNameFormQueryParam)).toEqual(collectionNameFormQueryParam)
        })
      })
    })

    describe('and just for you collection is not present', () => {
      beforeEach(() => {
        state.menuCollections = Immutable.fromJS({})
      })

      it('should return collection name from query param', () => {
        expect(getPreselectedCollectionName(state, 'default-collection-name')).toEqual('default-collection-name')
      })
    })
  })
})

describe('selectCollection', () => {
  const initalState = {
    features: Immutable.Map({}),
    menuCollections: Immutable.Map({}),
    menuCollectionRecipes: Immutable.Map({
      testCollectionId: Immutable.List(['1', '2', '3'])
    })
  }

  describe('when collection id exists for the given collection name and collection is published', () => {
    const collectionName = 'test-collection-name'

    beforeEach(() => {
      initalState.menuCollections = Immutable.Map(
        Immutable.fromJS({
          testCollectionId: {
            id: 'testCollectionId',
            shortTitle: 'test collection name',
            slug: 'test-collection-name',
            published: true
          }
        })
      )
    })

    it('should dispatch FILTERS_COLLECTION_CHANGE event with collection id', () => {
      const mockStore = configureMockStore()
      const store = mockStore(initalState)

      selectCollection(store.getState(), collectionName, store.dispatch)

      expect(store.getActions()).toContainEqual({
        type: actionTypes.FILTERS_COLLECTION_CHANGE,
        collectionId: 'testCollectionId',
      })
    })
  })

  describe('and collection id does not exist for the give collection name', () => {
    const collectionName = 'test-collection-name'

    beforeEach(() => {
      initalState.menuCollections = Immutable.Map(
        Immutable.fromJS({
          differentId: {
            id: 'differentId',
            shortTitle: 'different name',
            default: false
          },
          defaultCollection: {
            id: 'defaultCollectionId',
            shortTitle: 'default collection name',
            default: true
          }
        })
      )
    })

    it('should dispatch FILTERS_COLLECTION_CHANGE event with default collection id', () => {
      const mockStore = configureMockStore()
      const store = mockStore(initalState)

      selectCollection(store.getState(), collectionName, store.dispatch)

      expect(store.getActions()).toContainEqual({
        type: actionTypes.FILTERS_COLLECTION_CHANGE,
        collectionId: 'defaultCollectionId',
      })
    })
  })
})

describe('setSlotFromIds', () => {
  const dispatchSpy = jest.fn()
  const state = {
    boxSummaryDeliveryDays: {}
  }
  beforeEach(() => {
    state.boxSummaryDeliveryDays = Immutable.fromJS({
      '2019-08-02': {
        id: '6c1caad9-d666-4dc5-83e6-ff0769dff502',
        date: '2019-08-02',
        isDefault: false,
        coreDayId: '1811',
        unavailableReason: '',
        alternateDeliveryDay: null,
        slots: [
          {
            whenCutoff: '2019-07-30T11:59:59+01:00',
            cutoffDay: 2,
            deliveryEndTime: '19:00:00',
            deliveryPrice: '0.00',
            isDefault: true,
            coreSlotId: '4',
            cutoffTime: '11:59:59',
            deliveryStartTime: '08:00:00',
            id: 'db015db8-12d1-11e6-b30b-06ddb628bdc5',
            defaultDay: 5
          },
          {
            whenCutoff: '2019-07-30T11:59:59+01:00',
            cutoffDay: 2,
            deliveryEndTime: '12:00:00',
            deliveryPrice: '2.99',
            isDefault: false,
            coreSlotId: '24',
            cutoffTime: '11:59:59',
            deliveryStartTime: '08:00:00',
            id: 'ba716ad8-d8cf-4264-9835-ebabc6011ed4',
            defaultDay: 5
          },
          {
            whenCutoff: '2019-07-30T11:59:59+01:00',
            cutoffDay: 2,
            deliveryEndTime: '22:00:00',
            deliveryPrice: '2.99',
            isDefault: false,
            coreSlotId: '25',
            cutoffTime: '11:59:59',
            deliveryStartTime: '18:00:00',
            id: '8ee02d93-aad4-4a6e-ac49-9c66dd667082',
            defaultDay: 5
          }
        ],
        daySlots: [
          {
            id: '3557',
            dayId: '6c1caad9-d666-4dc5-83e6-ff0769dff502',
            slotId: '8ee02d93-aad4-4a6e-ac49-9c66dd667082',
            whenCutoff: '2019-07-30T11:59:59+01:00',
            unavailableReason: '',
            alternateDay: null
          },
          {
            id: '3870',
            dayId: '6c1caad9-d666-4dc5-83e6-ff0769dff502',
            slotId: 'ba716ad8-d8cf-4264-9835-ebabc6011ed4',
            whenCutoff: '2019-07-30T11:59:59+01:00',
            unavailableReason: '',
            alternateDay: null
          },
          {
            id: '4079',
            dayId: '6c1caad9-d666-4dc5-83e6-ff0769dff502',
            slotId: 'db015db8-12d1-11e6-b30b-06ddb628bdc5',
            whenCutoff: '2019-07-30T11:59:59+01:00',
            unavailableReason: '',
            alternateDay: null
          }
        ]
      },
      '2019-08-03': {
        id: '54966866-d89a-4ba3-835d-76c3334568ff',
        date: '2019-08-03',
        isDefault: false,
        coreDayId: '1819',
        unavailableReason: '',
        alternateDeliveryDay: null,
        slots: [
          {
            whenCutoff: '2019-07-31T11:59:59+01:00',
            cutoffDay: 3,
            deliveryEndTime: '19:00:00',
            deliveryPrice: '0.00',
            isDefault: true,
            coreSlotId: '6',
            cutoffTime: '11:59:59',
            deliveryStartTime: '08:00:00',
            id: 'db047c82-12d1-11e6-bc7b-06ddb628bdc5',
            defaultDay: 6
          },
          {
            whenCutoff: '2019-07-31T11:59:59+01:00',
            cutoffDay: 3,
            deliveryEndTime: '12:00:00',
            deliveryPrice: '2.99',
            isDefault: false,
            coreSlotId: '29',
            cutoffTime: '11:59:59',
            deliveryStartTime: '08:00:00',
            id: '30ef5793-1fd2-4859-a11e-fe7eb8412305',
            defaultDay: 6
          }
        ],
        daySlots: [
          {
            id: '4132',
            dayId: '54966866-d89a-4ba3-835d-76c3334568ff',
            slotId: 'db047c82-12d1-11e6-bc7b-06ddb628bdc5',
            whenCutoff: '2019-07-31T11:59:59+01:00',
            unavailableReason: '',
            alternateDay: null
          },
          {
            id: '4230',
            dayId: '54966866-d89a-4ba3-835d-76c3334568ff',
            slotId: '30ef5793-1fd2-4859-a11e-fe7eb8412305',
            whenCutoff: '2019-07-31T11:59:59+01:00',
            unavailableReason: '',
            alternateDay: null
          }
        ]
      },
    })
    jest.clearAllMocks()
  })
  describe('when slot_id is provided', () => {
    it('should set the given slot ID and the corresponding date',() => {
      const slotId = '30ef5793-1fd2-4859-a11e-fe7eb8412305'

      setSlotFromIds(state, slotId, null, dispatchSpy)

      expect(basketDateChange).toHaveBeenCalledWith("2019-08-03")
      expect(basketSlotChange).toHaveBeenCalledWith(slotId)
    })
  })
  describe('when day_id is provided', () => {
    it('should set the given date and reset the slot id',() => {
      const dayId = '54966866-d89a-4ba3-835d-76c3334568ff'

      setSlotFromIds(state, null, dayId, dispatchSpy)

      expect(basketDateChange).toHaveBeenCalledWith("2019-08-03")
      expect(basketSlotChange).toHaveBeenCalledWith('')
    })
  })
})
