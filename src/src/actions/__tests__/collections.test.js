import Immutable from 'immutable'

import { fetchCollections } from 'apis/collections'

import {
  collectionsLoadCollections,
} from 'actions/collections'

jest.mock('apis/collections', () => ({
  fetchCollections: jest.fn(),
}))

const createCollectionState = ({ isAuthenticated }) => ({
  auth: Immutable.Map({
    accessToken: 'an-access-token',
    isAuthenticated,
  }),
})

describe('collection actions', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('collectionsLoadCollections', () => {
    describe('when authenticated', () => {
      beforeEach(() => {
        getState.mockReturnValue(createCollectionState({
          isAuthenticated: true,
        }))
      })

      test('should dispatch a fetchCollections request containing jfy experiment', () => {
        collectionsLoadCollections()(dispatch, getState)

        expect(fetchCollections).toHaveBeenCalledWith(
          'an-access-token',
          '',
          expect.objectContaining({
            experiments: {
              'justforyou_v2': true,
            },
          })
        )
      })
    })

    describe('when not authenticated', () => {
      beforeEach(() => {
        getState.mockReturnValue(createCollectionState({
          isAuthenticated: false,
        }))
      })

      test('should dispatch a fetchCollections request without experiments preset', () => {
        collectionsLoadCollections()(dispatch, getState)

        expect(fetchCollections).toHaveBeenCalledWith(
          'an-access-token',
          '',
          {}
        )
      })
    })
  })
})
