import Immutable from 'immutable'

import {
  activeMenuForDate,
  getMenuLimitsForBasket,
  validateMenuLimitsForBasket,
  getCurrentMenuRecipes,
  getActiveMenuIdForOrderDate,
  isMenuLoading,
  getCategoryIdForVariants,
} from '../menu'

describe('getCurrentMenuRecipes', () => {
  test('should return only recipes in the current menu', () => {
    const allRecipes = Immutable.fromJS({
      recipeId1: { desc: 'recipe1Desc' },
      recipeId2: { desc: 'recipe2Desc' },
    })
    const currentMenuIds = ['recipeId1']
    const result = getCurrentMenuRecipes.resultFunc(allRecipes, currentMenuIds)
    expect(result).toEqual([Immutable.fromJS({ desc: 'recipe1Desc' })])
  })
})

describe('activeMenuForDate', () => {
  test('should get the active menu for a date that is before the first menus end_at', () => {
    const testData = {
      data: [
        {
          id: '295',
          type: 'menus',
          attributes: {
            ends_at: '2019-04-03T11:59:59+01:00',
          },
        },
        {
          id: '296',
          type: 'menus',
          attributes: {
            ends_at: '2019-10-20T11:59:59+01:00',
          },
        },
      ],
    }
    const result = activeMenuForDate(testData, '2019-04-01T11:59:59+01:00')
    expect(result).toEqual({
      id: '295',
      type: 'menus',
      attributes: {
        ends_at: '2019-04-03T11:59:59+01:00',
      },
    })
  })

  test('should get the active menu for a date that is after the first menus end_at', () => {
    const testData = {
      data: [
        {
          id: '295',
          type: 'menus',
          attributes: {
            ends_at: '2019-04-03T11:59:59+01:00',
          },
        },
        {
          id: '296',
          type: 'menus',
          attributes: {
            ends_at: '2019-10-20T11:59:59+01:00',
          },
        },
      ],
    }
    const result = activeMenuForDate(testData, '2019-06-13T11:59:59+01:00')
    expect(result).toEqual({
      id: '296',
      type: 'menus',
      attributes: {
        ends_at: '2019-10-20T11:59:59+01:00',
      },
    })
  })

  test('should get the active menu for a date that is just after the first menus end_at', () => {
    const testData = {
      data: [
        {
          id: '295',
          type: 'menus',
          attributes: {
            ends_at: '2019-04-03T11:59:59+01:00',
          },
        },
        {
          id: '296',
          type: 'menus',
          attributes: {
            ends_at: '2019-10-20T11:59:59+01:00',
          },
        },
      ],
    }
    const result = activeMenuForDate(testData, '2019-04-03T12:00:00+01:00')
    expect(result).toEqual({
      id: '296',
      type: 'menus',
      attributes: {
        ends_at: '2019-10-20T11:59:59+01:00',
      },
    })
  })

  test('should get the first menu if no date is passed in', () => {
    const testData = {
      data: [
        {
          id: '295',
          type: 'menus',
          attributes: {
            ends_at: '2019-04-03T11:59:59+01:00',
          },
        },
        {
          id: '296',
          type: 'menus',
          attributes: {
            ends_at: '2019-10-20T11:59:59+01:00',
          },
        },
      ],
    }
    const result = activeMenuForDate(testData, null)
    expect(result).toEqual({
      id: '295',
      type: 'menus',
      attributes: {
        ends_at: '2019-04-03T11:59:59+01:00',
      },
    })
  })

  test('should return undefined for a date that is just after the second menus end_at', () => {
    const testData = {
      data: [
        {
          id: '295',
          type: 'menus',
          attributes: {
            ends_at: '2019-04-03T11:59:59+01:00',
          },
        },
        {
          id: '296',
          type: 'menus',
          attributes: {
            ends_at: '2019-10-20T11:59:59+01:00',
          },
        },
      ],
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
        data: [
          {
            id: '999',
            type: 'menus',
            attributes: {
              ends_at: '2100-04-03T11:59:59+01:00',
            },
          },
        ],
      }
      const result = activeMenuForDate(testData, '2019-10-25T12:00:00+01:000')
      expect(result.id).toEqual('999')
    })
  })
})

