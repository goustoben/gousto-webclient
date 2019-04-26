import Immutable from 'immutable'

import { featureSet } from 'actions/features'
import { fetchCollections } from 'apis/collections'

import {
  collectionsLoadCollections,
} from 'actions/collections'

jest.mock('apis/collections', () => ({
  fetchCollections: jest.fn(),
}))

jest.mock('actions/features', () => ({
  featureSet: jest.fn(),
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

    describe('when fetchCollections does not return meta', () => {
      beforeEach(() => {
        getState.mockReturnValue(createCollectionState({
          isAuthenticated: true,
        }))
      })

      beforeEach(() => {
        fetchCollections.mockReturnValue(Promise.resolve())
      })

      test('should not dispatch a featureSet action', async () => {
        await collectionsLoadCollections()(dispatch, getState)

        expect(featureSet).not.toHaveBeenCalled()
      })
    })

    describe('when fetchCollections returns meta', () => {
      beforeEach(() => {
        getState.mockReturnValue(createCollectionState({
          isAuthenticated: true,
        }))
      })

      describe('containing an enabled jfy tutorial', () => {
        beforeEach(() => {
          fetchCollections.mockReturnValue(Promise.resolve({
            meta: {
              properties: {
                collection: {
                  enabled: true,
                  limit: 25,
                  name: "Just For You",
                  tutorial: "jfy"
                }
              }
            }
          }))
        })

        test('should dispatch a featureSet action', async () => {
          await collectionsLoadCollections()(dispatch, getState)

          expect(featureSet).toHaveBeenCalledWith(
            'jfyTutorial',
            true,
          )
        })
      })

      describe('containing a disabled jfy tutorial', () => {
        beforeEach(() => {
          fetchCollections.mockReturnValue(Promise.resolve({
            meta: {
              properties: {
                collection: {
                  enabled: true,
                  limit: 20,
                  name: "Just For You"
                }
              }
            }
          }))
        })

        test('should dispatch a featureSet action', async () => {
          await collectionsLoadCollections()(dispatch, getState)

          expect(featureSet).toHaveBeenCalledWith(
            'jfyTutorial',
            false,
          )
        })
      })
    })
  })
})
