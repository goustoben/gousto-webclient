import Immutable from 'immutable'

import { isMenuRecommended, isRecommendedRecipe, isRecipeInStock, isRecipeInBasket, getMenuLimits } from 'utils/menu'

describe('menu utils', () => {
  describe('isMenuRecommended', () => {
    const recipesUnrecommendedMock = Immutable.fromJS({
      121: {
        isRecommended: false,
      },
      1771: {
        isRecommended: false,
      },
    })

    const recipesRecommendedMock = Immutable.fromJS({
      121: {
        isRecommended: false,
      },
      1771: {
        isRecommended: true,
      },
    })

    test('if no recipes are recommended, returns false', () => {
      const expectedResult = isMenuRecommended(recipesUnrecommendedMock)
      expect(expectedResult).toEqual(false)
    })

    test('if one or more recipes are recommended returns true', () => {
      const expectedResult = isMenuRecommended(recipesRecommendedMock)
      expect(expectedResult).toEqual(true)
    })
  })

  describe('isRecommendedRecipe', () => {
    const allRecipesListMock = Immutable.fromJS([234, 543, 252, 444, 451])

    const recipesRecommendedMock = Immutable.fromJS({
      121: {
        isRecommended: false,
      },
      1771: {
        isRecommended: true,
      },
    })

    test('if recipe is in recommended list, in the collection', () => {
      const expectedResult = isRecommendedRecipe(
        234,
        allRecipesListMock,
        recipesRecommendedMock,
      )
      expect(expectedResult).toEqual(true)
    })

    test('if recipe is NOT in recommended list, in the collection', () => {
      const expectedResult = isRecommendedRecipe(
        1,
        allRecipesListMock,
        recipesRecommendedMock,
      )
      expect(expectedResult).toEqual(false)
    })
  })

  describe('isRecipeInStock', () => {
    const recipe = Immutable.Map({
      id: '10',
    })

    test('-browse mode, if recipe is in stock, return true', () => {
      expect(isRecipeInStock(recipe, Immutable.fromJS({
        10: {
          2: null,
        },
      }), 2)).toEqual(true)
    })
  })

  describe('isRecipeInBasket', () => {
    const recipe = Immutable.Map({
      id: '10',
    })
    const basketRecipes = Immutable.Map({
      10: 1,
    })

    test('if recipe is in the basket, return true', () => {
      expect(isRecipeInBasket(recipe, basketRecipes)).toBeTruthy()
    })
  })

  describe('getMenuLimits', () => {
    let menuData
    let menuLimits
    describe('when menu has limits', () => {
      beforeEach(() => {
        menuLimits = [{
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

        menuData = [
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
      })
      test('should return limits for each menu', () => {
        const result = getMenuLimits(menuData)
        expect(result).toEqual({
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

    describe('when menu does not have limits', () => {
      beforeEach(() => {
        menuData = [
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
                data: []
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
                data: []
              },
              collections: {
                data: []
              }
            }
          }
        ]
      })
      test('should return empty array for limits for menu', () => {
        const result = getMenuLimits(menuData)
        expect(result).toEqual({
          123: {
            limits: [],
            startsAt: '2020-04-14T12:00:00+01:00',
            endsAt: '2020-04-21T11:59:59+01:00'
          },
          345: {
            limits: [],
            startsAt: '2020-04-14T12:00:00+01:00',
            endsAt: '2020-04-21T11:59:59+01:00'
          },
        })
      })
    })
  })
})
