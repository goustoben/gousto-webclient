import Immutable from 'immutable'
import { activeMenuForDate, getMenuLimitsForBasket, validateRecipeAgainstRule, getCurrentMenuRecipes, getIsEnabledRecipeTileFoundation } from '../menu'

describe('getCurrentMenuRecipes', () => {
  test('should return only recipes in the current menu', () => {
    const allRecipes = Immutable.fromJS({ recipeId1: { desc: 'recipe1Desc' }, recipeId2: { desc: 'recipe2Desc' } })
    const currentMenuIds = ['recipeId1']
    const result = getCurrentMenuRecipes.resultFunc(allRecipes, currentMenuIds)
    expect(result).toEqual([Immutable.fromJS({ desc: 'recipe1Desc' })])
  })
})

describe('activeMenuForDate', () => {
  test('should get the active menu for a date that is before the first menus end_at', () => {
    const testData = {
      data: [{
        id: '295',
        type: 'menus',
        attributes: {
          ends_at: '2019-04-03T11:59:59+01:00'
        }
      }, {
        id: '296',
        type: 'menus',
        attributes: {
          ends_at: '2019-10-20T11:59:59+01:00'
        }
      }]
    }
    const result = activeMenuForDate(testData, '2019-04-01T11:59:59+01:00')
    expect(result).toEqual({
      id: '295',
      type: 'menus',
      attributes: {
        ends_at: '2019-04-03T11:59:59+01:00'
      }
    })
  })

  test('should get the active menu for a date that is after the first menus end_at', () => {
    const testData = {
      data: [{
        id: '295',
        type: 'menus',
        attributes: {
          ends_at: '2019-04-03T11:59:59+01:00'
        }
      }, {
        id: '296',
        type: 'menus',
        attributes: {
          ends_at: '2019-10-20T11:59:59+01:00'
        }
      }]
    }
    const result = activeMenuForDate(testData, '2019-06-13T11:59:59+01:00')
    expect(result).toEqual({
      id: '296',
      type: 'menus',
      attributes: {
        ends_at: '2019-10-20T11:59:59+01:00'
      }
    })
  })

  test('should get the active menu for a date that is just after the first menus end_at', () => {
    const testData = {
      data: [{
        id: '295',
        type: 'menus',
        attributes: {
          ends_at: '2019-04-03T11:59:59+01:00'
        }
      }, {
        id: '296',
        type: 'menus',
        attributes: {
          ends_at: '2019-10-20T11:59:59+01:00'
        }
      }]
    }
    const result = activeMenuForDate(testData, '2019-04-03T12:00:00+01:000')
    expect(result).toEqual({
      id: '296',
      type: 'menus',
      attributes: {
        ends_at: '2019-10-20T11:59:59+01:00'
      }
    })
  })

  test('should get the first menu if no date is passed in', () => {
    const testData = {
      data: [{
        id: '295',
        type: 'menus',
        attributes: {
          ends_at: '2019-04-03T11:59:59+01:00'
        }
      }, {
        id: '296',
        type: 'menus',
        attributes: {
          ends_at: '2019-10-20T11:59:59+01:00'
        }
      }]
    }
    const result = activeMenuForDate(testData, null)
    expect(result).toEqual({
      id: '295',
      type: 'menus',
      attributes: {
        ends_at: '2019-04-03T11:59:59+01:00'
      }
    })
  })

  test('should return undefined for a date that is just after the second menus end_at', () => {
    const testData = {
      data: [{
        id: '295',
        type: 'menus',
        attributes: {
          ends_at: '2019-04-03T11:59:59+01:00'
        }
      }, {
        id: '296',
        type: 'menus',
        attributes: {
          ends_at: '2019-10-20T11:59:59+01:00'
        }
      }]
    }
    const result = activeMenuForDate(testData, '2019-10-25T12:00:00+01:000')
    expect(result).toEqual(undefined)
  })

  describe('when no menuServiceData.data', () => {
    test('should return empty object', () => {
      const testData = {}
      const result = activeMenuForDate(testData, '2019-10-25T12:00:00+01:000')
      expect(result).toEqual({})
    })
  })
  describe('when a menu is being previewed', () => {
    test('then it should return the only menu in the response ', () => {
      const testData = {
        meta: {
          isPreviewMenu: true,
        },
        data: [{
          id: '999',
          type: 'menus',
          attributes: {
            ends_at: '2100-04-03T11:59:59+01:00'
          }
        }]
      }
      const result = activeMenuForDate(testData, '2019-10-25T12:00:00+01:000')
      expect(result.id).toEqual('999')
    })
  })
})

