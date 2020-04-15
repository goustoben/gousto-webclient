import Immutable from 'immutable'
import { loadMenuCollectionsWithMenuService, getStockAvailability } from 'actions/menuActionHelper'
import { menuLoadCollections, loadRecipesForAllCollections } from 'actions/menuCollections'
import { safeJestMock } from '_testing/mocks'
import * as landingCollectionImport from '../../routes/Menu/actions/menuSetLandingCollection'

const mockActiveMenuForDate = jest.fn()

jest.mock('actions/menuCollections')

jest.mock('routes/Menu/selectors/menu', () => ({
  activeMenuForDate: () => mockActiveMenuForDate,
}))

jest.mock('apis/transformers/collections', () => ({
  collectionsTransformer: () => 'mock collection',
}))

jest.mock('apis/transformers/recipes', () => ({
  recipesTransformer: () => 'mock recipe',
}))

jest.mock('apis/transformers/collectionRecipes', () => ({
  collectionRecipesTransformer: () => 'mock collection recipes',
}))

const menuSetLandingCollection = safeJestMock(landingCollectionImport, 'menuSetLandingCollection')

describe('loadMenuCollectionsWithMenuService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('calls menuLoadCollections and loadRecipesForAllCollections with menuservice data', async () => {
    const getState = () => ({
      menuService: {
        data: [ 'some element' ]
      },
    })

    const dispatch = () => {}
    const background = true

    const mockMenuLoadDispatcher = jest.fn()
    menuLoadCollections.mockImplementation(() => (mockMenuLoadDispatcher))
    loadRecipesForAllCollections.mockImplementation(() => (mockMenuLoadDispatcher))

    await loadMenuCollectionsWithMenuService(dispatch, getState, 'any Date', background)

    expect(menuLoadCollections).toHaveBeenCalledWith('any Date', background, 'mock collection')
    expect(mockMenuLoadDispatcher).toHaveBeenCalledWith(dispatch, getState)
    expect(loadRecipesForAllCollections).toHaveBeenCalledWith('mock recipe', 'mock collection recipes')
    expect(menuSetLandingCollection).toHaveBeenCalled()
  })

  describe('when menuservice is undefined', () => {
    const getState = () => ({
      menuService: undefined
    })

    test('should not call menuLoadCollections or loadRecipesForAllCollections', async () => {
      const mockMenuLoadDispatcher = jest.fn()
      menuLoadCollections.mockImplementation(() => (mockMenuLoadDispatcher))
      loadRecipesForAllCollections.mockImplementation(() => (mockMenuLoadDispatcher))

      await loadMenuCollectionsWithMenuService(() => {}, getState, 'any Date', true)

      expect(menuLoadCollections).not.toHaveBeenCalled()
      expect(loadRecipesForAllCollections).not.toHaveBeenCalled()
    })
  })

  describe('when menuservice data is undefined', () => {
    const getState = () => ({
      menuService: {
        data: undefined
      }
    })

    test('should not call menuLoadCollections or loadRecipesForAllCollections', async () => {
      const mockMenuLoadDispatcher = jest.fn()
      menuLoadCollections.mockImplementation(() => (mockMenuLoadDispatcher))
      loadRecipesForAllCollections.mockImplementation(() => (mockMenuLoadDispatcher))

      await loadMenuCollectionsWithMenuService(() => {}, getState, 'any Date', true)

      expect(menuLoadCollections).not.toHaveBeenCalled()
      expect(loadRecipesForAllCollections).not.toHaveBeenCalled()
    })
  })

  describe('when menuservice data is empty', () => {
    const getState = () => ({
      menuService: {
        data: []
      }
    })

    test('should not call menuLoadCollections or loadRecipesForAllCollections', async () => {
      const mockMenuLoadDispatcher = jest.fn()
      menuLoadCollections.mockImplementation(() => (mockMenuLoadDispatcher))
      loadRecipesForAllCollections.mockImplementation(() => (mockMenuLoadDispatcher))

      await loadMenuCollectionsWithMenuService(() => {}, getState, 'any Date', true)

      expect(menuLoadCollections).not.toHaveBeenCalled()
      expect(loadRecipesForAllCollections).not.toHaveBeenCalled()
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
      })
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
      })
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
})
