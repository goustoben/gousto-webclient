import Immutable from 'immutable'
import { push } from 'react-router-redux'
import * as trackingKeys from '../../../../actions/trackingKeys'
import { actionTypes } from '../../../../actions/actionTypes'
import * as menuRecipeDetailsActions from '../menuRecipeDetails/menuRecipeDetails'
import * as recipeListSelectors from '../../selectors/recipeList'
import { wellformedMenuService, wellformedRecipe } from '../../selectors/__tests__/menuService.test'
import { safeJestMock } from '../../../../_testing/mocks'
import { checkQueryParams as checkQueryParams1 } from "routes/Menu/actions/menuRecipeDetails/checkQueryParams"

jest.mock('react-router-redux', () => ({
  push: jest.fn()
}))

const {
  initSelectedRecipeVariantAction,
  selectRecipeVariant,
  selectRecipeVariantAction,
  showDetailRecipe,
  menuRecipeDetailVisibilityChange,
  checkQueryParams,
} = menuRecipeDetailsActions

describe('selectRecipeVariant', () => {
  test('should dispatch a MENU_RECIPE_VARIANT_SELECTED action with correct payload and trackingData', async () => {
    const originalRecipeId = '101'
    const variantId = '102'
    const collectionId = '999'
    const variantOutOfStock = false
    const view = 'detail'
    const dispatch = jest.fn()
    const getState = () => wellformedMenuService({ recipes: [wellformedRecipe({ id: variantId })] })

    await selectRecipeVariant(originalRecipeId, variantId, collectionId, variantOutOfStock, view)(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.MENU_RECIPE_VARIANT_SELECTED,
      payload: {
        collectionId,
        originalRecipeId,
        variantId,
        close: true
      },
      trackingData: {
        actionType: 'select_recipe_variant',
        recipe_id: originalRecipeId,
        recipe_variant_id: variantId,
        collection_id: collectionId,
        variant_out_of_stock: variantOutOfStock,
        view,
        has_surcharge: false,
      }
    })
  })
})

describe('selectRecipeVariant', () => {
  test('should dispatch a MENU_RECIPE_VARIANT_SELECTED action with correct payload and trackingData', async () => {
    const selectedRecipeVariants = { 'ca8f71be-63ac-11e6-a693-068306404bab': { 2041: '3104', 2171: '3427' }}

    const action = initSelectedRecipeVariantAction(selectedRecipeVariants)

    expect(action).toEqual({
      type: actionTypes.MENU_RECIPE_VARIANT_INIT,
      payload: {
        selectedRecipeVariants
      },
    })
  })
})

describe('selectRecipeVariantAction', () => {
  test('should return a MENU_RECIPE_VARIANT_SELECTED action with correct payload and trackingData', async () => {
    const originalRecipeId = '101'
    const variantId = '102'
    const collectionId = '999'
    const variantOutOfStock = false
    const view = 'detail'
    const close = true
    const hasSurcharge = false

    const result = selectRecipeVariantAction(originalRecipeId, variantId, collectionId, variantOutOfStock, view, close, hasSurcharge)

    expect(result).toEqual({
      type: actionTypes.MENU_RECIPE_VARIANT_SELECTED,
      payload: {
        collectionId,
        originalRecipeId,
        variantId,
        close,
      },
      trackingData: {
        actionType: 'select_recipe_variant',
        recipe_id: originalRecipeId,
        recipe_variant_id: variantId,
        collection_id: collectionId,
        variant_out_of_stock: variantOutOfStock,
        view,
        has_surcharge: hasSurcharge
      }
    })
  })
})

