import Immutable from 'immutable'
import * as optimizelySDK from 'containers/OptimizelyRollouts/optimizelySDK'
import {
  getMenuCollections,
  getRecommendationsCollection,
  getDisplayedCollections,
  getMenuRecipeStock,
  getDefaultCollection,
  getCollectionSlugFromQuery,
  getRecommendationShortName,
  getCurrentCollectionSlug,
  getCollectionsHeaders,
  getCurrentCollectionDietaryClaims,
  getCurrentCollectionIdByExperimentStatus
} from '../collections'

jest.mock('containers/OptimizelyRollouts/optimizelySDK')

describe('collections selectors', () => {
  describe('getCollectionSlugFromQuery', () => {
    describe('when no routing on state', () => {
      const state = {}

      test('should return null', () => {
        const result = getCollectionSlugFromQuery(state)

        expect(result).toEqual(null)
      })
    })

    describe('when query has a `collection` parameter', () => {
      const state = {
        routing: {
          locationBeforeTransitions: {
            query: {
              collection: 'gluten-free'
            }
          },
        }
      }

      test('should return slug', () => {
        const result = getCollectionSlugFromQuery(state)

        expect(result).toEqual('gluten-free')
      })
    })

    describe('when query has an empty `collection` parameter', () => {
      const state = {
        routing: {
          locationBeforeTransitions: {
            query: {
              collection: ''
            }
          },
        }
      }

      test('should return null', () => {
        const result = getCollectionSlugFromQuery(state)

        expect(result).toEqual(null)
      })
    })

    describe('when query has no `collection` parameter', () => {
      const state = {
        routing: {
          locationBeforeTransitions: {
            query: {}
          },
        }
      }

      test('should return null', () => {
        const result = getCollectionSlugFromQuery(state)

        expect(result).toEqual(null)
      })
    })
  })

  describe('getRecommendationShortName', () => {
    let state
    test('should return the shortName for recommendations collection', () => {
      state = {
        menuCollections: Immutable.fromJS({
          '12dddv3v3': {
            id: '12dddv3v3',
            slug: 'recommendations',
            shortTitle: 'Choosen For You'
          }
        })
      }
      expect(getRecommendationShortName(state)).toBe('Choosen For You')
    })

    test('should return empty string if recommendations does not exist', () => {
      state = {
        menuCollections: Immutable.fromJS({
          '12bbbbbv3': {
            id: '12bbbbbv3',
            slug: 'test',
            shortTitle: 'Test Collection'
          }
        })
      }
      expect(getRecommendationShortName(state)).toBe('')
    })
  })

  describe('getRecommendationsCollection', () => {
    describe('when a collection has slug `recommendations`', () => {
      const collection = Immutable.Map({ id: '123', slug: 'recommendations' })
      const menuCollections = Immutable.OrderedMap({
        123: collection
      })

      test('should return that collection', () => {
        const result = getRecommendationsCollection({ menuCollections })

        expect(result).toEqual(collection)
      })
    })

    describe('when no collection has slug `recommendations`', () => {
      const collection = Immutable.Map({ id: '123', slug: 'foo' })
      const menuCollections = Immutable.OrderedMap({
        123: collection
      })

      test('should return null', () => {
        const result = getRecommendationsCollection({ menuCollections })

        expect(result).toEqual(null)
      })
    })
  })

  describe('getMenuCollections', () => {
    test('should return menuCollections from state', () => {
      const collectionA = Immutable.Map({ id: '123', published: true })
      const collectionB = Immutable.Map({ id: '456', published: true })

      const menuCollections = Immutable.OrderedMap({
        123: collectionA,
        456: collectionB,
      })

      const result = getMenuCollections({ menuCollections })
      expect(result).toEqual(menuCollections)
    })
  })

  describe('getMenuRecipeStock', () => {
    test('should return menuRecipeStock from state', () => {
      const menuRecipeStock = Immutable.fromJS({
        123: { 2: 500, 4: 800 }
      })

      const result = getMenuRecipeStock({ menuRecipeStock })
      expect(result).toEqual(menuRecipeStock)
    })
  })

  describe('getDisplayedCollections', () => {
    const numPortions = 2

    describe('when there is no recommendations collection', () => {
      const menuRecipeStock = Immutable.fromJS({
        123: { 2: 1000, 4: 1000 },
        234: { 2: 1000, 4: 1000 }
      })

      const recommendationCollection = null

      describe('when there are 2 collections with recipes', () => {
        const collectionA = Immutable.Map({ id: '123', published: true, recipesInCollection: Immutable.List(['345'])})
        const collectionB = Immutable.Map({ id: '234', published: true, recipesInCollection: Immutable.List(['456'])})
        const menuCollections = Immutable.OrderedMap({
          234: collectionB,
          123: collectionA,
        })

        test('should return both collections', () => {
          const result = getDisplayedCollections.resultFunc(menuCollections, menuRecipeStock, numPortions, recommendationCollection)
          const expected = Immutable.OrderedMap({
            234: collectionB,
            123: collectionA,
          })

          expect(result).toEqual(expected)
        })
      })

      describe('when there is a collection without a recipesInCollection entry', () => {
        const collectionA = Immutable.Map({ id: '123', published: true })
        const collectionB = Immutable.Map({ id: '234', published: true, recipesInCollection: Immutable.List(['345']) })
        const menuCollections = Immutable.OrderedMap({
          234: collectionB,
          123: collectionA,
        })

        test('should not return that collection', () => {
          const result = getDisplayedCollections.resultFunc(menuCollections, menuRecipeStock, numPortions, recommendationCollection)
          const expected = Immutable.OrderedMap({
            234: collectionB,
          })

          expect(result).toEqual(expected)
        })
      })

      describe('when there is a collection without recipes', () => {
        const collectionA = Immutable.Map({ id: '123', published: true, recipesInCollection: Immutable.List([]) })
        const collectionB = Immutable.Map({ id: '234', published: true, recipesInCollection: Immutable.List(['345']) })
        const menuCollections = Immutable.OrderedMap({
          234: collectionB,
          123: collectionA,
        })

        test('should not return that collection', () => {
          const result = getDisplayedCollections.resultFunc(menuCollections, menuRecipeStock, numPortions, recommendationCollection)
          const expected = Immutable.OrderedMap({
            234: collectionB,
          })

          expect(result).toEqual(expected)
        })
      })

      describe('when there is an unpublished collection', () => {
        const collectionA = Immutable.Map({ id: '123', published: true, recipesInCollection: Immutable.List(['456']) })
        const collectionB = Immutable.Map({ id: '234', published: false, recipesInCollection: Immutable.List(['345']) })
        const menuCollections = Immutable.OrderedMap({
          234: collectionB,
          123: collectionA,
        })

        test('should not return that collection', () => {
          const result = getDisplayedCollections.resultFunc(menuCollections, menuRecipeStock, numPortions, recommendationCollection)
          const expected = Immutable.OrderedMap({
            123: collectionA,
          })

          expect(result).toEqual(expected)
        })
      })
    })

    describe('when there is a recommendations collection', () => {
      const recommendations = Immutable.Map({ id: '123', slug: 'recommendations', published: true, recipesInCollection: Immutable.List(['111', '222', '333', '444']) })
      const otherCollection = Immutable.Map({ id: '456', published: true, recipesInCollection: Immutable.List(['111']) })
      const menuCollections = Immutable.OrderedMap({
        123: recommendations,
        456: otherCollection
      })

      describe('when recommendations collection has 4 recipes in stock', () => {
        const menuRecipeStock = Immutable.fromJS({
          111: { 2: 1000, 4: 1000 },
          222: { 2: 1000, 4: 1000 },
          333: { 2: 1000, 4: 1000 },
          444: { 2: 1000, 4: 1000 },
        })

        test('should return recommendations collection', () => {
          const result = getDisplayedCollections.resultFunc(menuCollections, menuRecipeStock, numPortions, recommendations)

          expect(result).toEqual(menuCollections)
        })
      })

      describe('when recommendations collection has 3 recipes in stock', () => {
        const menuRecipeStock = Immutable.fromJS({
          111: { 2: 1000, 4: 1000 },
          222: { 2: 1000, 4: 1000 },
          333: { 2: 1000, 4: 1000 },
          444: { 2: 0, 4: 1000 },
        })

        test('should not return recommendations collection', () => {
          const result = getDisplayedCollections.resultFunc(menuCollections, menuRecipeStock, numPortions, recommendations)

          expect(result).toEqual(Immutable.OrderedMap({ 456: otherCollection }))
        })
      })
    })
  })

  describe('getDefaultCollection', () => {
    let state

    beforeEach(() => {
      state = {
        basket: Immutable.fromJS({
          numPortions: 2
        }),
        menuCollections: Immutable.fromJS({
          201: {recipesInCollection: ['101', '102', '103', '104']},
          202: {recipesInCollection: ['101', '102', '103', '104']},
        }),
        menuRecipeStock: Immutable.fromJS({
          101: { 2: 500, 4: 800 },
          102: { 2: 500, 4: 800 },
          103: { 2: 500, 4: 800 },
          104: { 2: 500, 4: 800 },
        })
      }
    })

    describe('when there is a collection marked default', () => {
      const defaultCollection = Immutable.fromJS({ id: '201', published: true, default: true, slug: 'other', recipesInCollection: ['101', '102', '103', '104'] })
      const recommendationCollection = Immutable.fromJS({ id: '202', published: true, slug: 'recommendations', recipesInCollection: ['101', '102', '103', '104'] })

      beforeEach(() => {
        state = {
          ...state,
          menuCollections: Immutable.Map({
            201: defaultCollection,
            202: recommendationCollection
          })
        }
      })

      test('should return default collection', () => {
        const result = getDefaultCollection(state)

        expect(result).toEqual(defaultCollection)
      })
    })

    describe('when there is not a collection marked default', () => {
      describe('when there is a recommendations with sufficient stock', () => {
        const fooCollection = Immutable.fromJS({ id: '201', published: true, slug: 'foo', recipesInCollection: [''] })
        const recommendationCollection = Immutable.fromJS({ id: '202', published: true, slug: 'recommendations', recipesInCollection: ['101', '102', '103', '104'] })

        beforeEach(() => {
          state = {
            ...state,
            menuCollections: Immutable.Map({
              201: fooCollection,
              202: recommendationCollection
            })
          }
        })

        test('should return recommendation collection', () => {
          const result = getDefaultCollection(state)

          expect(result).toEqual(recommendationCollection)
        })
      })

      describe('when there is a recommendations with insufficient stock', () => {
        const fooCollection = Immutable.fromJS({ id: '201', published: true, slug: 'foo', recipesInCollection: [''] })
        const recommendationCollection = Immutable.fromJS({ id: '202', published: true, slug: 'recommendations', recipesInCollection: ['']})

        beforeEach(() => {
          state = {
            ...state,
            menuCollections: Immutable.Map({
              201: fooCollection,
              202: recommendationCollection
            }),
            menuRecipeStock: Immutable.fromJS({
              101: { 2: 0, 4: 0 },
              102: { 2: 0, 4: 0 },
              103: { 2: 0, 4: 0 },
              104: { 2: 0, 4: 0 },
            })
          }
        })

        test('should return first collection', () => {
          const result = getDefaultCollection(state)

          expect(result).toEqual(fooCollection)
        })
      })

      describe('when there are no collections', () => {
        beforeEach(() => {
          state = {
            ...state,
            menuCollections: Immutable.Map({})
          }
        })

        test('should return null', () => {
          const result = getDefaultCollection(state)

          expect(result).toEqual(null)
        })
      })
    })
  })

  describe('getCurrentCollectionSlug', () => {
    const VALID_COLLECTION_ID = '12345'
    const INVALID_COLLECTION_ID = '99999'
    const menuCollections = Immutable.fromJS({
      [VALID_COLLECTION_ID]: { id: VALID_COLLECTION_ID, published: true, slug: 'foo' }
    })

    describe('when on a valid collection', () => {
      test('should return slug', () => {
        const result = getCurrentCollectionSlug.resultFunc(VALID_COLLECTION_ID, menuCollections)

        expect(result).toEqual('foo')
      })
    })

    describe('when on an invalid collection', () => {
      test('should return null', () => {
        const result = getCurrentCollectionSlug.resultFunc(INVALID_COLLECTION_ID, menuCollections)

        expect(result).toEqual(null)
      })
    })
  })

  describe('getCollectionsHeaders', () => {
    let state
    beforeEach(() => {
      state = {
        menu: Immutable.Map({
          collectionHeaders: {
            collectionsPerMenu: [
              {
                id: '342',
                type: 'menu',
                relationships: {
                  collections: {
                    data: [{
                      header: 'header-wave-id',
                      id: 'collection-id',
                      type: 'collection'
                    }]
                  }
                }
              }
            ],
            headers: [
              {
                attributes: {},
                id: 'header-wave-id',
                type: 'wave-link-header'
              }
            ]
          }
        }),
        menuCollections: Immutable.fromJS({
          'collection-id': {
            published: true,
            shortTitle: 'something',
            slug: 'gluten-free',
            id: 'collection-id',
            default: true,
            recipesInCollection: ['123', '321', '4578']
          },
        }),
        basket: Immutable.fromJS({
          numPortions: 2,
          currentMenuId: '342'
        })
      }
    })
    test('should return the correct collections headers', () => {
      const result = getCollectionsHeaders(state)
      expect(result).toEqual({
        attributes: {},
        id: 'header-wave-id',
        type: 'wave-link-header'
      })
    })

    describe('When the current menu does not have any collections headers', () => {
      beforeEach(() => {
        state = {
          ...state,
          basket: Immutable.fromJS({
            numPortions: 2,
            currentMenuId: '340'
          })
        }
      })
      test('should return null', () => {
        const result = getCollectionsHeaders(state)
        expect(result).toEqual(null)
      })
    })
  })

  describe('getCurrentCollectionDietaryClaims', () => {
    let state = null
    describe('when send prop category id', () => {
      beforeEach(() => {
        state = {
          menuCollections: Immutable.fromJS({
            'collection-id': {
              published: true,
              shortTitle: 'something',
              slug: 'diary-free',
              id: 'collection-id',
              default: true,
              recipesInCollection: ['123', '321', '4578'],
              requirements: {
                dietary_claims: ['diary-free']
              }
            },
          }),
        }
      })
      test('should return the diatery claims for category id from props', () => {
        const result = getCurrentCollectionDietaryClaims(state, { categoryId: 'collection-id'})
        expect(result).toEqual(Immutable.List(['diary-free']))
      })
    })

    describe('when has slug in query', () => {
      beforeEach(() => {
        state = {
          menuCollections: Immutable.fromJS({
            'collection-id-with-slug': {
              published: true,
              shortTitle: 'something',
              slug: 'gluten-free',
              id: 'collection-id-with-slug',
              default: true,
              recipesInCollection: ['123', '321', '4578'],
              requirements: {
                dietary_claims: ['gluten-free']
              }
            },
          }),
          basket: Immutable.fromJS({
            numPortions: 2,
          }),
          routing: {
            locationBeforeTransitions: {
              query: {
                collection: 'gluten-free'
              }
            }
          }
        }
      })
      test('should return the diatery claims for collection with slug', () => {
        const result = getCurrentCollectionDietaryClaims(state)
        expect(result).toEqual(Immutable.List(['gluten-free']))
      })
    })
  })

  describe('getCurrentCollectionIdByExperimentStatus', () => {
    let state

    beforeEach(() => {
      state = {
        menuCollections: Immutable.fromJS({
          'collection-id-with-slug': {
            published: true,
            shortTitle: 'something',
            slug: 'gluten-free',
            id: 'collection-id-with-slug',
            default: true,
            recipesInCollection: ['123', '321', '4578'],
            requirements: {
              dietary_claims: ['gluten-free']
            }
          },
        }),
        basket: Immutable.fromJS({
          numPortions: 2,
        }),
        routing: {
          locationBeforeTransitions: {
            query: {
              collection: 'gluten-free'
            }
          }
        }
      }
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    describe('Given there is no valid optimizely instance', () => {
      beforeEach(() => {
        optimizelySDK.hasValidInstance.mockReturnValue(false)
      })

      test('returns current collection id from state', () => {
        const result = getCurrentCollectionIdByExperimentStatus(state, {})
        expect(result).toEqual('collection-id-with-slug')
      })
    })

    describe('Given there is a valid optimizely instance', () => {
      beforeEach(() => {
        optimizelySDK.hasValidInstance.mockReturnValue(true)
      })

      describe('When user is not in the experiment', () => {
        beforeEach(() => {
          optimizelySDK.instance = {
            optimizelyRolloutsInstance: {
              isFeatureEnabled: jest.fn().mockReturnValue(false)
            }
          }
        })

        test('returns current collection id from state', () => {
          const result = getCurrentCollectionIdByExperimentStatus(state, {})
          expect(result).toEqual('collection-id-with-slug')
        })
      })

      describe('When user is in the experiment', () => {
        beforeEach(() => {
          optimizelySDK.instance = {
            optimizelyRolloutsInstance: {
              isFeatureEnabled: jest.fn().mockReturnValue(true)
            }
          }
        })

        test('returns null', () => {
          const result = getCurrentCollectionIdByExperimentStatus(state, {})
          expect(result).toEqual(null)
        })
      })
    })
  })
})
