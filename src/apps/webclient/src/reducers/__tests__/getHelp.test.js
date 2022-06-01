import { List, Map, OrderedMap, fromJS } from 'immutable'
import { storeGetHelpOrder, setSelectedAddress } from 'routes/GetHelp/actions/getHelp'
import { actionTypes } from 'routes/GetHelp/actions/actionTypes'
import { actionTypes as webClientActionTypes } from 'actions/actionTypes'
import { fetchOrderIssuesMockResponse } from 'apis/__mocks__/getHelp'
import { getHelp, getHelpInitialState } from 'reducers/getHelp'

const MOCK_ORDERS = [
  {
    id: '101',
    deliveryDate: '2019-09-07 00:00:00',
    deliverySlot: { id: '6', deliveryStart: '08:00:00', deliveryEnd: '19:00:00' },
    recipeItems: [
      {
        id: '43656080',
        recipeGoustoReference: '123',
        recipeId: '4001',
        recipeUuid: '4b77e742-fe81-46b1-ba27-075473ee2e8e',
        productId: null,
      },
      {
        id: '43656081',
        recipeGoustoReference: '456',
        recipeId: '4002',
        recipeUuid: '4b77e742-fe81-46b1-ba27-075473ee2e8f',
        productId: null,
      },
    ],
  },
  {
    id: '102',
    deliveryDate: '2019-09-14 00:00:00',
    deliverySlot: { id: '6', deliveryStart: '08:00:00', deliveryEnd: '19:00:00' },
    recipeItems: [
      {
        id: '43656082',
        recipeGoustoReference: '342',
        recipeId: '4003',
        recipeUuid: '4b77e742-fe81-46b1-ba27-075473ee2e90',
        productId: null,
      },
      {
        id: '43656083',
        recipeGoustoReference: '198',
        recipeId: '4004',
        recipeUuid: '4b77e742-fe81-46b1-ba27-075473ee2e91',
        productId: null,
      },
    ],
  },
]

const ISSUE_REASONS = {
  '1917&bbb': {
    ingredientUuid: 'bbb',
    issueDescription: 'This is my issue...',
    issueId: '101',
    issueName: 'Missing ingredients',
    label: '1 can of chopped tomatoes (210g)',
    recipeId: '1917'
  },
  '1494&bbb': {
    ingredientUuid: 'bbb',
    issueDescription: 'And this is my other issue...',
    issueId: '104',
    issueName: 'Fruit or Veg - Mouldy',
    label: '1 can of chopped tomatoes (210g)',
    recipeId: '1494'
  }
}
const COMPENSATION_AMOUNT = 25
const TOTAL_COMPENSATION_AMOUNT = 30
const COMPENSATION_TYPE = 'credit'

