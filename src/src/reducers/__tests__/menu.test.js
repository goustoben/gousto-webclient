import { actionTypes } from 'actions/actionTypes'
import Immutable from 'immutable'
import menu, { menuInitialState } from 'reducers/menu'

describe('menu reducer', () => {
  describe('menu', () => {
    test('initial state', () => {
      expect(
        Immutable.is(menu.menu(undefined, {}), menuInitialState),
      ).toEqual(true)
    })

    test('unknown actions', () => {
      const result = menu.menu(menuInitialState, { type: 'unknown' })

      expect(Immutable.is(result, menuInitialState)).toEqual(true)
    })

    describe('MENU_FORCE_LOAD', () => {
      test('forceLoad set to true in the state', () => {
        const result = menu.menu(menuInitialState, {
          type: actionTypes.MENU_FORCE_LOAD,
          forceLoad: true
        })

        expect(result.get('forceLoad')).toEqual(true)
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
        const menuResponse = { data: [
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
        ]}
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
    })
  })

  describe('menuCutoffUntil', () => {
    test('initial state', () => {
      expect(
        Immutable.is(menu.menuCutoffUntil('', {}), ''),
      ).toEqual(true)
    })

    test('unknown actions', () => {
      const result = menu.menuCutoffUntil('', { type: 'unknown' })

      expect(Immutable.is(result, '')).toEqual(true)
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
      expect(
        Immutable.is(menu.menuCollectionRecipes(Immutable.Map(), {}), Immutable.Map()),
      ).toEqual(true)
    })

    test('unknown actions', () => {
      const result = menu.menuCollectionRecipes(Immutable.Map(), { type: 'unknown' })

      expect(Immutable.is(result, Immutable.Map())).toEqual(true)
    })

    describe('MENU_COLLECTION_RECIPES_RECEIVE', () => {
      test('recipes ids for collection should be set in state', () => {
        const result = menu.menuCollectionRecipes(Immutable.Map(),
          { type: 'MENU_COLLECTION_RECIPES_RECEIVE',
            collectionId: 'collection-id',
            recipes: [{
              id: '1',
            }, {
              id: '2'
            }
            ]
          })

        expect(Immutable.is(result, Immutable.fromJS({
          'collection-id': ['1', '2']
        }))).toEqual(true)
      })
    })
  })
})
