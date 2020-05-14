import Immutable from 'immutable'

import { isRecipeInStock, isRecipeInBasket, getMenuLimits } from 'utils/menu'
import { getMenuVariants, switchSelectedVariants } from '../menu'

describe('menu utils', () => {
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

  describe('getMenuVariants', () => {
    const menus = [
      {
        id: '1111',
        relationships: {
          recipe_options: {
            data: [
              {
                type: 'recipe',
                id: 'aubergine-id',
                core_recipe_id: 'aubergine-core-id',
                attributes: {
                  short_display_name: 'Aubergine & Tomato Orzo With Rocket Pesto',
                },
                relationships: [
                  {
                    type: 'alternative',
                    data: {
                      type: 'recipe',
                      id: 'fish-chips-id',
                      core_recipe_id: 'fish-chips-core-id',
                      attributes: {
                        short_display_name: "Crispy Fish, Root Veg Chips & Bangin' Ketchup"
                      }
                    }
                  }
                ]
              },
              {
                type: 'recipe',
                id: 'chicken-taco-id',
                core_recipe_id: 'chicken-taco-core-id',
                attributes: {
                  short_display_name: 'Chicken Tinga Tacos With Lime Mayo',
                },
                relationships: [
                  {
                    type: 'alternative',
                    data: {
                      type: 'recipe',
                      id: 'orange-chicken-id',
                      core_recipe_id: 'orange-chicken-core-id',
                      attributes: {
                        short_display_name: '10-Min Sticky Orange Chicken & Rice'
                      }
                    }
                  },
                  {
                    type: 'alternative',
                    data: {
                      type: 'recipe',
                      id: 'chicken-burger-id',
                      core_recipe_id: 'chicken-burger-core-id',
                      attributes: {
                        short_display_name: 'Mexican Pulled Chicken Burger & Paprika Fries'
                      }
                    }
                  }
                ]
              }
            ]
          }
        }
      },
      {
        id: '2222',
        relationships: {
          recipe_options: {
            data: [
              {
                type: 'recipe',
                id: 'aubergine-id',
                core_recipe_id: 'aubergine-core-id',
                attributes: { short_display_name: 'Aubergine & Tomato Orzo With Rocket Pesto',
                },
                relationships: [
                  {
                    type: 'not-alternative',
                    data: {
                      type: 'recipe',
                      id: 'dec07237-3fef-462d-a2f0-0e3f671be580',
                      core_recipe_id: '9999',
                      attributes: {
                        short_display_name: 'This recipe is not an alternative'
                      }
                    }
                  }
                ]
              }
            ]
          }
        }
      }
    ]

    test('should parse menus correctly', () => {
      const expected = {
        1111: {
          'aubergine-core-id': {
            displayName: 'Aubergine & Tomato Orzo With Rocket Pesto',
            alternatives: [
              {
                id: 'fish-chips-id',
                coreRecipeId: 'fish-chips-core-id',
                displayName: "Crispy Fish, Root Veg Chips & Bangin' Ketchup"
              }
            ]
          },
          'fish-chips-core-id': {
            displayName: "Crispy Fish, Root Veg Chips & Bangin' Ketchup",
            alternatives: [
              {
                id: 'aubergine-id',
                coreRecipeId: 'aubergine-core-id',
                displayName: 'Aubergine & Tomato Orzo With Rocket Pesto'
              }
            ]
          },
          'chicken-taco-core-id': {
            displayName: 'Chicken Tinga Tacos With Lime Mayo',
            alternatives: [
              {
                id: 'orange-chicken-id',
                coreRecipeId: 'orange-chicken-core-id',
                displayName: '10-Min Sticky Orange Chicken & Rice'
              },
              {
                id: 'chicken-burger-id',
                coreRecipeId: 'chicken-burger-core-id',
                displayName: 'Mexican Pulled Chicken Burger & Paprika Fries'
              }
            ]
          },
          'orange-chicken-core-id': {
            displayName: '10-Min Sticky Orange Chicken & Rice',
            alternatives: [
              {
                id: 'chicken-taco-id',
                coreRecipeId: 'chicken-taco-core-id',
                displayName: 'Chicken Tinga Tacos With Lime Mayo'
              },
              {
                id: 'chicken-burger-id',
                coreRecipeId: 'chicken-burger-core-id',
                displayName: 'Mexican Pulled Chicken Burger & Paprika Fries'
              }
            ]
          },
          'chicken-burger-core-id': {
            displayName: 'Mexican Pulled Chicken Burger & Paprika Fries',
            alternatives: [
              {
                id: 'chicken-taco-id',
                coreRecipeId: 'chicken-taco-core-id',
                displayName: 'Chicken Tinga Tacos With Lime Mayo'
              },
              {
                id: 'orange-chicken-id',
                coreRecipeId: 'orange-chicken-core-id',
                displayName: '10-Min Sticky Orange Chicken & Rice'
              },
            ]
          },
        },
        2222: { }
      }

      const result = getMenuVariants(menus)

      expect(result).toEqual(expected)
    })
  })

  describe('getNewMenuVariants', () => {
    describe('when the origin recipes is not a variant', () => {
      let originalVariants
      let payload
      beforeEach(() => {
        originalVariants = {}
        payload = {
          collectionId: '123abc',
          originalRecipeId: '123',
          variantId: '234'
        }
      })
      test('should return new menu variants', () => {
        const result = switchSelectedVariants(originalVariants, payload)
        const expectedResult = {
          '123abc': {
            123: '234',
          }
        }
        expect(result).toEqual(expectedResult)
      })
    })

    describe('when the origin recipes is a variant in the same collection', () => {
      let originalVariants
      let payload
      beforeEach(() => {
        originalVariants = {
          '123abc': {
            '123ght': '123',
            456: '321'
          }
        }
        payload = {
          collectionId: '123abc',
          originalRecipeId: '123',
          variantId: '234'
        }
      })
      test('should return new menu variants without the previews variant', () => {
        const result = switchSelectedVariants(originalVariants, payload)
        const expectedResult = {
          '123abc': {
            123: '234',
            456: '321'
          }
        }
        expect(result).toEqual(expectedResult)
      })
    })
  })
})
