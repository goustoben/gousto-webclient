import { actionTypes } from 'actions/actionTypes'
import Immutable from 'immutable'
import { menuReducers, menuInitialState } from 'reducers/menu'
import { isServer } from '../../../server/utils/serverEnvironment'
import {
  clearSelectedRecipeVariants,
  menuLoadingError
} from '../../actions/menu'
import { selectRecipeVariantAction, initSelectedRecipeVariantAction } from '../../routes/Menu/actions/menuRecipeDetails'
import { setMenuPrefetched } from '../../routes/Menu/actions/menuPrefetch'
import { trackTimeToUsable } from '../../routes/Menu/actions/menuCalculateTimeToUsable'

jest.mock('../../../server/utils/serverEnvironment')

describe('menu reducer', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('menu', () => {
    test('initial state', () => {
      expect(menuReducers.menu(undefined, {})).toEqual(menuInitialState)
    })

    test('unknown actions', () => {
      const result = menuReducers.menu(menuInitialState, { type: 'unknown' })

      expect(result).toEqual(menuInitialState)
    })

    describe('MENU_FORCE_LOAD', () => {
      test('forceLoad set to true in the state', () => {
        const result = menuReducers.menu(menuInitialState, {
          type: actionTypes.MENU_FORCE_LOAD,
          forceLoad: true
        })

        expect(result.get('forceLoad')).toBeTruthy()
      })
    })

    describe('MENU_FETCH_PARAMS', () => {
      test('menuVariant and accessToken set to value received in the state', () => {
        const result = menuReducers.menu(menuInitialState, {
          type: actionTypes.MENU_FETCH_PARAMS,
          accessToken: 'access-token',
          menuVariant: 'variant-b'
        })

        expect(result.get('menuVariant')).toEqual('variant-b')
        expect(result.get('accessToken')).toEqual('access-token')
      })
    })

    describe('MENU_SERVICE_DATA_RECEIVED', () => {
      test('should set menuLimits', () => {
        const menuLimits = [{
          name: 'rule-name',
          rules: {
            per2: {
              value: 1,
              description: 'per2',
            },
            per4: {
              value: 1,
              description: 'per4',
            }
          },
          items: [
            {
              type: 'recipe',
              core_recipe_id: '12345'
            }
          ]
        }]
        const menuResponse = {
          data: [
            {
              id: '123',
              type: 'menu',
              attributes: {
                starts_at: '2020-04-14T12:00:00+01:00',
                ends_at: '2020-04-21T11:59:59+01:00',
                is_default: true,
                core_menu_id: '336'
              },
              relationships: {
                recipes: {
                  data: []
                },
                recipe_options: {
                  data: []
                },
                limits: {
                  data: menuLimits
                },
                collections: {
                  data: []
                }
              }
            },
            {
              id: '345',
              type: 'menu',
              attributes: {
                starts_at: '2020-04-14T12:00:00+01:00',
                ends_at: '2020-04-21T11:59:59+01:00',
                is_default: true,
                core_menu_id: '336'
              },
              relationships: {
                recipes: {
                  data: []
                },
                recipe_options: {
                  data: []
                },
                limits: {
                  data: menuLimits
                },
                collections: {
                  data: []
                }
              }
            }
          ]
        }
        const result = menuReducers.menu(menuInitialState, {
          type: actionTypes.MENU_SERVICE_DATA_RECEIVED,
          response: menuResponse
        })

        expect(result.get('menuLimits')).toEqual({
          123: {
            limits: menuLimits,
            startsAt: '2020-04-14T12:00:00+01:00',
            endsAt: '2020-04-21T11:59:59+01:00'
          },
          345: {
            limits: menuLimits,
            startsAt: '2020-04-14T12:00:00+01:00',
            endsAt: '2020-04-21T11:59:59+01:00'
          },
        })
      })

      test('should not affect initial state', () => {
        const initialState = Immutable.Map({
          accessToken: 'token',
          menuVariant: 'variant',
          menuLimits: [],
          menuVariants: {}
        })

        const result = menuReducers.menu(initialState, {
          type: actionTypes.MENU_SERVICE_DATA_RECEIVED,
          response: { data: [] }
        })

        expect(result.get('accessToken')).toEqual('token')
        expect(result.get('menuVariant')).toEqual('variant')
      })
    })

    describe('when selectRecipeVariantAction action is received', () => {
      const recipeId = '1234'

      describe('when variantId is null', () => {
        const variantId = null
        const collectionId = 'collection-id'
        const action = selectRecipeVariantAction(recipeId, variantId, collectionId, false, false)

        test('should set selectedRecipeVariant entry to null', () => {
          const result = menuReducers.menu(menuInitialState, action)

          const expectedState = menuInitialState.set('selectedRecipeVariants', { [collectionId]: { [recipeId]: variantId } })

          expect(result).toEqual(expectedState)
        })
      })

      describe('when variantId is a recipe id', () => {
        const variantId = '5678'
        const collectionId = 'collection-id'
        const action = selectRecipeVariantAction(recipeId, variantId, collectionId, false, false)

        test('should set selectedRecipeVariant entry to the selected id', () => {
          const result = menuReducers.menu(menuInitialState, action)

          const expectedState = menuInitialState.set('selectedRecipeVariants', { [collectionId]: { [recipeId]: variantId } })

          expect(result).toEqual(expectedState)
        })
      })
    })

    describe('when clearRecipeVariants action is received', () => {
      const stateWithSelectedVariants = menuInitialState.set(
        'selectedRecipeVariants',
        {
          'recipe-1': 'variant-1',
          'recipe-2': 'variant-2'
        }
      )

      const expectedState = menuInitialState.set('selectedRecipeVariants', {})

      test('should set selectedRecipeVariants to empty object', () => {
        const action = clearSelectedRecipeVariants()

        const result = menuReducers.menu(stateWithSelectedVariants, action)
        expect(result).toEqual(expectedState)
      })
    })

    describe('MENU_RECIPE_VARIANT_INIT', () => {
      test('should set selectedRecipeVariants entry to the variants provided', () => {
        const selectedRecipeVariants = { 'ca8f71be-63ac-11e6-a693-068306404bab': { 2041: '3104', 2171: '3427' }}

        const action = initSelectedRecipeVariantAction(selectedRecipeVariants)

        const result = menuReducers.menu(menuInitialState, action)

        const expectedState = menuInitialState.set('selectedRecipeVariants', selectedRecipeVariants)

        expect(result).toEqual(expectedState)
      })
    })

    describe('MENU_CALCULATE_TIME_TO_USABLE', () => {
      test('should set hasCalculatedTimeToUsable to true', () => {
        const result = menuReducers.menu(menuInitialState, trackTimeToUsable(123, 456))

        expect(result.get('hasCalculatedTimeToUsable')).toBeTruthy()
      })
    })

    describe('MENU_PREFETCHED', () => {
      test('should set menuPrefetched to true', () => {
        const result = menuReducers.menu(menuInitialState, setMenuPrefetched(true))

        expect(result.get('menuPrefetched')).toBe(true)
      })
    })

    describe('@@router/LOCATION_CHANGE (this comes from Redux Router)', () => {
      let result

      beforeEach(() => {
        result = menuInitialState
      })

      describe('when in the browser', () => {
        beforeEach(() => {
          isServer.mockReturnValue(false)
        })

        describe('when landing on the menu first', () => {
          beforeEach(() => {
            result = menuReducers.menu(result, { type: '@@router/LOCATION_CHANGE', payload: { pathname: '/menu', action: 'POP' } })
          })
          // trigger first reducer action
          describe('and not going elsewhere', () => {
            test('should set to false', () => {
              expect(result.get('hasVisitedNonMenuPage')).toBeFalsy()
            })
          })
          describe('and user goes to a non menu page', () => {
            beforeEach(() => {
              result = menuReducers.menu(result, { type: '@@router/LOCATION_CHANGE', payload: { pathname: '/', action: 'PUSH' } })
            })

            test('should set to true', () => {
              expect(result.get('hasVisitedNonMenuPage')).toBeTruthy()
            })
          })
          describe('and user goes to the menu', () => {
            beforeEach(() => {
              result = menuReducers.menu(result, { type: '@@router/LOCATION_CHANGE', payload: { pathname: '/menu', action: 'POP' } })
            })

            // trigger secod reducer action
            test('should set to false', () => {
              expect(result.get('hasVisitedNonMenuPage')).toBeFalsy()
            })
          })
        })

        describe('when landing on the home page first', () => {
          beforeEach(() => {
            result = menuReducers.menu(result, { type: '@@router/LOCATION_CHANGE', payload: { pathname: '/', action: 'POP' } })
          })
          // trigger first reducer action
          describe('and not going elsewhere', () => {
            test('should set to true', () => {
              expect(result.get('hasVisitedNonMenuPage')).toBeTruthy()
            })
          })
          describe('and go to the menu', () => {
            beforeEach(() => {
              result = menuReducers.menu(result, { type: '@@router/LOCATION_CHANGE', payload: { pathname: '/menu', action: 'PUSH' } })
            })

            // trigger secod reducer action
            test('should set to true', () => {
              expect(result.get('hasVisitedNonMenuPage')).toBeTruthy()
            })
          })
        })
      })

      describe('when on the server', () => {
        beforeEach(() => {
          isServer.mockReturnValue(true)
          result = menuReducers.menu(result, {
            type: '@@router/LOCATION_CHANGE',
            payload: { pathname: '/menu', action: 'POP' },
          })
        })

        test('then initial state is returned', () => {
          expect(result).toEqual(menuInitialState)
        })
      })
    })

    describe('menuLoadingError action', () => {
      let result

      beforeEach(() => {
        result = menuInitialState
      })

      it('should set menuLoadingErrorMessage to the argument of action', () => {
        result = menuReducers.menu(result, menuLoadingError('cannot load menu'))
        expect(result.get('menuLoadingErrorMessage')).toBe('cannot load menu')
      })
    })
  })

  describe('menuCutoffUntil', () => {
    test('initial state', () => {
      const result = menuReducers.menuCutoffUntil('', {})

      expect(result).toEqual('')
    })

    test('unknown actions', () => {
      const result = menuReducers.menuCutoffUntil('', { type: 'unknown' })

      expect(result).toEqual('')
    })

    describe('MENU_CUTOFF_UNTIL_RECEIVE', () => {
      test('cutoffUntil set to value received in state', () => {
        const result = menuReducers.menuCutoffUntil('', {
          type: actionTypes.MENU_CUTOFF_UNTIL_RECEIVE,
          cutoffUntil: '2020-02-20'
        })

        expect(result).toEqual('2020-02-20')
      })
    })
  })

  describe('menuRecipeDetails', () => {
    describe('when action type MENU_RECIPE_DETAIL_VISIBILITY_CHANGE', () => {
      test('should set menuRecipeDetails', () => {
        const recipeId = '123'
        const result = menuReducers.menuRecipeDetails(Immutable.Map({}), {
          type: actionTypes.MENU_RECIPE_DETAIL_VISIBILITY_CHANGE,
          recipeId
        })
        expect(result).toEqual(Immutable.Map({
          recipeId,
        }))
      })
      describe('when categoryId is defined in state and action does not have categoryId', () => {
        test('should set menuRecipeDetails', () => {
          const recipeId = '123'
          const result = menuReducers.menuRecipeDetails(Immutable.Map({ categoryId: 'category'}), {
            type: actionTypes.MENU_RECIPE_DETAIL_VISIBILITY_CHANGE,
            recipeId
          })
          expect(result).toEqual(Immutable.Map({
            recipeId,
            categoryId: 'category'
          }))
        })
      })
    })

    describe('when action type MENU_RECIPE_DETAIL_VISIBILITY_CHANGE with categoryId', () => {
      test('should set menuRecipeDetails recipeId and categoryId', () => {
        const recipeId = '123'
        const categoryId = 'category1'
        const recipeReference = 'reference_to_123'
        const result = menuReducers.menuRecipeDetails(Immutable.Map({}), {
          type: actionTypes.MENU_RECIPE_DETAIL_VISIBILITY_CHANGE,
          recipeId,
          categoryId,
          recipeReference,
        })
        expect(result).toEqual(Immutable.Map({
          recipeId,
          categoryId,
          recipeReference,
        }))
      })
    })
  })

  describe('menuBoxPrices', () => {
    test('should return menuPrices', () => {
      const result = menuReducers.menuBoxPrices(Immutable.Map({}), {
        type: actionTypes.MENU_BOX_PRICES_RECEIVE,
        prices: {
          items: []
        }
      })
      expect(result).toEqual(Immutable.fromJS({
        items: []
      }))
    })
  })

  describe('menuSidesModalOpen', () => {
    describe('when MENU_OPEN_SIDES_MODAL action is sent', () => {
      test('should return menuSidesModalOpen as true', () => {
        const result = menuReducers.menuSidesModalOpen(Immutable.Map({}), {
          type: actionTypes.MENU_OPEN_SIDES_MODAL,
        })

        expect(result).toEqual(true)
      })
    })

    describe('when MENU_CLOSE_SIDES_MODAL action is sent', () => {
      test('should return menuSidesModalOpen as false', () => {
        const result = menuReducers.menuSidesModalOpen(Immutable.Map({}), {
          type: actionTypes.MENU_CLOSE_SIDES_MODAL,
        })

        expect(result).toEqual(false)
      })
    })
  })

  describe('menuRecipes', () => {
    test('should return menuRecipes', () => {
      const result = menuReducers.menuRecipes(Immutable.List([]), {
        type: actionTypes.RECIPES_RECEIVE,
        recipes: [{
          id: 1
        }, {
          id: 2
        }]
      })
      expect(result).toEqual(Immutable.fromJS([1, 2]))
    })
  })
})