describe('getHelp reducer', () => {
  let newState

  describe('given undefined state', () => {
    beforeEach(() => {
      newState = getHelp(undefined)
    })

    test('getHelp returns default state', () => {
      expect(newState).toBe(getHelpInitialState)
    })
  })

  describe('given the action generated by storeGetHelpOrder is received', () => {
    const ORDER = {
      id: '100',
      recipeIds: ['10', '20', '30'],
      recipeDetailedItems: {
        10: '456',
        20: '123',
        30: '456',
      },
      deliverySlot: {
        deliveryEnd: '18:59:59',
        deliveryStart: '08:00:00',
      },
      deliveryDate: '25-05-21',
    }

    beforeEach(() => {
      newState = getHelp(getHelpInitialState, storeGetHelpOrder(ORDER))
    })

    test('the new state.order has the order stored, renaming recipeIds to recipeItems', () => {
      expect(newState.get('order')).toEqual(Map({
        id: ORDER.id,
        recipeItems: List(ORDER.recipeIds),
        recipeDetailedItems: Map(ORDER.recipeDetailedItems),
        deliverySlot: Map(ORDER.deliverySlot),
        deliveryDate: ORDER.deliveryDate,
      }))
    })
  })

  describe('given the action generated by setSelectedAddress is received', () => {
    const ADDRESS = { id: '1122', name: 'Home' }

    beforeEach(() => {
      newState = getHelp(getHelpInitialState, setSelectedAddress(ADDRESS))
    })

    test('the new state.selectedAddress has the address passed to the action generator', () => {
      expect(newState.get('selectedAddress')).toEqual(Map(ADDRESS))
    })
  })

  describe('given a GET_HELP_STORE_ORDER_ID action is received', () => {
    beforeEach(() => {
      newState = getHelp(getHelpInitialState, {
        type: webClientActionTypes.GET_HELP_STORE_ORDER_ID,
        id: '1234'
      })
    })

    test('the new state.order.id has the value of order id ', () => {
      expect(newState.getIn(['order', 'id'])).toEqual('1234')
    })
  })

  describe('given a GET_HELP_STORE_SELECTED_INGREDIENT_ISSUE action is received', () => {
    const ingredientAndRecipeId = '1096&5c14a222-aa12-4d98-a108-106ca1693363'
    beforeEach(() => {
      newState = getHelp(getHelpInitialState, {
        type: webClientActionTypes.GET_HELP_STORE_SELECTED_INGREDIENT_ISSUE,
        ingredientAndRecipeId,
        issueId: '3',
        issueName: 'Missing Ingredients'
      })
    })

    test('the new state.selectedIngredients has issueId 3', () => {
      expect(newState.getIn(['selectedIngredients', ingredientAndRecipeId, 'issueId']))
        .toEqual('3')
    })

    test('the new state.selectedIngredients has issueName Missing Ingredients', () => {
      expect(newState.getIn(['selectedIngredients', ingredientAndRecipeId, 'issueName']))
        .toEqual('Missing Ingredients')
    })
  })
  describe('given a GET_HELP_FETCH_INGREDIENT_ISSUES action is received', () => {
    beforeEach(() => {
      newState = getHelp(getHelpInitialState, {
        type: webClientActionTypes.GET_HELP_FETCH_INGREDIENT_ISSUES,
        ingredientIssues: fetchOrderIssuesMockResponse,
      })
    })

    test('the new state.ingredientIssues has the right value ', () => {
      expect(newState.get('ingredientIssues')).toEqual(fromJS([
        { id: '101', label: 'Missing ingredients', requireDescription: false },
        { id: '102', label: 'Wrong ingredients', requireDescription: false }
      ]))
    })

    test('the new state.ingredientSubIssues has the right value ', () => {
      expect(newState.get('ingredientSubIssues')).toEqual(fromJS([
        { id: '104', label: 'Fruit or Veg - Mouldy', groupLabel: 'Ingredient quality', requireDescription: true },
        { id: '105', label: 'Fruit or Veg - not fresh', groupLabel: 'Ingredient quality', requireDescription: false },
        { id: '107', label: 'Meat - gristle or bones', groupLabel: 'Another group', requireDescription: true }
      ]))
    })
  })

  describe('given a GET_HELP_LOAD_ORDERS action type is received', () => {
    beforeEach(() => {
      newState = getHelp(getHelpInitialState, {
        type: actionTypes.GET_HELP_LOAD_ORDERS,
        orders: MOCK_ORDERS
      })
    })

    test('the new state.orders has the orders of the action stored', () => {
      const EXPECTED_REDUCED_ORDERS = OrderedMap({
        101: Map({
          deliveryDate: '2019-09-07 00:00:00',
          deliverySlot: Map({ deliveryEnd: '19:00:00', deliveryStart: '08:00:00' }),
          id: '101',
          recipeIds: List(['4001', '4002']),
          recipeDetailedItems: Map({
            4001: '123',
            4002: '456',
          }),
        }),
        102: Map({
          deliveryDate: '2019-09-14 00:00:00',
          deliverySlot: Map({ deliveryEnd: '19:00:00', deliveryStart: '08:00:00' }),
          id: '102',
          recipeIds: List(['4003', '4004']),
          recipeDetailedItems: Map({
            4003: '342',
            4004: '198',
          }),
        }),
      })
      expect(newState.get('orders')).toEqual(EXPECTED_REDUCED_ORDERS)
    })
  })

  describe('given a GET_HELP_STORE_SELECTED_INGREDIENTS action type is received', () => {
    beforeEach(() => {
      const state = fromJS({
        ...getHelpInitialState.toJS(),
        order: {
          recipeDetailedItems: {
            2: '4'
          }
        }
      })

      newState = getHelp(state, {
        type: webClientActionTypes.GET_HELP_STORE_SELECTED_INGREDIENTS,
        selectedIngredientsInfo: [{ ingredientUuid: '2222', label: 'pasta', recipeId: '2' }]
      })
    })

    test('the new state.order.id has the value of order id ', () => {
      expect(newState.get('selectedIngredients')).toEqual(fromJS({
        '2&2222': {
          ingredientUuid: '2222',
          label: 'pasta',
          recipeId: '2',
          recipeGoustoReference: '4'
        }
      }))
    })
  })

  describe('given a GET_HELP_STORE_INGREDIENT_ISSUE_REASONS action type', () => {
    beforeEach(() => {
      newState = getHelp(getHelpInitialState, {
        type: webClientActionTypes.GET_HELP_STORE_INGREDIENT_ISSUE_REASONS,
        issueReasons: ISSUE_REASONS
      })
    })
    test('the newState selectedIngredients has the new issueReasons', () => {
      expect(newState.get('selectedIngredients')).toEqual(fromJS(ISSUE_REASONS))
    })
  })

  describe('given an action with type GET_HELP_LOAD_ORDERS_BY_ID is received', () => {
    beforeEach(() => {
      newState = getHelp(getHelpInitialState, {
        type: webClientActionTypes.GET_HELP_LOAD_ORDERS_BY_ID,
        payload: { order: MOCK_ORDERS[0] },
      })
    })

    test('the new state.order has the order of the action stored', () => {
      const EXPECTED_REDUCED_ORDER = fromJS({
        deliverySlot: {
          deliveryStart: '08:00:00',
          deliveryEnd: '19:00:00' ,
        },
        id: '',
        recipeDetailedItems: { 4001: '123', 4002: '456' },
        recipeItems: ['4001', '4002'],
        deliveryDate: '2019-09-07 00:00:00',
        trackingUrl: '',
        hasPassedDeliveryValidation: false,
        deliveryCompensationAmount: null,
        shippingAddress: null,
      })
      expect(newState.get('order')).toEqual(EXPECTED_REDUCED_ORDER)
    })
  })

  describe('given an action with type GET_HELP_LOAD_ORDERS_BY_ID is received with no order', () => {
    beforeEach(() => {
      newState = getHelp(getHelpInitialState, {
        type: webClientActionTypes.GET_HELP_LOAD_ORDERS_BY_ID,
        payload: {},
      })
    })

    test('the new state is getHelpInitialState', () => {
      expect(newState).toEqual(getHelpInitialState)
    })
  })

  describe('given an action with type GET_HELP_LOAD_ORDER_AND_RECIPES_BY_IDS is received', () => {
    const SHIPPING_ADDRESS = {
      name: 'New Home',
      postcode: 'W5 1AA',
      town: 'London',
      id: '56731083',
      line1: 'Gousto Shepherds Building',
      line2: 'Unit 1.8/1.9',
      line3: 'Charecroft Way',
      shippingDefault: true
    }
    const FETCH_ORDER_RESPONSE = {
      data: {
        recipeItems: ['2871', '1783'],
        deliveryDate: '2021-05-01 00:00:00',
        deliverySlot: {
          deliveryEnd: '18:59:59',
          deliveryStart: '08:00:00',
        },
        shippingAddress: { ...SHIPPING_ADDRESS, irrelevantField: 'irrelevant' },
      }
    }
    const RECIPES = [
      {
        id: '2871',
        title: 'Cheesy Pizza-Topped Chicken With Mixed Salad',
        ingredients: [
          { uuid: '3139eeba-c3a1-477c-87e6-50ba5c3d21e0',
            label: '1 shallot',
            urls: [{
              url: 'ingredient-shallot-image-url',
              width: 50
            }]
          },
          { uuid: 'd93301c4-2563-4b9d-b829-991800ca87b4',
            label: 'mozzarella',
            urls: [{
              url: 'ingredient-mozzarella-image-url',
              width: 50
            }]
          },
        ],
        goustoReference: '2145',
      },
      {
        id: '1783',
        title: 'Sesame Tofu Nuggets, Wedges & Spicy Dipping Sauce',
        ingredients: [
          { uuid: 'f0273bb0-bb2b-46e5-8ce4-7e09f413c97b',
            label: '1 spring onion',
            urls: [{
              url: 'ingredient-onion-image-url',
              width: 50
            }]
          },
          { uuid: '4cd305c4-d372-4d9f-8110-dae88209ce57',
            label: '1 carrot',
            urls: [{
              url: 'ingredient-carrot-image-url',
              width: 50
            }]
          },
        ],
        goustoReference: '5678',
      },
    ]

    beforeEach(() => {
      newState = getHelp(getHelpInitialState, {
        type: actionTypes.GET_HELP_LOAD_ORDER_AND_RECIPES_BY_IDS,
        payload: { order: FETCH_ORDER_RESPONSE.data, recipes: RECIPES },
      })
    })

    test('the new state.order has the order of the action stored', () => {
      const EXPECTED_REDUCED_ORDER = fromJS({
        deliverySlot: {
          deliveryStart: '08:00:00',
          deliveryEnd: '18:59:59',
        },
        id: '',
        recipeDetailedItems: { 2871: '2145', 1783: '5678' },
        recipeItems: ['2871', '1783'],
        deliveryDate: '2021-05-01 00:00:00',
        shippingAddress: SHIPPING_ADDRESS,
        trackingUrl: '',
        hasPassedDeliveryValidation: false,
        deliveryCompensationAmount: null,
      })
      expect(newState.get('order')).toEqual(EXPECTED_REDUCED_ORDER)
    })

    test('the new state.recipes has the recipes of the action stored', () => {
      expect(newState.get('recipes')).toEqual(fromJS(RECIPES))
    })
  })

  describe('given an action with type GET_HELP_LOAD_TRACKING_URL is received', () => {
    const TRACKING_URL = 'https://nice-courier.com/order/12345'

    beforeEach(() => {
      newState = getHelp(getHelpInitialState, {
        type: actionTypes.GET_HELP_LOAD_TRACKING_URL,
        payload: {
          trackingUrl: TRACKING_URL,
        }
      })
    })

    test('the tracking url in the action payload is stored in the new state.order.trackingUrl', () => {
      expect(newState.getIn(['order', 'trackingUrl']))
        .toEqual(TRACKING_URL)
    })
  })

  describe('given an action with type GET_HELP_VALIDATE_DELIVERY is received', () => {
    beforeEach(() => {
      newState = getHelp(getHelpInitialState, {
        type: actionTypes.GET_HELP_VALIDATE_DELIVERY,
        payload: {
          compensation: COMPENSATION_AMOUNT,
          isValid: true,
        }
      })
    })

    test('the status of delivery validation check in the action payload is stored in the new state.order.hasPassedDeliveryValidation', () => {
      expect(newState.getIn(['order', 'hasPassedDeliveryValidation']))
        .toEqual(true)
    })

    test('the delivery compensation amount is stored in the new state.order.deliveryCompensationAmount', () => {
      expect(newState.getIn(['order', 'deliveryCompensationAmount']))
        .toEqual(COMPENSATION_AMOUNT)
    })

    test('the delivery compensation amount is stored in the new state.compensation.amount', () => {
      expect(newState.getIn(['compensation', 'amount']))
        .toEqual(COMPENSATION_AMOUNT)
    })
  })

  describe('given an action with type GET_HELP_VALIDATE_ORDER is received', () => {
    describe('when there is a payload', () => {
      const NUM_ORDERS_CHECKED = 4
      const NUM_ORDERS_COMPENSATED = 1
      const PREVIOUS_ISSUES = [
        {
          ingredientUuid: '44417cd2-bdb0-48e2-b6a3-b75bdd8ba6b7',
          recipeGoustoReference: '4061',
          issueType: 'other_issue'
        },
        {
          ingredientUuid: '528742df-d65f-45ca-b542-25bb77ac7461',
          recipeGoustoReference: '4061',
          issueType: 'other_issue'
        },
        {
          ingredientUuid: '7893dfhgjk-204c-4ded-9dac-12df03f265d6',
          recipeGoustoReference: '4062',
          issueType: 'other_issue'
        },
        {
          ingredientUuid: '4e949ce8-d92c-43fa-8c0d-110d903d6e60',
          recipeGoustoReference: '4063',
          issueType: 'mass_issue'
        },
      ]

      const MASS_ISSUE_INELIGIBLE_INGRS_BY_RECIPE_GR_MAP = {
        4063: ['4e949ce8-d92c-43fa-8c0d-110d903d6e60']
      }

      const OTHER_ISSUE_INELIGIBLE_INGRS_BY_RECIPE_GR_MAP = {
        4061: [
          '44417cd2-bdb0-48e2-b6a3-b75bdd8ba6b7',
          '528742df-d65f-45ca-b542-25bb77ac7461'
        ],
        4062: ['7893dfhgjk-204c-4ded-9dac-12df03f265d6']
      }

      beforeEach(() => {
        newState = getHelp(getHelpInitialState, {
          type: webClientActionTypes.GET_HELP_VALIDATE_ORDER,
          previousIssues: PREVIOUS_ISSUES,
          numOrdersChecked: NUM_ORDERS_CHECKED,
          numOrdersCompensated: NUM_ORDERS_COMPENSATED,
        })
      })

      test('recipeGoustoReference is used as a key for ineligible ingriend uuids', () => {
        const ineligibleIngredientUuids = [
          ...Object.keys(MASS_ISSUE_INELIGIBLE_INGRS_BY_RECIPE_GR_MAP),
          ...Object.keys(OTHER_ISSUE_INELIGIBLE_INGRS_BY_RECIPE_GR_MAP),
        ].sort()

        const previousIssuesIngredientUuids = PREVIOUS_ISSUES.map(issue => issue.recipeGoustoReference)
        const uniquePreviousIssuesIngredientUuids = [...new Set(previousIssuesIngredientUuids)].sort()
        expect(ineligibleIngredientUuids).toEqual(uniquePreviousIssuesIngredientUuids)
      })

      test('massIssueIneligibleIngrsByRecipeGRMap state is set as that payload', () => {
        expect(newState.get('massIssueIneligibleIngrsByRecipeGRMap').toJS()).toEqual(MASS_ISSUE_INELIGIBLE_INGRS_BY_RECIPE_GR_MAP)
      })

      test('otherIssueIneligibleIngrsByRecipeGRMap state is set as that payload', () => {
        expect(newState.get('otherIssueIneligibleIngrsByRecipeGRMap').toJS()).toEqual(OTHER_ISSUE_INELIGIBLE_INGRS_BY_RECIPE_GR_MAP)
      })

      test('numOrdersChecked state is set as that payload', () => {
        expect(newState.get('numOrdersChecked')).toEqual(NUM_ORDERS_CHECKED)
      })

      test('numOrdersCompensated state is set as that payload', () => {
        expect(newState.get('numOrdersCompensated')).toEqual(NUM_ORDERS_COMPENSATED)
      })
    })
  })

  describe('given an action with type GET_HELP_CREATE_COMPLAINT is received', () => {
    let IS_AUTO_ACCEPT

    beforeEach(() => {
      IS_AUTO_ACCEPT = 'true or false'

      newState = getHelp(getHelpInitialState, {
        type: actionTypes.GET_HELP_LOAD_REFUND_AMOUNT,
        payload: {
          amount: COMPENSATION_AMOUNT,
          totalAmount: TOTAL_COMPENSATION_AMOUNT,
          isAutoAccept: IS_AUTO_ACCEPT,
          type: COMPENSATION_TYPE,
        },
      })
    })

    test('the new state has correct properties stored', () => {
      expect(newState.get('isAutoAccept')).toBe(IS_AUTO_ACCEPT)
      expect(newState.getIn(['compensation', 'amount'])).toEqual(COMPENSATION_AMOUNT)
      expect(newState.getIn(['compensation', 'totalAmount'])).toEqual(TOTAL_COMPENSATION_AMOUNT)
      expect(newState.getIn(['compensation', 'type'])).toEqual(COMPENSATION_TYPE)
    })
  })

  describe('given an action with type GET_HELP_HAS_SEEN_REPETITIVE_ISSUES is received', () => {
    let HAS_SEEN_REPETITIVE_ISSUES_SCREEN

    beforeEach(() => {
      HAS_SEEN_REPETITIVE_ISSUES_SCREEN = 'true or false'

      newState = getHelp(getHelpInitialState, {
        type: actionTypes.GET_HELP_HAS_SEEN_REPETITIVE_ISSUES,
        hasSeenRepetitiveIssuesScreen: HAS_SEEN_REPETITIVE_ISSUES_SCREEN
      })
    })

    test('the new state has correct properties stored', () => {
      expect(newState.get('hasSeenRepetitiveIssuesScreen')).toBe(HAS_SEEN_REPETITIVE_ISSUES_SCREEN)
    })
  })

  describe('given an action with type GET_HELP_LOAD_SHIPPING_ADDRESSES is received', () => {
    const ADDRESSES = [
      {
        id: '1',
        line1: 'Flat 6',
        line2: '8 Some Road',
        line3: '',
        name: 'New Home',
        postcode: 'W5 3PB',
        town: 'London',
        shippingDefault: true,
        irrelevantField: 'some-value',
      },
      {
        id: '2',
        line1: 'Flat 7',
        line2: '9 Some Road',
        line3: '',
        name: 'New Home',
        postcode: 'W5 3PB',
        town: 'London',
        shippingDefault: false,
        irrelevantField: 'some-value',
      },
    ]

    beforeEach(() => {
      newState = getHelp(getHelpInitialState, {
        type: actionTypes.GET_HELP_LOAD_SHIPPING_ADDRESSES,
        payload: {
          userAddresses: ADDRESSES,
          selectedAddress: ADDRESSES[0]
        },
      })
    })

    test('the new state has the relevant addresses fields', () => {
      const FILTERED_ADDRESSES = [
        {
          id: '1',
          line1: 'Flat 6',
          line2: '8 Some Road',
          line3: '',
          name: 'New Home',
          postcode: 'W5 3PB',
          town: 'London',
          shippingDefault: true,
        },
        {
          id: '2',
          line1: 'Flat 7',
          line2: '9 Some Road',
          line3: '',
          name: 'New Home',
          postcode: 'W5 3PB',
          town: 'London',
          shippingDefault: false,
        },
      ]
      expect(newState.get('shippingAddresses').toJS()).toEqual(FILTERED_ADDRESSES)
      expect(newState.get('selectedAddress').toJS()).toEqual(FILTERED_ADDRESSES[0])
    })
  })

  describe('given an action with type GET_HELP_SET_SELECTED_RECIPE_CARDS is received', () => {
    const recipeIds = ['123', '456']

    beforeEach(() => {
      newState = getHelp(getHelpInitialState, {
        type: actionTypes.GET_HELP_SET_SELECTED_RECIPE_CARDS,
        payload: {
          recipeIds
        }
      })
    })

    test('the new state has correct properties stored', () => {
      expect(newState.get('selectedRecipeCards')).toEqual(fromJS(recipeIds))
    })
  })

  describe('given an action with type GET_HELP_SET_SELECTED_RECIPE_CARDS_ISSUES is received', () => {
    const issues = [{ coreId: '111' }, { coreId: '222' }]

    beforeEach(() => {
      newState = getHelp(getHelpInitialState, {
        type: actionTypes.GET_HELP_SET_SELECTED_RECIPE_CARDS_ISSUES,
        payload: {
          issues
        }
      })
    })

    test('the new state has issues from the payload stored', () => {
      expect(newState.get('selectedRecipeCardIssues')).toEqual(fromJS(issues))
    })
  })

  describe('given an action with type GET_HELP_CHECK_RECIPE_CARDS_ELIGIBILITY is received', () => {
    const eligibleCoreRecipeIds = ['111', '333']

    beforeEach(() => {
      newState = getHelp(
        getHelpInitialState.set('recipes', fromJS([
          { id: '111' },
          { id: '222' },
          { id: '333' },
        ])),
        {
          type: actionTypes.GET_HELP_CHECK_RECIPE_CARDS_ELIGIBILITY,
          payload: {
            eligibleCoreRecipeIds
          }
        }
      )
    })

    test('the new state has the recipe card eligibility in each recipe', () => {
      expect(newState.get('recipes').toJS()).toEqual([
        { id: '111', isRecipeCardEligible: true },
        { id: '222', isRecipeCardEligible: false },
        { id: '333', isRecipeCardEligible: true },
      ])
    })
  })

  describe('given an unknown action type is received', () => {
    beforeEach(() => {
      newState = getHelp(getHelpInitialState, {
        type: 'UNKNOWN'
      })
    })

    test('newState should be the getHelpInitialState', () => {
      expect(newState).toEqual(getHelpInitialState)
    })
  })
})
