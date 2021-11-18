import * as React from 'react'
import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { renderHook } from '@testing-library/react-hooks'
import { menuRecipeDetailVisibilityChange, selectRecipeVariant } from 'routes/Menu/actions/menuRecipeDetails'
import { useAlternativeOptions } from '.'

jest.mock('routes/Menu/actions/menuRecipeDetails', () => ({
  ...jest.requireActual('routes/Menu/actions/menuRecipeDetails'),
  selectRecipeVariant: jest.fn(),
  menuRecipeDetailVisibilityChange: jest.fn(),
}))

const RECIPE_ID_1 = 'aaa'
const RECIPE_ID_2 = 'bbb'
const COLLECTION_ID = 'collection 1'

describe('getAlternativeOptionsForRecipe', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when there is alternative option and it is out of stock', () => {
    const mockStore = configureMockStore()
    const store = mockStore(createMockState({
      menuRecipeStock: Immutable.fromJS({
        [RECIPE_ID_1]: { 2: 1000, 4: 1000 },
      }),
    }))

    const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>
    const { result } = renderHook(() => useAlternativeOptions(), { wrapper })

    test('they are marked so', () => {
      const options = result.current.getAlternativeOptionsForRecipe({
        recipeId: RECIPE_ID_1,
        originalId: RECIPE_ID_1,
        isOnDetailScreen: false,
        isFromShowcaseMenu: false,
        categoryId: COLLECTION_ID,
      })

      expect(options.find(o => o.recipeId === RECIPE_ID_1).isOutOfStock).toEqual(false)
      expect(options.find(o => o.recipeId === RECIPE_ID_2).isOutOfStock).toEqual(true)
    })
  })

  describe('when there is alternative option and it is in stock', () => {
    const mockStore = configureMockStore()
    const store = mockStore(createMockState({
      menuRecipeStock: Immutable.fromJS({
        [RECIPE_ID_1]: { 2: 1000, 4: 1000 },
        [RECIPE_ID_2]: { 2: 1000, 4: 1000 },
      }),
    }))

    const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>
    const { result } = renderHook(() => useAlternativeOptions(), { wrapper })

    test('they are marked so', () => {
      const options = result.current.getAlternativeOptionsForRecipe({
        recipeId: RECIPE_ID_1,
        originalId: RECIPE_ID_1,
        isOnDetailScreen: false,
        isFromShowcaseMenu: false,
        categoryId: COLLECTION_ID,
      })

      expect(options.find(o => o.recipeId === RECIPE_ID_1).isOutOfStock).toEqual(false)
      expect(options.find(o => o.recipeId === RECIPE_ID_2).isOutOfStock).toEqual(false)
    })
  })

  describe('when recipe has a surcharge', () => {
    const mockStore = configureMockStore()
    const store = mockStore(createMockState())

    const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>
    const { result } = renderHook(() => useAlternativeOptions(), { wrapper })

    test('it is exposed in the options', () => {
      const options = result.current.getAlternativeOptionsForRecipe({
        recipeId: RECIPE_ID_1,
        originalId: RECIPE_ID_1,
        isOnDetailScreen: false,
        isFromShowcaseMenu: false,
        categoryId: COLLECTION_ID,
      })

      expect(options.find(o => o.recipeId === RECIPE_ID_1).surcharge).toEqual(0.5)
      expect(options.find(o => o.recipeId === RECIPE_ID_2).surcharge).toEqual(null)
    })
  })

  describe('when alternative has a allergen information', () => {
    const mockStore = configureMockStore()
    const store = mockStore(createMockState())

    const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>
    const { result } = renderHook(() => useAlternativeOptions(), { wrapper })

    test('it is exposed in the options', () => {
      const options = result.current.getAlternativeOptionsForRecipe({
        recipeId: RECIPE_ID_1,
        originalId: RECIPE_ID_1,
        isOnDetailScreen: false,
        isFromShowcaseMenu: false,
        categoryId: COLLECTION_ID,
      })

      expect(options.find(o => o.recipeId === RECIPE_ID_1).allergenInfo).toEqual({ containsGlutenOrDairy: true })
      expect(options.find(o => o.recipeId === RECIPE_ID_2).allergenInfo).toEqual({ containsGlutenOrDairy: false })
    })
  })

  describe('when isOnDetailScreen and isFromShowcaseMenu flags are passed', () => {
    const mockStore = configureMockStore()
    const store = mockStore(createMockState())

    const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>
    const { result } = renderHook(() => useAlternativeOptions(), { wrapper })

    test('they are exposed in the options', () => {
      const options = result.current.getAlternativeOptionsForRecipe({
        recipeId: RECIPE_ID_1,
        originalId: RECIPE_ID_1,
        isOnDetailScreen: true,
        isFromShowcaseMenu: true,
        categoryId: COLLECTION_ID,
      })

      expect(options.find(o => o.recipeId === RECIPE_ID_1).isOnDetailScreen).toEqual(true)
      expect(options.find(o => o.recipeId === RECIPE_ID_2).isOnDetailScreen).toEqual(true)
      expect(options.find(o => o.recipeId === RECIPE_ID_1).isFromShowcaseMenu).toEqual(true)
      expect(options.find(o => o.recipeId === RECIPE_ID_2).isFromShowcaseMenu).toEqual(true)
    })
  })

  describe('when First recipe is marked as selected', () => {
    const mockStore = configureMockStore()
    const store = mockStore(createMockState())

    const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>
    const { result } = renderHook(() => useAlternativeOptions(), { wrapper })

    test('it is marked as so in the options', () => {
      const options = result.current.getAlternativeOptionsForRecipe({
        recipeId: RECIPE_ID_1,
        originalId: RECIPE_ID_1,
        isOnDetailScreen: false,
        isFromShowcaseMenu: false,
        categoryId: COLLECTION_ID,
      })

      expect(options.find(o => o.recipeId === RECIPE_ID_1).isChecked).toEqual(true)
      expect(options.find(o => o.recipeId === RECIPE_ID_2).isChecked).toEqual(false)
    })
  })

  describe('when Second recipe is marked as selected', () => {
    const mockStore = configureMockStore()
    const store = mockStore(createMockState())

    const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>
    const { result } = renderHook(() => useAlternativeOptions(), { wrapper })

    test('it is marked as so in the options', () => {
      const options = result.current.getAlternativeOptionsForRecipe({
        recipeId: RECIPE_ID_2,
        originalId: RECIPE_ID_2,
        isOnDetailScreen: false,
        isFromShowcaseMenu: false,
        categoryId: COLLECTION_ID,
      })

      expect(options.find(o => o.recipeId === RECIPE_ID_1).isChecked).toEqual(false)
      expect(options.find(o => o.recipeId === RECIPE_ID_2).isChecked).toEqual(true)
    })
  })

  describe('Recipe basic properties are propagated', () => {
    const mockStore = configureMockStore()
    const store = mockStore(createMockState())

    const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>
    const { result } = renderHook(() => useAlternativeOptions(), { wrapper })

    test('They are exposed in the options', () => {
      const options = result.current.getAlternativeOptionsForRecipe({
        recipeId: RECIPE_ID_1,
        originalId: RECIPE_ID_1,
        isOnDetailScreen: false,
        isFromShowcaseMenu: false,
        categoryId: COLLECTION_ID,
      })

      expect(options.find(o => o.recipeId === RECIPE_ID_1).recipeId).toEqual(RECIPE_ID_1)
      expect(options.find(o => o.recipeId === RECIPE_ID_2).recipeId).toEqual(RECIPE_ID_2)

      expect(options.find(o => o.recipeId === RECIPE_ID_1).recipeName).toEqual('Title ONE')
      expect(options.find(o => o.recipeId === RECIPE_ID_2).recipeName).toEqual('Title TWO')
    })
  })

  describe('When isOnDetailScreen is FALSE', () => {
    describe('When changeCheckedRecipe is called', () => {
      selectRecipeVariant.mockReturnValue({type: 'foo'})
      menuRecipeDetailVisibilityChange.mockReturnValue({type: 'bar'})

      const mockStore = configureMockStore()
      const store = mockStore(createMockState())

      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>
      const { result } = renderHook(() => useAlternativeOptions(), { wrapper })

      const [
        {changeCheckedRecipe: changeCheckedRecipeForRecipeOne},
        {changeCheckedRecipe: changeCheckedRecipeForRecipeTwo},
      ] = result.current.getAlternativeOptionsForRecipe({
        recipeId: RECIPE_ID_1,
        originalId: RECIPE_ID_1,
        isOnDetailScreen: false,
        isFromShowcaseMenu: false,
        categoryId: COLLECTION_ID,
      })

      test('It dispatches only select option action', () => {
        expect(selectRecipeVariant).not.toHaveBeenCalled()

        changeCheckedRecipeForRecipeOne(RECIPE_ID_1, false)
        expect(selectRecipeVariant).toHaveBeenLastCalledWith(RECIPE_ID_1, RECIPE_ID_1, COLLECTION_ID, false, 'grid', undefined)
        expect(menuRecipeDetailVisibilityChange).not.toHaveBeenCalled()

        changeCheckedRecipeForRecipeTwo(RECIPE_ID_2, false)
        expect(selectRecipeVariant).toHaveBeenLastCalledWith(RECIPE_ID_1, RECIPE_ID_2, COLLECTION_ID, false, 'grid', undefined)
        expect(menuRecipeDetailVisibilityChange).not.toHaveBeenCalled()
      })
    })
  })

  describe('When isOnDetailScreen is TRUE', () => {
    describe('When changeCheckedRecipe is called', () => {
      selectRecipeVariant.mockReturnValue({type: 'foo'})
      menuRecipeDetailVisibilityChange.mockReturnValue({type: 'bar'})

      const mockStore = configureMockStore()
      const store = mockStore(createMockState())

      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>
      const { result } = renderHook(() => useAlternativeOptions(), { wrapper })

      const [
        {changeCheckedRecipe: changeCheckedRecipeForRecipeOne},
        {changeCheckedRecipe: changeCheckedRecipeForRecipeTwo},
      ] = result.current.getAlternativeOptionsForRecipe({
        recipeId: RECIPE_ID_1,
        originalId: RECIPE_ID_1,
        isOnDetailScreen: true,
        isFromShowcaseMenu: false,
        categoryId: COLLECTION_ID,
      })

      test('It dispatches only select option action', () => {
        expect(selectRecipeVariant).not.toHaveBeenCalled()

        changeCheckedRecipeForRecipeOne(RECIPE_ID_1, false)
        expect(selectRecipeVariant).toHaveBeenLastCalledWith(RECIPE_ID_1, RECIPE_ID_1, COLLECTION_ID, false, 'details', undefined)
        expect(menuRecipeDetailVisibilityChange).toHaveBeenLastCalledWith(RECIPE_ID_1)

        changeCheckedRecipeForRecipeTwo(RECIPE_ID_2, false)
        expect(selectRecipeVariant).toHaveBeenLastCalledWith(RECIPE_ID_1, RECIPE_ID_2, COLLECTION_ID, false, 'details', undefined)
        expect(menuRecipeDetailVisibilityChange).toHaveBeenLastCalledWith(RECIPE_ID_2)
      })
    })
  })

  describe('when there are dietary claims for current collection', () => {
    const mockStore = configureMockStore()
    const state = createMockState({
      dietaryClaims: ['gluten-free'],
    })
    const store = mockStore(state)

    const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>
    const { result } = renderHook(() => useAlternativeOptions({
      allCollections: state.menuCollections,
    }), { wrapper })

    test('The option does not contain affected items', () => {
      const options = result.current.getAlternativeOptionsForRecipe({
        recipeId: RECIPE_ID_1,
        originalId: RECIPE_ID_1,
        isOnDetailScreen: false,
        isFromShowcaseMenu: false,
        categoryId: COLLECTION_ID,
      })

      expect(options.length).toEqual(1)
      expect(!! options.find(o => o.recipeId === RECIPE_ID_1)).toEqual(true)
      expect(!! options.find(o => o.recipeId === RECIPE_ID_2)).toEqual(false)
    })
  })
})

