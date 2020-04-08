import Immutable from 'immutable'
import * as filterActions from 'actions/filters'
import * as collectionUtils from 'utils/collections'

import { safeJestMock } from '_testing/mocks'
import { menuSetLandingCollection } from '../menuSetLandingCollection'

import * as collectionSelectors from '../../selectors/collections'

describe('given menuSetLandingCollection action is called', () => {
  let state
  const dispatch = jest.fn()
  const getState = () => state

  const DEFAULT_COLLECTION_ID = '1234'
  const COLLECTION_FILTER_CHANGE_SYMBOL = Symbol('collectionFilterChange response')

  let getDefaultCollection
  let getCollectionIdWithName
  let collectionFilterChange

  beforeEach(() => {
    state = {
      routing: {
        locationBeforeTransitions: {
          query: {

          }
        }
      }
    }

    getDefaultCollection = safeJestMock(collectionSelectors, 'getDefaultCollection')
    getDefaultCollection.mockReturnValue(Immutable.fromJS({
      id: DEFAULT_COLLECTION_ID,
      published: true,
      slug: 'all-recipes'
    }))
    getCollectionIdWithName = safeJestMock(collectionUtils, 'getCollectionIdWithName')
    collectionFilterChange = safeJestMock(filterActions, 'collectionFilterChange')
    collectionFilterChange.mockImplementation(id => ({
      symbol: COLLECTION_FILTER_CHANGE_SYMBOL,
      id
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when not on menu page', () => {
    beforeEach(() => {
      state = {
        ...state,
        routing: {
          locationBeforeTransitions: {
            pathName: '/my-deliveries'
          }
        }
      }
    })

    test('should dispatch no actions', () => {
      menuSetLandingCollection()(dispatch, getState)

      expect(dispatch).not.toHaveBeenCalled()
    })
  })

  describe('when on menu page', () => {
    beforeEach(() => {
      state = {
        ...state,
        routing: {
          locationBeforeTransitions: {
            pathName: '/menu'
          }
        }
      }
    })

    describe('when query has a collection slug', () => {
      beforeEach(() => {
        state = {
          ...state,
          routing: {
            locationBeforeTransitions: {
              ...state.routing.locationBeforeTransitions,
              query: {
                collection: 'some-collection'
              }
            }
          }
        }
      })

      describe('when that collection slug is valid', () => {
        beforeEach(() => {
          getCollectionIdWithName.mockImplementation((_state, slug) => {
            if (slug === 'some-collection') {
              return 'some-collection-id'
            }

            return null
          })
        })

        test('should dispatch no actions', () => {
          menuSetLandingCollection()(dispatch, getState)

          expect(dispatch).not.toHaveBeenCalled()
        })
      })

      describe('when that collection slug is invalid', () => {
        beforeEach(() => {
          getCollectionIdWithName.mockReturnValue(null)
        })

        test('should dispatch collectionFilterChange with default id', () => {
          menuSetLandingCollection()(dispatch, getState)

          expect(dispatch).toHaveBeenCalledWith({
            symbol: COLLECTION_FILTER_CHANGE_SYMBOL,
            id: DEFAULT_COLLECTION_ID
          })
        })
      })
    })

    describe('when query has no collection slug', () => {
      beforeEach(() => {
        state = {
          ...state,
          routing: {
            locationBeforeTransitions: {
              ...state.routing.locationBeforeTransitions,
              query: {
              }
            }
          }
        }
      })

      test('should dispatch collectionFilterChange with default id', () => {
        menuSetLandingCollection()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({
          symbol: COLLECTION_FILTER_CHANGE_SYMBOL,
          id: DEFAULT_COLLECTION_ID
        })
      })

      describe('when there is no default collection', () => {
        beforeEach(() => {
          getDefaultCollection.mockReturnValue(null)
        })

        test('should dispatch no actions', () => {
          menuSetLandingCollection()(dispatch, getState)

          expect(dispatch).not.toHaveBeenCalled()
        })
      })
    })
  })

  describe('when on menu page with an order', () => {
    beforeEach(() => {
      state = {
        ...state,
        routing: {
          locationBeforeTransitions: {
            pathName: '/menu/1234'
          }
        }
      }
    })

    describe('when query has a collection slug', () => {
      beforeEach(() => {
        state = {
          ...state,
          routing: {
            locationBeforeTransitions: {
              ...state.routing.locationBeforeTransitions,
              query: {
                collection: 'some-collection'
              }
            }
          }
        }
      })

      describe('when that collection slug is valid', () => {
        beforeEach(() => {
          getCollectionIdWithName.mockImplementation((_state, slug) => {
            if (slug === 'some-collection') {
              return 'some-collection-id'
            }

            return null
          })
        })

        test('should dispatch no actions', () => {
          menuSetLandingCollection()(dispatch, getState)

          expect(dispatch).not.toHaveBeenCalled()
        })
      })

      describe('when that collection slug is invalid', () => {
        beforeEach(() => {
          getCollectionIdWithName.mockReturnValue(null)
        })

        test('should dispatch collectionFilterChange with default id', () => {
          menuSetLandingCollection()(dispatch, getState)

          expect(dispatch).toHaveBeenCalledWith({
            symbol: COLLECTION_FILTER_CHANGE_SYMBOL,
            id: DEFAULT_COLLECTION_ID
          })
        })
      })
    })

    describe('when query has no collection slug', () => {
      beforeEach(() => {
        state = {
          ...state,
          routing: {
            locationBeforeTransitions: {
              ...state.routing.locationBeforeTransitions,
              query: {
              }
            }
          }
        }
      })

      test('should dispatch collectionFilterChange with default id', () => {
        menuSetLandingCollection()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({
          symbol: COLLECTION_FILTER_CHANGE_SYMBOL,
          id: DEFAULT_COLLECTION_ID
        })
      })
    })
  })
})