describe('showDetailRecipe', () => {
  const state = {
    menuRecipeDetails: Immutable.fromJS({
      recipeId: null
    }),
    recipes: Immutable.Map({
      1234: {}
    })
  }
  let dispatch
  describe('when boxSummaryShow is true', () => {
    beforeAll(() => {
      safeJestMock(recipeListSelectors, 'replaceSideRecipeIdWithBaseRecipeId').mockImplementation((_, { recipeId }) => recipeId)

      dispatch = jest.fn()
      const stateWithTrueBoxSummaryShow = {
        ...state,
        boxSummaryShow: Immutable.fromJS({
          show: false
        }),
        routing: {
          locationBeforeTransitions: {
            query: ''
          }
        }
      }
      const getStateForTest = () => stateWithTrueBoxSummaryShow

      showDetailRecipe('1234')(dispatch, getStateForTest)
    })

    test('should call menuRecipeDetailVisibilityChange', () => {
      expect(dispatch).toHaveBeenCalledWith({
        recipeId: '1234',
        type: 'MENU_RECIPE_DETAIL_VISIBILITY_CHANGE',
        trackingData: {
          actionType: trackingKeys.changeMenuRecipeDetailVisibility,
          recipeId: '1234',
          show: true
        },
      })
    })
  })
})

describe('menuRecipeDetailVisibilityChange', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()

  beforeEach(() => {
    getState.mockReturnValue({
      auth: Immutable.Map({
        accessToken: 'an-access-token',
        isAuthenticated: false
      }),
      features: Immutable.fromJS({}),
      routing: {
        locationBeforeTransitions: {
          query: {}
        }
      },
      menuCollections: Immutable.fromJS({}),
      recipes: Immutable.Map({
        123: {},
      })
    })
  })

  afterEach(() => {
    dispatch.mockClear()
    getState.mockClear()
  })

  describe('when recipeId is not in the store recipes', () => {
    beforeEach(() => {
      getState.mockReturnValue({
        auth: Immutable.Map({
          accessToken: 'an-access-token',
          isAuthenticated: false
        }),
        features: Immutable.fromJS({}),
        routing: {
          locationBeforeTransitions: {
            query: {}
          }
        },
        menuCollections: Immutable.fromJS({}),
        recipes: Immutable.Map({
          346: {},
        })
      })
    })
    test('should not dispatch', () => {
      menuRecipeDetailVisibilityChange('123')(dispatch, getState)
      expect(dispatch).not.toHaveBeenCalled()
    })
  })

  describe('When recipeId is a side', () => {
    beforeEach(() => {
      getState.mockReturnValue({
        auth: Immutable.Map({
          accessToken: 'an-access-token',
          isAuthenticated: false
        }),
        features: Immutable.fromJS({}),
        routing: {
          locationBeforeTransitions: {
            query: {}
          }
        },
        menuCollections: Immutable.fromJS({}),
        recipes: Immutable.Map({
          789: {},
        })
      })

      safeJestMock(recipeListSelectors, 'replaceSideRecipeIdWithBaseRecipeId').mockReturnValue('mock-base-recipe-id-789')
    })

    test('should replace recipeId with the base recipeId', () => {
      menuRecipeDetailVisibilityChange('789')(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.MENU_RECIPE_DETAIL_VISIBILITY_CHANGE,
        recipeId: 'mock-base-recipe-id-789',
        trackingData: {
          actionType: trackingKeys.changeMenuRecipeDetailVisibility,
          recipeId: 'mock-base-recipe-id-789',
          show: true,
        },
      })
    })
  })
})

describe('checkQueryParams', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()

  beforeEach(() => {
    getState.mockReturnValue({
      routing: {
        locationBeforeTransitions: {
          query: {}
        }
      },
    })
  })

  afterEach(() => {
    dispatch.mockClear()
    getState.mockClear()
  })

  test('should not call dispatch', () => {
    checkQueryParams()(dispatch, getState)
    expect(dispatch).not.toHaveBeenCalled()
  })

  describe('when query has recipeDetailId', () => {
    beforeEach(() => {
      safeJestMock(menuRecipeDetailsActions, 'showDetailRecipe').mockReturnValue('showDetailRecipe')
      push.mockImplementation((arg) => arg)
      getState.mockReturnValue({
        routing: {
          locationBeforeTransitions: {
            query: {
              recipeDetailId: '1234'
            }
          }
        }
      })
    })

    test('should dispatch push with new route without recipeDetailId', () => {
      checkQueryParams1()(dispatch, getState)
      expect(push).toHaveBeenCalledWith({
        query: {}
      })
    })

    test('should dispatch showDetailRecipe', () => {
      checkQueryParams1()(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith('showDetailRecipe')
    })
  })
})