function createMockState(args = {}) {
  const menuId = 'menu 1'

  const RECIPE_1 = Immutable.fromJS({
    id: RECIPE_ID_1,
    coreRecipeId: RECIPE_ID_1,
    title: 'Title ONE',
    dietaryClaims: Immutable.fromJS([
      {
        name: 'Gluten-free',
        slug: 'gluten-free'
      }
    ]),
    meals: Immutable.fromJS([{
      numPortions: 2,
      surcharge: {
        listPrice: '0.99'
      }
    },
    {
      numPortions: 4,
      surcharge: {
        listPrice: '1.99'
      }
    }])
  })

  const RECIPE_2 = Immutable.Map({
    id: RECIPE_ID_2,
    coreRecipeId: RECIPE_ID_2,
    title: 'Title TWO',
  })

  const COLLECTION_A = Immutable.Map({
    id: COLLECTION_ID,
    published: true,
    shortTitle: 'One Category',
    recipesInCollection: Immutable.List([RECIPE_1, RECIPE_2].map(r => r.get('id'))),
    requirements: Immutable.fromJS({
      dietary_claims: args.dietaryClaims || [],
    })
  })

  const state = {
    recipes: Immutable.fromJS({
      [RECIPE_ID_1]: RECIPE_1,
      [RECIPE_ID_2]: RECIPE_2,
    }),
    basket: Immutable.fromJS({
      numPortions: 2,
      recipes: {},
      currentMenuId: menuId,
    }),
    menuRecipeStock: args.menuRecipeStock || Immutable.fromJS({
      [RECIPE_ID_1]: { 2: 1000, 4: 1000 },
      [RECIPE_ID_2]: { 2: 1000, 4: 1000 },
    }),
    menuRecipes: Immutable.fromJS([
      RECIPE_1.get('id'),
      RECIPE_2.get('id'),
    ]),
    menuCollections: Immutable.fromJS({
      [COLLECTION_A.get('id')]: COLLECTION_A,
    }),
    menuRecipeDetails: Immutable.Map({
      recipeId: '1234'
    }),
    menu: Immutable.fromJS({
      recipeId: RECIPE_ID_1,
      originalId: RECIPE_ID_1,
      categoryId: COLLECTION_ID,
      menuVariants: Immutable.fromJS({
        [menuId]: {
          [RECIPE_ID_1]: {
            alternatives: [{
              id: 'UUID_1',
              coreRecipeId: RECIPE_ID_2,
              displayName: RECIPE_2.get('title'),
            }]
          },
          [RECIPE_ID_2]: {
            alternatives: [{
              id: 'UUID_2',
              coreRecipeId: RECIPE_ID_1,
            }]
          },
        }
      }),
      currentExpandedRecipeVariantsDropdown: { recipeId: RECIPE_ID_1 },
    }),
  }

  return state
}