describe('getActiveMenuIdForOrderDate', () => {
  test('should get the active menu id for a date that is before the first menus end_at', () => {
    const testData = [
      {
        id: '295',
        type: 'menus',
        attributes: {
          ends_at: '2019-04-03T11:59:59+01:00',
        },
      },
      {
        id: '296',
        type: 'menus',
        attributes: {
          ends_at: '2019-10-20T11:59:59+01:00',
        },
      },
    ]

    const result = getActiveMenuIdForOrderDate(null, {
      menus: testData,
      cutoffDate: '2019-04-01T11:59:59+01:00',
    })
    expect(result).toEqual('295')
  })

  test('should get the active menu id for a date that is after the first menus end_at', () => {
    const testData = [
      {
        id: '295',
        type: 'menus',
        attributes: {
          ends_at: '2019-04-03T11:59:59+01:00',
        },
      },
      {
        id: '296',
        type: 'menus',
        attributes: {
          ends_at: '2019-10-20T11:59:59+01:00',
        },
      },
    ]

    const result = getActiveMenuIdForOrderDate(null, {
      menus: testData,
      cutoffDate: '2019-06-13T11:59:59+01:00',
    })
    expect(result).toEqual('296')
  })

  test('should get the active menu id for a date that is just after the first menus end_at', () => {
    const testData = [
      {
        id: '295',
        type: 'menus',
        attributes: {
          ends_at: '2019-04-03T11:59:59+01:00',
        },
      },
      {
        id: '296',
        type: 'menus',
        attributes: {
          ends_at: '2019-10-20T11:59:59+01:00',
        },
      },
    ]

    const result = getActiveMenuIdForOrderDate(null, {
      menus: testData,
      cutoffDate: '2019-04-03T12:00:00+01:00',
    })
    expect(result).toEqual('296')
  })

  test('should return undefined if no date is passed in', () => {
    const testData = [
      {
        id: '295',
        type: 'menus',
        attributes: {
          ends_at: '2019-04-03T11:59:59+01:00',
        },
      },
      {
        id: '296',
        type: 'menus',
        attributes: {
          ends_at: '2019-10-20T11:59:59+01:00',
        },
      },
    ]

    const result = getActiveMenuIdForOrderDate(null, { menus: testData, cutoffDate: null })
    expect(result).toEqual(undefined)
  })

  test('should return undefined for a date that is just after the second menus end_at', () => {
    const testData = [
      {
        id: '295',
        type: 'menus',
        attributes: {
          ends_at: '2019-04-03T11:59:59+01:00',
        },
      },
      {
        id: '296',
        type: 'menus',
        attributes: {
          ends_at: '2019-10-20T11:59:59+01:00',
        },
      },
    ]

    const result = getActiveMenuIdForOrderDate(testData, '2019-10-25T12:00:00+01:000')
    expect(result).toEqual(undefined)
  })

  describe('when no menuServiceData', () => {
    test('should return empty object', () => {
      const testData = []
      const result = getActiveMenuIdForOrderDate(null, {
        menus: testData,
        cutoffDate: '2019-10-25T12:00:00+01:000',
      })
      expect(result).toEqual(undefined)
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
          numPortions: 2,
        }),
        menu: Immutable.Map({
          menuLimits: {
            340: {
              limits: [
                {
                  name: 'rule-name',
                  rules: {
                    per2: {
                      value: 1,
                      description: 'per2',
                    },
                    per4: {
                      value: 1,
                      description: 'per4',
                    },
                  },
                  items: [
                    {
                      type: 'recipe',
                      core_recipe_id: '12345',
                    },
                  ],
                },
              ],
            },
          },
        }),
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
              core_recipe_id: '12345',
            },
          ],
        },
      ]
      expect(result).toEqual(expectedResult)
    })
  })

  describe('when current menu does NOT have limits', () => {
    beforeEach(() => {
      state = {
        basket: Immutable.fromJS({
          currentMenuId: '340',
          numPortions: 2,
        }),
        menu: Immutable.Map({
          menuLimits: {
            340: {
              limits: [],
            },
          },
        }),
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
          numPortions: 4,
        }),
        menu: Immutable.Map({
          menuLimits: {
            340: {
              limits: [
                {
                  name: 'rule-name',
                  rules: {
                    per2: {
                      value: 1,
                      description: 'per2',
                    },
                    per4: {
                      value: 2,
                      description: 'per4',
                    },
                  },
                  items: [
                    {
                      type: 'recipe',
                      core_recipe_id: '12345',
                    },
                  ],
                },
              ],
            },
          },
        }),
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
              core_recipe_id: '12345',
            },
          ],
        },
      ]
      expect(result).toEqual(expectedResult)
    })
  })
})

