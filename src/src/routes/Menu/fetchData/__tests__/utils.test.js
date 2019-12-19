import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'

import actionTypes from 'actions/actionTypes'
import { basketDateChange, basketSlotChange } from 'actions/basket'
import { redirect } from 'actions/redirect'
import { recommendationsSlug } from 'config/collections'
import { getPreselectedCollectionName, selectCollection, setSlotFromIds } from '../utils'

jest.mock('actions/basket', () => ({
  basketDateChange: jest.fn(),
  basketSlotChange: jest.fn()
}))
jest.mock('actions/redirect', () => ({
  redirect: jest.fn()
}))

describe('getPreselectedCollectionName', () => {
  const state = {
    features: {}
  }

  describe('when just for you collection is present', () => {
    beforeEach(() => {
      state.menuCollections = Immutable.fromJS({
        recommendations: { slug: 'recommendations' },
      })
    })

    describe('when collection name from query param is empty', () => {
      const collectionNameFormQueryParam = ''

      it('should return recommendations collection short title', () => {
        expect(getPreselectedCollectionName(state, collectionNameFormQueryParam)).toEqual(recommendationsSlug)
      })
    })

    describe('when collection name from query param is not empty', () => {
      const collectionNameFormQueryParam = 'query-collection-name'

      it('should return collection name from query param', () => {
        expect(getPreselectedCollectionName(state, collectionNameFormQueryParam)).toEqual(collectionNameFormQueryParam)
      })
    })
  })

  describe('when just for you collection is not present', () => {
    beforeEach(() => {
      state.menuCollections = Immutable.fromJS({})
    })

    it('should return collection name from query param', () => {
      expect(getPreselectedCollectionName(state, 'default-collection-name')).toEqual('default-collection-name')
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
        coreDayId: '1800',
        date: '2019-08-02',
        slots: [
          {
            id: 'db015db8-12d1-11e6-b30b-06ddb628bdc5',
            coreSlotId: '1'
          },
          {
            id: 'ba716ad8-d8cf-4264-9835-ebabc6011ed4',
            coreSlotId: '2'
          },
          {
            id: '8ee02d93-aad4-4a6e-ac49-9c66dd667082',
            coreSlotId: '3'
          }
        ]
      },
      '2019-08-03': {
        coreDayId: '1801',
        date: '2019-08-03',
        slots: [
          {
            id: 'db047c82-12d1-11e6-bc7b-06ddb628bdc5',
            coreSlotId: '4'
          },
          {
            id: '30ef5793-1fd2-4859-a11e-fe7eb8412305',
            coreSlotId: '5'
          }
        ]
      },
    })
    jest.clearAllMocks()
  })
  describe('when a valid day_id and slot_id are provided', () => {
    it('should set the matching slot ID and the corresponding date', () => {
      const slotId = '30ef5793-1fd2-4859-a11e-fe7eb8412305'
      const date = '2019-08-03'
      const coreSlotId = '5'
      const coreDayId = '1801'

      setSlotFromIds(state, coreSlotId, coreDayId, dispatchSpy)

      expect(basketDateChange).toHaveBeenCalledWith(date)
      expect(basketSlotChange).toHaveBeenCalledWith(slotId)
    })
  })
  describe('when a valid day_id is provided', () => {
    it('should set the given date and reset the slot id', () => {
      const dayId = '1801'

      setSlotFromIds(state, null, dayId, dispatchSpy)

      expect(basketDateChange).toHaveBeenCalledWith("2019-08-03")
      expect(basketSlotChange).toHaveBeenCalledWith('')
    })
  })
  describe('when an invalid parameter is provided', () => {
    it('should set redirect to menu', () => {
      const slotId = 'invalid-id'

      setSlotFromIds(state, slotId, null, dispatchSpy)

      expect(basketDateChange).not.toHaveBeenCalled()
      expect(basketSlotChange).not.toHaveBeenCalled()
      expect(redirect).not.toHaveBeenCalled()
    })
  })
})