describe('getMenuLimitsForBasket', () => {
  let state
  describe('when current menu has limits', () => {
    beforeEach(() => {
      state = {
        basket: Immutable.fromJS({
          currentMenuId: '340',
          numPortions: 2
        }),
        menu: Immutable.Map({
          menuLimits: {
            340: {
              limits: [{
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
            }
          }
        })
      }
    })

    test('should return limits', () => {
      const result = getMenuLimitsForBasket(state)
      const expectedResult = [
        {
          name: 'rule-name',
          limitProps: {
            value: 1,
            description: 'per2',
          },
          items: [
            {
              type: 'recipe',
              core_recipe_id: '12345'
            }
          ]
        }
      ]
      expect(result).toEqual(expectedResult)
    })
  })

  describe('when current menu does NOT have limits', () => {
    beforeEach(() => {
      state = {
        basket: Immutable.fromJS({
          currentMenuId: '340',
          numPortions: 2
        }),
        menu: Immutable.Map({
          menuLimits: {
            340: {
              limits: []
            }
          }
        })
      }
    })

    test('should return empty Array', () => {
      const result = getMenuLimitsForBasket(state)
      const expectedResult = []
      expect(result).toEqual(expectedResult)
    })
  })

  describe('when numPortion is 4', () => {
    beforeEach(() => {
      state = {
        basket: Immutable.fromJS({
          currentMenuId: '340',
          numPortions: 4
        }),
        menu: Immutable.Map({
          menuLimits: {
            340: {
              limits: [{
                name: 'rule-name',
                rules: {
                  per2: {
                    value: 1,
                    description: 'per2',
                  },
                  per4: {
                    value: 2,
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
            }
          }
        })
      }
    })

    test('should return limits per4', () => {
      const result = getMenuLimitsForBasket(state)
      const expectedResult = [
        {
          name: 'rule-name',
          limitProps: {
            value: 2,
            description: 'per4',
          },
          items: [
            {
              type: 'recipe',
              core_recipe_id: '12345'
            }
          ]
        }
      ]
      expect(result).toEqual(expectedResult)
    })
  })
})

describe('validateRecipeAgainstRule', () => {
  let menuLimitsForBasket
  let recipeId
  let basketRecipes

  describe('when no recipes in basket', () => {
    beforeEach(() => {
      menuLimitsForBasket = [
        {
          name: 'charlie-binghams-basket-limit',
          limitProps: {
            value: 1,
            description: 'Only 1 oven ready meal is available per order'
          },
          items: [
            {
              type: 'recipe',core_recipe_id: '3037'
            },
            {
              type: 'recipe',core_recipe_id: '3038'
            },
            {
              type: 'recipe',core_recipe_id: '3039'
            }
          ]
        }
      ]
      recipeId = '3037'
      basketRecipes = Immutable.fromJS({})
    })

    test('should return emptyArray', () => {
      const result = validateRecipeAgainstRule(menuLimitsForBasket, recipeId, basketRecipes)
      expect(result).toEqual([])
    })
  })

  describe('when rules break', () => {
    beforeEach(() => {
      menuLimitsForBasket = [
        {
          name: 'charlie-binghams-basket-limit',
          limitProps: {
            value: 1,
            description: 'Only 1 oven ready meal is available per order'
          },
          items: [
            {
              type: 'recipe',core_recipe_id: '3037'
            },
            {
              type: 'recipe',core_recipe_id: '3038'
            },
            {
              type: 'recipe',core_recipe_id: '3039'
            }
          ]
        },
        {
          name: 'new-rule',
          limitProps: {
            value: 1,
            description: 'Only 1 new-rule meal is available per order'
          },
          items: [
            {
              type: 'recipe',core_recipe_id: '3037'
            },
            {
              type: 'recipe',core_recipe_id: '3038'
            },
            {
              type: 'recipe',core_recipe_id: '3039'
            }
          ]
        }
      ]
      recipeId = '3037'
      basketRecipes = Immutable.fromJS({
        3037: 1
      })
    })

    test('should return broken rules', () => {
      const result = validateRecipeAgainstRule(menuLimitsForBasket, recipeId, basketRecipes)
      expect(result).toEqual([
        {
          items: ['3037'],
          message: 'Only 1 oven ready meal is available per order',
          name: 'charlie-binghams-basket-limit'
        },
        {
          items: ['3037'],
          message: 'Only 1 new-rule meal is available per order',
          name: 'new-rule'
        }
      ])
    })
  })

  describe('when recipe is not in rule break items', () => {
    beforeEach(() => {
      menuLimitsForBasket = [
        {
          name: 'charlie-binghams-basket-limit',
          limitProps: {
            value: 1,
            description: 'Only 1 oven ready meal is available per order'
          },
          items: [
            {
              type: 'recipe',core_recipe_id: '3037'
            },
            {
              type: 'recipe',core_recipe_id: '3038'
            },
            {
              type: 'recipe',core_recipe_id: '3039'
            }
          ]
        }
      ]
      recipeId = '303'
      basketRecipes = Immutable.fromJS({
        3037: 1
      })
    })

    test('should return emptyArray', () => {
      const result = validateRecipeAgainstRule(menuLimitsForBasket, recipeId, basketRecipes)
      expect(result).toEqual([])
    })
  })

  describe('when recipeId is not sent', () => {
    describe('when basket is valid', () => {
      beforeEach(() => {
        menuLimitsForBasket = [
          {
            name: 'charlie-binghams-basket-limit',
            limitProps: {
              value: 1,
              description: 'Only 1 oven ready meal is available per order'
            },
            items: [
              {
                type: 'recipe',core_recipe_id: '3037'
              },
              {
                type: 'recipe',core_recipe_id: '3038'
              },
              {
                type: 'recipe',core_recipe_id: '3039'
              }
            ]
          }
        ]
        basketRecipes = Immutable.fromJS({
          3037: 1
        })
      })
      test('should return emptyArray', () => {
        const result = validateRecipeAgainstRule(menuLimitsForBasket, null, basketRecipes)
        expect(result).toEqual([])
      })
    })

    describe('when basket is NOT valid', () => {
      beforeEach(() => {
        menuLimitsForBasket = [
          {
            name: 'charlie-binghams-basket-limit',
            limitProps: {
              value: 1,
              description: 'Only 1 oven ready meal is available per order'
            },
            items: [
              {
                type: 'recipe',core_recipe_id: '3037'
              },
              {
                type: 'recipe',core_recipe_id: '3038'
              },
              {
                type: 'recipe',core_recipe_id: '3039'
              }
            ]
          }
        ]
        basketRecipes = Immutable.fromJS({
          3037: 1,
          3038: 2
        })
      })

      test('should return broken rules', () => {
        const result = validateRecipeAgainstRule(menuLimitsForBasket, null, basketRecipes)
        expect(result).toEqual([
          {
            items: [ '3037', '3038',],
            message: 'Only 1 oven ready meal is available per order',
            name: 'charlie-binghams-basket-limit',
          }
        ])
      })
    })
  })
})

describe('getIsEnabledRecipeTileFoundation', () => {
  let state
  describe('when feature recipe tile foundation is true in store', () => {
    beforeEach(() => {
      state = {
        menu: Immutable.fromJS({
          features: {
            recipe_tile_foundations: true
          }
        })
      }
    })
    test('should return true', () => {
      expect(getIsEnabledRecipeTileFoundation(state)).toBe(true)
    })
  })

  describe('when feature is not in store', () => {
    beforeEach(() => {
      state = {
        menu: Immutable.fromJS({
          features: {}
        })
      }
    })
    test('should return false', () => {
      expect(getIsEnabledRecipeTileFoundation(state)).toBe(false)
    })
  })
})