describe('validateMenuLimitsForBasket', () => {
  const createState = ({ recipes = {} }) => ({
    basket: Immutable.fromJS({
      currentMenuId: '340',
      numPortions: 2,
      recipes: Immutable.fromJS(recipes),
    }),
    menu: Immutable.Map({
      menuLimits: {
        340: {
          limits: [
            {
              name: 'charlie-binghams-basket-limit',
              rules: {
                per2: {
                  value: 1,
                  description: 'Only 1 oven ready meal is available per order',
                },
                per4: {
                  value: 1,
                  description: 'Only 1 oven ready meal is available per order',
                },
              },
              items: [
                {
                  type: 'recipe',
                  core_recipe_id: '3037',
                },
                {
                  type: 'recipe',
                  core_recipe_id: '3038',
                },
              ],
            },
            {
              name: 'new-rule',
              rules: {
                per2: {
                  value: 1,
                  description: 'Only 1 new-rule meal is available per order',
                },
                per4: {
                  value: 1,
                  description: 'Only 1 new-rule meal is available per order',
                },
              },
              items: [
                {
                  type: 'recipe',
                  core_recipe_id: '3037',
                },
              ],
            },
          ],
        },
      },
    }),
  })

  describe('when no recipes in basket', () => {
    test('should return emptyArray', () => {
      const state = createState({})
      const recipeId = '12343'

      const validationRules = validateMenuLimitsForBasket(state, recipeId)

      expect(validationRules).toEqual([])
    })
  })

  describe('when rules break', () => {
    beforeEach(() => {})

    test('should return broken rules', () => {
      const state = createState({ recipes: { 3037: 1 } })
      const recipeId = '3037'

      const validationRules = validateMenuLimitsForBasket(state, recipeId)

      expect(validationRules).toEqual([
        {
          items: ['3037'],
          message: 'Only 1 oven ready meal is available per order',
          name: 'charlie-binghams-basket-limit',
        },
        {
          items: ['3037'],
          message: 'Only 1 new-rule meal is available per order',
          name: 'new-rule',
        },
      ])
    })
  })

  describe('when recipe is not in rule break items', () => {
    test('should return emptyArray', () => {
      const state = createState({
        recipes: Immutable.fromJS({
          3037: 1,
        }),
      })
      const recipeId = '303'

      const validationRules = validateMenuLimitsForBasket(state, recipeId)

      expect(validationRules).toEqual([])
    })
  })

  describe('when recipeId is not sent', () => {
    describe('when basket is valid', () => {
      test('should return emptyArray', () => {
        const state = createState({
          recipes: Immutable.fromJS({
            3037: 1,
          }),
        })

        const validationRules = validateMenuLimitsForBasket(state)

        expect(validationRules).toEqual([])
      })
    })

    describe('when basket is NOT valid', () => {
      test('should return broken rules', () => {
        const state = createState({
          recipes: Immutable.fromJS({
            3037: 1,
            3038: 1,
          }),
        })

        const validationRules = validateMenuLimitsForBasket(state)

        expect(validationRules).toEqual([
          {
            items: ['3037', '3038'],
            message: 'Only 1 oven ready meal is available per order',
            name: 'charlie-binghams-basket-limit',
          },
        ])
      })
    })
  })
})

describe('isMenuLoading', () => {
  describe.each`
    boxSummaryShow | menuBrowseCTAShow | menuLoading | isOptimizelyLoading | forceLoad | expected | description
    ${false}       | ${false}          | ${true}     | ${false}            | ${false}  | ${true}  | ${'menu is loading and overlay is not shown'}
    ${false}       | ${false}          | ${false}    | ${true}             | ${false}  | ${true}  | ${'optimizely is loading and overlay is not shown'}
    ${true}        | ${false}          | ${true}     | ${false}            | ${false}  | ${false} | ${'overlay is shown'}
    ${false}       | ${true}           | ${false}    | ${true}             | ${false}  | ${false} | ${'overlay is shown'}
    ${false}       | ${false}          | ${false}    | ${false}            | ${true}   | ${true}  | ${'force load is true'}
    ${false}       | ${false}          | ${false}    | ${false}            | ${false}  | ${false} | ${'menu is not loading'}
  `(
    'Given $description',
    ({
      boxSummaryShow,
      menuBrowseCTAShow,
      menuLoading,
      isOptimizelyLoading,
      forceLoad,
      expected,
    }) => {
      it(`returns ${expected}`, () => {
        expect(
          isMenuLoading.resultFunc(
            boxSummaryShow,
            menuBrowseCTAShow,
            menuLoading,
            isOptimizelyLoading,
            forceLoad,
          ),
        ).toBe(expected)
      })
    },
  )
})

describe('getCategoryIdForVariants', () => {
  let state
  beforeEach(() => {
    state = {
      menuRecipeDetails: Immutable.fromJS({
        categoryId: 'category-for-detail-screen',
      }),
    }
  })
  describe('when isOnDetailScreen is true', () => {
    test('should return categoryId from menuRecipeDetails', () => {
      const result = getCategoryIdForVariants(state, { isOnDetailScreen: true })
      expect(result).toEqual('category-for-detail-screen')
    })
  })

  describe('when isOnDetailScreen is false', () => {
    test('should return categoryId from props', () => {
      const result = getCategoryIdForVariants(state, {
        isOnDetailScreen: false,
        categoryId: 'category-from-props',
      })
      expect(result).toEqual('category-from-props')
    })
  })
})
