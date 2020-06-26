import { actionTypes } from 'actions/actionTypes'
import Immutable from 'immutable'
import menu, { menuInitialState } from 'reducers/menu'
import { selectRecipeVariant, clearSelectedRecipeVariants, recipeVariantDropdownExpanded } from '../../actions/menu'
import { menuCollectionsHeadersReceived } from '../../routes/Menu/actions/brandHeaders'
import { trackTimeToUsable } from '../../routes/Menu/actions/menuCalculateTimeToUsable'

describe('menu reducer', () => {
  describe('menu', () => {
    test('initial state', () => {
      expect(menu.menu(undefined, {})).toEqual(menuInitialState)
    })

    test('unknown actions', () => {
      const result = menu.menu(menuInitialState, { type: 'unknown' })

      expect(result).toEqual(menuInitialState)
    })

    describe('MENU_FORCE_LOAD', () => {
      test('forceLoad set to true in the state', () => {
        const result = menu.menu(menuInitialState, {
          type: actionTypes.MENU_FORCE_LOAD,
          forceLoad: true
        })

        expect(result.get('forceLoad')).toBeTruthy()
      })
    })

    describe('MENU_FETCH_PARAMS', () => {
      test('menuVariant and accessToken set to value received in the state', () => {
        const result = menu.menu(menuInitialState, {
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
        const result = menu.menu(menuInitialState, {
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

        const result = menu.menu(initialState, {
          type: actionTypes.MENU_SERVICE_DATA_RECEIVED,
          response: { data: [] }
        })

        expect(result.get('accessToken')).toEqual('token')
        expect(result.get('menuVariant')).toEqual('variant')
      })
    })

    describe('when selectRecipeVariant action is received', () => {
      const recipeId = '1234'

      describe('when variantId is null', () => {
        const variantId = null
        const collectionId = 'collection-id'
        const action = selectRecipeVariant(recipeId, variantId, collectionId, false)

        test('should set selectedRecipeVariant entry to null', () => {
          const result = menu.menu(menuInitialState, action)

          const expectedState = menuInitialState.set('selectedRecipeVariants', { [collectionId]: { [recipeId]: variantId } })

          expect(result).toEqual(expectedState)
        })
      })

      describe('when variantId is a recipe id', () => {
        const variantId = '5678'
        const collectionId = 'collection-id'
        const action = selectRecipeVariant(recipeId, variantId, collectionId, false)

        test('should set selectedRecipeVariant entry to the selected id', () => {
          const result = menu.menu(menuInitialState, action)

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

        const result = menu.menu(stateWithSelectedVariants, action)
        expect(result).toEqual(expectedState)
      })
    })

    describe('MENU_RECIPE_VARIANTS_DROPDOWN_EXPANDED', () => {
      const recipeId = '1234'
      const action = recipeVariantDropdownExpanded(recipeId)
      test('should set recipeVariantDropdownExpanded entry to the recipe id', () => {
        const result = menu.menu(menuInitialState, action)
        const expectedState = menuInitialState.set('currentExpandedRecipeVariantsDropdown', recipeId)
        expect(result).toEqual(expectedState)
      })
    })

    describe('MENU_COLLECTIONS_HEADERS_RECEIVED', () => {
      const menuHeaderData = {
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

      const headerData = {
        attributes: {},
        id: 'header-wave-id',
        type: 'wave-link-header'
      }

      test('should set recipeVariantDropdownExpanded entry to the recipe id', () => {
        const action = menuCollectionsHeadersReceived({
          collectionsPerMenu: [menuHeaderData],
          headers: [headerData]
        })
        const result = menu.menu(menuInitialState, action)
        const expectedState = menuInitialState.set('collectionHeaders', {
          collectionsPerMenu: [menuHeaderData],
          headers: [headerData]
        })

        expect(result).toEqual(expectedState)
      })
    })
  })

  describe('menuCutoffUntil', () => {
    test('initial state', () => {
      const result = menu.menuCutoffUntil('', {})

      expect(result).toEqual('')
    })

    test('unknown actions', () => {
      const result = menu.menuCutoffUntil('', { type: 'unknown' })

      expect(result).toEqual('')
    })

    describe('MENU_CUTOFF_UNTIL_RECEIVE', () => {
      test('cutoffUntil set to value received in state', () => {
        const result = menu.menuCutoffUntil('', {
          type: actionTypes.MENU_CUTOFF_UNTIL_RECEIVE,
          cutoffUntil: '2020-02-20'
        })

        expect(result).toEqual('2020-02-20')
      })
    })
  })

  describe('menuCollectionRecipes', () => {
    test('initial state', () => {
      const result = menu.menuCollectionRecipes(Immutable.Map(), {})

      expect(result).toEqual(Immutable.Map())
    })

    test('unknown actions', () => {
      const result = menu.menuCollectionRecipes(Immutable.Map(), { type: 'unknown' })

      expect(result).toEqual(Immutable.Map())
    })

    describe('MENU_COLLECTION_RECIPES_RECEIVE', () => {
      test('recipes ids for collection should be set in state', () => {
        const expectedResult = Immutable.fromJS({
          'collection-id': ['1', '2']
        })

        const result = menu.menuCollectionRecipes(Immutable.Map(),
          {
            type: 'MENU_COLLECTION_RECIPES_RECEIVE',
            collectionId: 'collection-id',
            recipes: [{
              id: '1',
            }, {
              id: '2'
            }
            ]
          })

        expect(result).toEqual(expectedResult)
      })
    })

    describe('MENU_CALCULATE_TIME_TO_USABLE', () => {
      test('should set hasCalculatedTimeToUsable to true', () => {
        const result = menu.menu(menuInitialState, trackTimeToUsable(123, 456))

        expect(result.get('hasCalculatedTimeToUsable')).toBeTruthy()
      })
    })

    describe('@@router/LOCATION_CHANGE (this comes from Redux Router)', () => {
      let result

      beforeEach(() => {
        result = menuInitialState
      })

      describe('when landing on the menu first', () => {
        beforeEach(() => {
          result = menu.menu(result, { type: '@@router/LOCATION_CHANGE', payload: { pathname: '/menu', action: 'POP' } })
        })
        // trigger first reducer action
        describe('and not going elsewhere', () => {
          test('should set to false', () => {
            expect(result.get('hasVisitedNonMenuPage')).toBeFalsy()
          })
        })
        describe('and user goes to a non menu page', () => {
          beforeEach(() => {
            result = menu.menu(result, { type: '@@router/LOCATION_CHANGE', payload: { pathname: '/', action: 'PUSH' } })
          })

          test('should set to true', () => {
            expect(result.get('hasVisitedNonMenuPage')).toBeTruthy()
          })
        })
        describe('and user goes to the menu', () => {
          beforeEach(() => {
            result = menu.menu(result, { type: '@@router/LOCATION_CHANGE', payload: { pathname: '/menu', action: 'POP' } })
          })

          // trigger secod reducer action
          test('should set to false', () => {
            expect(result.get('hasVisitedNonMenuPage')).toBeFalsy()
          })
        })
      })

      describe('when landing on the home page first', () => {
        beforeEach(() => {
          result = menu.menu(result, { type: '@@router/LOCATION_CHANGE', payload: { pathname: '/', action: 'POP' } })
        })
        // trigger first reducer action
        describe('and not going elsewhere', () => {
          test('should set to true', () => {
            expect(result.get('hasVisitedNonMenuPage')).toBeTruthy()
          })
        })
        describe('and go to the menu', () => {
          beforeEach(() => {
            result = menu.menu(result, { type: '@@router/LOCATION_CHANGE', payload: { pathname: '/menu', action: 'PUSH' } })
          })

          // trigger secod reducer action
          test('should set to true', () => {
            expect(result.get('hasVisitedNonMenuPage')).toBeTruthy()
          })
        })
      })
    })
  })
})
