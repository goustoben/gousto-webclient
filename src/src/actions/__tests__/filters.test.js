import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import actionTypes from 'actions/actionTypes'
import { push } from 'react-router-redux'
import { ALL_RECIPES_COLLECTION_ID } from 'config/collections'

import {
  collectionFilterChange,
  changeCollectionById,
  changeCollectionToAllRecipesViaCTA,
  filterCurrentDietTypesChange,
  filterCurrentTotalTimeChange,
  clearAllFilters,
  filterDietaryAttributesChange,
  filterMenuOpen,
  filterMenuRevertFilters,
  filterProductCategory,
  filterApply,
  filterRecipeGrouping
} from 'actions/filters'

jest.mock('react-router-redux', () => ({
  push: jest.fn(),
}))

jest.mock('config/recipes', () => ({
  thematicBorderColor: 'red'
}))

describe('filters actions', () => {
  const dispatchSpy = jest.fn()
  const getStateSpy = jest.fn()

  afterEach(() => {
    dispatchSpy.mockClear()
    getStateSpy.mockClear()
  })

  describe('filterApply', () => {
    beforeAll(() => {
      getStateSpy.mockReturnValue({
        filters: Immutable.fromJS({
          newRecipes: false,
        }),
      })
    })
    test('should dispatch once when case is totalTime', () => {
      filterApply('totalTime', 0)(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledTimes(1)
    })

    test('should be called with FILTERS_NEW_RECIPES_CHANGE when case is newRecipes and unselect tag', () => {
      getStateSpy.mockReturnValue({
        filters: Immutable.fromJS({
          newRecipes: true,
        }),
      })
      filterApply('newRecipes')(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.FILTERS_NEW_RECIPES_CHANGE,
        trackingData: {
          actionType: 'UNSELECT_FILTERS_NEW_RECIPES'
        }
      })
    })
    test('should be called with FILTERS_NEW_RECIPES_CHANGE when case is newRecipes and select tag', () => {
      getStateSpy.mockReturnValue({
        filters: Immutable.fromJS({
          newRecipes: false,
        }),
      })
      filterApply('newRecipes')(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.FILTERS_NEW_RECIPES_CHANGE,
        trackingData: {
          actionType: 'SELECT_FILTERS_NEW_RECIPES'
        }
      })
    })
  })

  describe('collectionFilterChange', () => {
    describe('when new collection id exists as a menu collections key', () => {
      beforeEach(() => {
        getStateSpy.mockReturnValue({
          routing: {
            locationBeforeTransitions: { query: { collection: 'gluten-free' } },
          },
          menuCollections: Immutable.fromJS({
            newCollectionId: { slug: 'dairy-free' },
          }),
        })
      })

      test('should add the new collection name to the querystring', () => {
        collectionFilterChange('newCollectionId')(dispatchSpy, getStateSpy)

        expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
          collectionName: 'dairy-free',
        }))
      })

      test('should dispatch a FILTERS_COLLECTION_CHANGE action', () => {
        const collectionId = 'newCollectionId'

        collectionFilterChange(collectionId)(dispatchSpy, getStateSpy)

        expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
          type: actionTypes.FILTERS_COLLECTION_CHANGE,
          collectionId,
        }))
      })
    })

    describe('when new collection id does not exist as a menu collections key', () => {
      beforeEach(() => {
        getStateSpy.mockReturnValue({
          routing: {
            locationBeforeTransitions: { query: { collection: 'gluten-free' } },
          },
          menuCollections: Immutable.fromJS({
            notNewCollectionId: { slug: 'dairy-free' },
          }),
        })
      })

      test('should change the new collection name from the querystring if different', () => {
        collectionFilterChange('notNewCollectionId')(dispatchSpy, getStateSpy)

        expect(dispatchSpy).toHaveBeenCalledTimes(2)
      })

      test('should dispatch a FILTERS_COLLECTION_CHANGE action', () => {
        const collectionId = 'notNewCollectionId'

        collectionFilterChange(collectionId)(dispatchSpy, getStateSpy)

        expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
          type: actionTypes.FILTERS_COLLECTION_CHANGE,
          collectionId,
        }))
      })
    })
  })

  describe('changeCollectionById', () => {

    test('should dispatch one action', () => {
      changeCollectionById()(dispatchSpy, getStateSpy)
      expect(dispatchSpy.mock.calls.length).toBe(1)
    })

    test('should be called with ALL_RECIPES_COLLECTION_ID if no params passed in', () => {
      changeCollectionById()(dispatchSpy, getStateSpy)
      expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({ collectionId: ALL_RECIPES_COLLECTION_ID }))
    })

    test('should be called with collectonId if passed in as params', () => {
      changeCollectionById('1234')(dispatchSpy, getStateSpy)
      expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({ collectionId: '1234' }))
    })
  })

  describe('changeCollectionToAllRecipesViaCTA', () => {

    test('should dispatch two actions', () => {
      changeCollectionToAllRecipesViaCTA()(dispatchSpy, getStateSpy)
      expect(dispatchSpy.mock.calls.length).toBe(2)
    })
  })

  describe('currentDietTypesChange', () => {
    test('should dispatch a FILTERS_DIET_TYPES_CHANGE action when adding diet type filter', () => {
      getStateSpy.mockReturnValue({
        routing: {
          locationBeforeTransitions: { query: { collection: 'gluten-free' } },
        },
        menuCollections: Immutable.fromJS({
          newCollectionId: { slug: 'dairy-free' },
        }),
        filters: Immutable.Map({
          currentCollectionId: '',
          totalTime: '0',
          dietTypes: Immutable.Set([]),
        }),
      })
      filterCurrentDietTypesChange('meat')(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.FILTERS_DIET_TYPES_CHANGE,
        dietTypes: Immutable.Set(['meat']),
      })
    })

    test('should dispatch a FILTERS_DIET_TYPES_CHANGE action when adding diet type filter', () => {
      getStateSpy.mockReturnValue({
        routing: {
          locationBeforeTransitions: { query: { collection: 'gluten-free' } },
        },
        menuCollections: Immutable.fromJS({
          newCollectionId: { slug: 'dairy-free' },
        }),
        filters: Immutable.Map({
          currentCollectionId: '',
          totalTime: '0',
          dietTypes: Immutable.Set(['meat']),
        }),
      })

      filterCurrentDietTypesChange('meat')(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.FILTERS_DIET_TYPES_CHANGE,
        dietTypes: Immutable.Set([]),
      })
    })
  })

  describe('currentDietaryAttributesChange', () => {
    beforeEach(() => {
      dispatchSpy.mockClear()
      getStateSpy.mockClear()
      getStateSpy.mockReturnValue({
        filters: Immutable.Map({
          dietaryAttributes: Immutable.Set(['gluten-free']),
        }),
      })
    })

    test('should dispatch a FILTERS_DIETARY_ATTRIBUTES_CHANGE action when adding a dietary attribute filter', () => {
      filterDietaryAttributesChange('dairy-free')(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.FILTERS_DIETARY_ATTRIBUTES_CHANGE,
        dietaryAttributes: Immutable.Set([
          'gluten-free',
          'dairy-free',
        ]),
      })
    })

    test('should dispatch a FILTERS_DIETARY_ATTRIBUTES_CHANGE action when removing a dietary attribute filter', () => {
      filterDietaryAttributesChange('gluten-free')(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.FILTERS_DIETARY_ATTRIBUTES_CHANGE,
        dietaryAttributes: Immutable.Set([]),
      })
    })
  })

  describe('filterCurrentTotalTimeChange', () => {
    test('should dispatch a FILTERS_TOTAL_TIME_CHANGE action when the total time filter is changed', () => {
      getStateSpy.mockReturnValue({
        routing: {
          locationBeforeTransitions: { query: { collection: 'gluten-free' } },
        },
        menuCollections: Immutable.fromJS({
          newCollectionId: { slug: 'dairy-free' },
        }),
        filters: Immutable.Map({
          currentCollectionId: '',
          totalTime: '0',
          dietTypes: Immutable.Set([]),
        }),
      })

      filterCurrentTotalTimeChange('25')(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.FILTERS_TOTAL_TIME_CHANGE,
        totalTime: '25',
      })
    })
    test('should dispatch a FILTERS_TOTAL_TIME_CHANGE action when the total time filter is the same', () => {
      getStateSpy.mockReturnValue({
        routing: {
          locationBeforeTransitions: { query: { collection: 'gluten-free' } },
        },
        menuCollections: Immutable.fromJS({
          newCollectionId: { slug: 'dairy-free' },
        }),
        filters: Immutable.Map({
          currentCollectionId: '',
          totalTime: '25',
          dietTypes: Immutable.Set([]),
        }),
      })

      filterCurrentTotalTimeChange('25')(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.FILTERS_TOTAL_TIME_CHANGE,
        totalTime: '0',
      })
    })
  })

  describe('clearAllFilters', () => {
    test('should dispatch a FILTERS_CLEAR_ALL action when the clear all is pressed', () => {
      getStateSpy.mockReturnValue({
        routing: {
          locationBeforeTransitions: { query: { collection: 'gluten-free' } },
        },
        menuCollections: Immutable.fromJS({
          defaultCollectionId: {
            shortTitle: 'All Recipes',
            slug: 'all-recipes',
            default: true,
            id: 'defaultCollectionId',
          },
        }),
        filters: Immutable.Map({
          currentCollectionId: 'vfvd',
          totalTime: '30',
          dietTypes: Immutable.Set(['meat']),
        }),
      })

      clearAllFilters()(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.FILTERS_CLEAR_ALL,
        collectionId: 'vfvd',
      })
    })
  })

  describe('resetFiltersOnMobile', () => {
    test('should dispatch a FILTERS_RESET action when the x button on mobile is pressed', () => {
      const mockStore = configureMockStore([thunk])
      const store = mockStore({
        filters: Immutable.Map({
          currentCollectionId: 'current_collection',
          totalTime: '0',
          dietTypes: Immutable.Set(['meat']),
          dietaryAttributes: Immutable.Set([]),
        }),
      })
      store.dispatch(filterMenuOpen())
      store.dispatch(filterDietaryAttributesChange('gluten-free'))
      store.dispatch(filterMenuRevertFilters())
      expect(store.getState().filters).toEqual(Immutable.Map({
        currentCollectionId: 'current_collection',
        totalTime: '0',
        dietTypes: Immutable.Set(['meat']),
        dietaryAttributes: Immutable.Set([]),
      }))
    })
  })

  describe('filterProductCategory', () => {
    test('should dispatch a FILTERS_PRODUCT_CATEGORY action', () => {
      filterProductCategory('all-products')(dispatchSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.FILTERS_PRODUCT_CATEGORY,
        value: 'all-products',
      })
    })
  })

  describe('filterRecipeGrouping for foodBrand', () => {
    beforeAll(() => {
      getStateSpy.mockReturnValue({
        features: Immutable.fromJS({
          thematic: {
            value: false
          },
        }),
        routing: {
          locationBeforeTransitions: {
            query: {
              foodBrand: 'food-brand-slug'
            }
          }
        }
      })
    })
    test('should call FILTERS_FOOD_BRAND_CHANGE with null foodBrand if this is null', () => {
      filterRecipeGrouping(null, 'foodBrand')(dispatchSpy, getStateSpy)
      expect(dispatchSpy).toHaveBeenCalledWith({
        'foodBrand': null,
        'type': 'FILTERS_FOOD_BRAND_CHANGE',
        'trackingData': {
          'actionType': 'FoodBrand unselected',
          'food_brand': ''
        }
      })
      expect(dispatchSpy).toHaveBeenCalledTimes(3)
    })

    test('should call push with foodBrand slug if foodBrand is not null', () => {
      filterRecipeGrouping({
        name: 'FoodBrand',
        slug: 'food-brand',
        borderColor: 'blue',
        location: 'foodBrand'
      }, 'foodBrand')(dispatchSpy, getStateSpy)
      expect(dispatchSpy).toHaveBeenCalledWith({
        'foodBrand': {
          name: 'FoodBrand',
          slug: 'food-brand',
          borderColor: 'blue',
          location: 'foodBrand'
        },
        'type': "FILTERS_FOOD_BRAND_CHANGE",
        'trackingData': {
          'actionType': 'FoodBrand selected',
          'food_brand': 'food-brand'
        }
      })
      expect(push).toHaveBeenCalledWith({
        query: {
          foodBrand: 'food-brand'
        }
      })
    })
  })

  describe('filterRecipeGrouping for thematic', () => {
    beforeAll(() => {
      getStateSpy.mockReturnValue({
        features: Immutable.fromJS({
          thematic: {
            value: true
          },
        }),
        menuCollections: Immutable.Map({
          'dd111ddd': Immutable.Map({
            slug: 'gousto-x-wagamama',
            shortTitle: 'Gousto x wagamama'
          })
        }),
        routing: {
          locationBeforeTransitions: {
            query: {
              thematic: 'gousto-x-wagamama'
            }
          }
        }
      })
    })

    test('should call FILTERS_THEMATIC_CHANGE with null thematic if this is null', () => {
      filterRecipeGrouping(null, 'thematic')(dispatchSpy, getStateSpy)
      expect(dispatchSpy).toHaveBeenCalledWith({
        'thematic': null,
        'type': 'FILTERS_THEMATIC_CHANGE',
        'trackingData': {
          'actionType': 'Thematic unselected',
          'thematic': '',
          'onAction': null
        }
      })
      expect(dispatchSpy).toHaveBeenCalledTimes(3)
    })

    test('should call push with thematic slug if thematic is not null and action is not passed down', () => {
      filterRecipeGrouping('gousto-x-wagamama', 'thematic')(dispatchSpy, getStateSpy)
      expect(dispatchSpy).toHaveBeenCalledWith({
        'thematic': {
          name: 'Gousto x wagamama',
          slug: 'gousto-x-wagamama',
          borderColor: 'red',
          location: 'thematic'
        },
        'type': "FILTERS_THEMATIC_CHANGE",
        'trackingData': {
          'actionType': 'Thematic selected',
          'thematic': 'gousto-x-wagamama',
          'onAction': null
        }
      })
      expect(push).toHaveBeenCalledWith({
        query: {
          thematic: 'gousto-x-wagamama'
        }
      })
    })

    test('should track how arrived on thematics page by banner click if action is passed down as banner', () => {
      filterRecipeGrouping('gousto-x-wagamama', 'thematic', 'banner click')(dispatchSpy, getStateSpy)
      expect(dispatchSpy).toHaveBeenCalledWith({
        'thematic': {
          name: 'Gousto x wagamama',
          slug: 'gousto-x-wagamama',
          borderColor: 'red',
          location: 'thematic'
        },
        'type': "FILTERS_THEMATIC_CHANGE",
        'trackingData': {
          'actionType': 'Thematic selected',
          'thematic': 'gousto-x-wagamama',
          'onAction': 'banner click',
        }
      })
      expect(push).toHaveBeenCalledWith({
        query: {
          thematic: 'gousto-x-wagamama'
        }
      })
    })
  })
})
