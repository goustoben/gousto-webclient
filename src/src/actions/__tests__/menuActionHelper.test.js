import Immutable from 'immutable'
import { safeJestMock } from '_testing/mocks'
import * as landingCollectionImport from 'routes/Menu/actions/menuSetLandingCollection/menuSetLandingCollection'
import { getStockAvailability } from "actions/menuActionHelper/getStockAvailability"
import { loadMenuCollectionsWithMenuService } from "actions/menuActionHelper/loadMenuCollectionsWithMenuService"

const mockActiveMenuForDate = {}
const menuSetLandingCollection = safeJestMock(landingCollectionImport, 'menuSetLandingCollection')

jest.mock('routes/Menu/selectors/menu', () => ({
  activeMenuForDate: () => mockActiveMenuForDate,
}))

jest.mock('apis/transformers/collections', () => ({
  collectionsTransformer: () => 'mock collection',
}))

jest.mock('apis/transformers/recipes', () => ({
  recipesTransformer: () => 'mock recipe',
}))

describe('loadMenuCollectionsWithMenuService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockActiveMenuForDate.id = '234'
  })

  test('calls menuLoadCollections with menuservice data', async () => {
    const getState = () => ({
      menuService: {
        data: [ 'some element' ]
      },
    })

    const dispatch = jest.fn()
    const background = true

    await loadMenuCollectionsWithMenuService(dispatch, getState, 'any Date', background)

    expect(menuSetLandingCollection).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith({
      type: 'MENU_COLLECTIONS_RECEIVE',
      collections: 'mock collection'
    })
    expect(dispatch).toHaveBeenCalledWith({
      type: 'BASKET_CURRENT_MENU_ID_CHANGE',
      menuId: '234'
    })
  })

  test('calls menuReceiveMenu with recipes', async () => {
    const getState = () => ({
      menuService: {
        data: [ 'some element' ]
      },
    })

    const dispatch = jest.fn()
    const background = true

    await loadMenuCollectionsWithMenuService(dispatch, getState, 'any Date', background)

    expect(dispatch).toHaveBeenCalledWith({
      type: 'RECIPES_RECEIVE',
      recipes: 'mock recipe'
    })
  })

  describe('when menuservice is undefined', () => {
    const getState = () => ({
      menuService: undefined
    })

    test('should not call menuLoadCollections', async () => {
      const dispatch = jest.fn()
      await loadMenuCollectionsWithMenuService(dispatch, getState, 'any Date', true)

      expect(dispatch).not.toHaveBeenCalled()
    })
  })

  describe('when menuservice data is undefined', () => {
    const getState = () => ({
      menuService: {
        data: undefined
      }
    })

    test('should not call menuLoadCollections or loadRecipesForAllCollections', async () => {
      const dispatch = jest.fn()

      await loadMenuCollectionsWithMenuService(dispatch, getState, 'any Date', true)

      expect(dispatch).not.toHaveBeenCalled()
    })
  })

  describe('when menuservice data is empty', () => {
    const getState = () => ({
      menuService: {
        data: []
      }
    })

    test('should not call menuLoadCollections or loadRecipesForAllCollections', async () => {
      const dispatch = jest.fn()

      await loadMenuCollectionsWithMenuService(dispatch, getState, 'any Date', true)

      expect(dispatch).not.toHaveBeenCalled()
    })
  })
})

describe('getStockAvailability', () => {
  test('should set availablilty by mapping new ids to old ids', async () => {
    const recipeStock = {
      123: {
        committed: '1',
        recipeId: 123,
        number: '5',
        familyNumber: '4'
      }
    }
    const getState = () => ({
      recipes: Immutable.Map({
        123: {
          id: '123',
        }
      }),
      routing: {
        locationBeforeTransitions: {query: {}}
      }
    })

    const result = getStockAvailability(getState, recipeStock)

    expect(result).toEqual({
      123: {
        2: 5,
        4: 4,
        committed: true,
      },
    })
  })

  test('should handle recipe ids that are in stock but have not been returned by menuservice', async () => {
    // We have seen occations when the menu service has not been updated with the
    // latest recipe but the stock request has so we need to protect against it
    const recipeStock = {
      123: {
        committed: '1',
        recipeId: 123,
        number: '5',
        familyNumber: '4'
      },
    }
    const getState = () => ({
      recipes: Immutable.Map({
        123: {
          id: '123'
        },
        456: {
          id: '456'
        }
      }),
      routing: {
        locationBeforeTransitions: {query: {}}
      }
    })

    const result = getStockAvailability(getState, recipeStock)

    expect(result).toEqual({
      123: {
        2: 5,
        4: 4,
        committed: true,
      },
    })
  })

  describe('when preview menu', () => {
    let getState
    const recipeStock = {
      123: {
        committed: '1',
        recipeId: 123,
        number: '5',
        familyNumber: '4'
      }
    }
    beforeEach(() => {
      getState = () => ({
        recipes: Immutable.Map({
          125: {
            id: '125',
          },
          126: {
            id: '126'
          }
        }),
        routing: {
          locationBeforeTransitions: {
            query: {
              'preview[menu_id]': 360
            }
          }
        }
      })
    })

    test('should return 1000 stock for all recipes', () => {
      const result = getStockAvailability(getState, recipeStock)
      expect(result).toEqual({
        125: {
          2: 1000,
          4: 1000,
          committed: false,
        },
        126: {
          2: 1000,
          4: 1000,
          committed: false,
        },
      })
    })
  })
})
