import Immutable from 'immutable'
import { getOutOfStockRecipes, getFeaturedRecipes, getRemainingRecipes, getSortedRecipes } from 'routes/Menu/selectors/sorting.js'

describe('sorting', () => {
  describe('getOutOfStockRecipes', () => {
    test('getOutOfStockRecipes in browse mode', () => {
      const state = {
        auth: Immutable.Map({
          isAdmin: false,
        }),
        basket: Immutable.fromJS({
          recipes: Immutable.Map({}),
          numPortions: 2,
        }),
        filters: Immutable.Map({
          currentCollectionId: 'ca8f71be',
          totalTime: '0',
          dietTypes: Immutable.Set([]),
          dietaryAttributes: Immutable.Set([]),
        }),
        recipes: Immutable.fromJS({
          327: {
            id: '327',
          },
          1589: {
            id: '1589',
          },
        }),
        menuCollectionRecipes: Immutable.fromJS({
          ca8f71be: ['327', '1589'],
          '70c28cb0': ['929', '1651'],
        }),
        menuCollections: Immutable.fromJS({
          ca8f71be: {
            default: true,
            id: 'ca8f71be',
          },
          '70c28cb0': {
            defult: false,
            id: '70c28cb0',
          },
        }),
        menuRecipeStock: Immutable.fromJS({
          327: {
            2: null,
            4: null,
            8: 0,
          },
          1589: {
            2: null,
            4: null,
            8: 0,
          },
        }),
      }

      expect(getOutOfStockRecipes(state)).toEqual(Immutable.List([]))
    })

    test('getOutOfStockRecipes when date selected', () => {
      const state = {
        auth: Immutable.Map({
          isAdmin: false,
        }),
        basket: Immutable.fromJS({
          recipes: Immutable.Map({}),
          numPortions: 2,
          date: '2018-07-13',
          prevDate: '',
          slotId: 'db015db8',
          prevSlotId: '',
        }),
        boxSummaryDeliveryDays: Immutable.fromJS({
          '2018-07-13': {
            id: '83228a25',
            date: '2018-06-29',
            slots: [
              {
                whenCutoff: '2018-06-29T11:59:59+01:00',
                id: 'db015db8',
                dayId: '83228a25',
                cutoffDay: 2,
                isDefault: true,
              },
            ],
          },
        }),
        filters: Immutable.Map({
          currentCollectionId: 'ca8f71be',
          totalTime: '0',
          dietTypes: Immutable.Set([]),
          dietaryAttributes: Immutable.Set([]),
        }),
        menuCutoffUntil: '2018-07-10T11:59:59+01:00',
        recipes: Immutable.fromJS({
          327: {
            id: '327',
          },
          1589: {
            id: '1589',
          },
          929: {
            id: '929',
          },
          1651: {
            id: '1651',
          },
        }),
        menuCollectionRecipes: Immutable.fromJS({
          ca8f71be: ['327', '1589'],
          '70c28cb0': ['929', '1651'],
        }),
        menuCollections: Immutable.fromJS({
          ca8f71be: {
            default: true,
            id: 'ca8f71be',
          },
          '70c28cb0': {
            defult: false,
            id: '70c28cb0',
          },
        }),
        menuRecipeStock: Immutable.fromJS({
          327: {
            2: 50,
            4: 2,
            8: 0,
          },
          1589: {
            2: 0,
            4: 0,
            8: 0,
          },
        }),
        temp: Immutable.Map({}),
      }
      expect(getOutOfStockRecipes(state)).toEqual(Immutable.fromJS([
        Immutable.fromJS({
          id: '1589',
        }),
      ]))
    })
  })

  describe('getFeaturedRecipes', () => {
    const state = {
      auth: Immutable.Map({
        isAdmin: false,
      }),
      basket: Immutable.fromJS({
        recipes: Immutable.Map({}),
        numPortions: 2,
        date: '2018-07-13',
        prevDate: '',
        slotId: 'db015db8',
        prevSlotId: '',
      }),
      filters: Immutable.Map({
        currentCollectionId: 'ca8f71be',
        totalTime: '0',
        dietTypes: Immutable.Set([]),
        dietaryAttributes: Immutable.Set([]),
      }),
      recipes: Immutable.fromJS({
        327: {
          id: '327',
          isRecommended: false,
          availability: Immutable.fromJS([
            {
              id: '123abc',
              from: '2018-07-09T13:00:00+01:00',
              until: '2018-07-17T11:59:59+01:00',
              featured: true,
            },
          ]),
        },
        1589: {
          id: '1589',
          isRecommended: false,
          availability: Immutable.fromJS([
            {
              id: '123abd',
              from: '2018-07-10T10:00:00+01:00',
              until: '2018-07-17T11:59:59+01:00',
              featured: false,
            },
          ]),
        },
      }),
      menuCollectionRecipes: Immutable.fromJS({
        ca8f71be: ['327', '1589'],
      }),
      menuCollections: Immutable.fromJS({
        ca8f71be: {
          default: true,
          id: 'ca8f71be',
        },
      }),
      menuRecipeStock: Immutable.fromJS({
        327: {
          2: 50,
          4: 2,
          8: 0,
        },
        1589: {
          2: 50,
          4: 2,
          8: 0,
        },
      }),
      menuRecieveMenuPending: false,
      temp: Immutable.fromJS({}),
      menuCutoffUntil: '2018-07-10T11:59:59+01:00',
    }

    test('get featured recipes when menu date selected', () => {
      const expectedResult = Immutable.fromJS([{
        id: '327',
        isRecommended: false,
        availability: [{
          id: '123abc',
          from: '2018-07-09T13:00:00+01:00',
          until: '2018-07-17T11:59:59+01:00',
          featured: true,
        },
        ],
      }])

      expect(getFeaturedRecipes(state)).toEqual(expectedResult)
    })
  })

  describe('getRemainingRecipes', () => {
    const state = {
      auth: Immutable.Map({
        isAdmin: false,
      }),
      basket: Immutable.fromJS({
        recipes: Immutable.Map({}),
        numPortions: 2,
        date: '2018-07-13',
        prevDate: '',
        slotId: 'db015db8',
        prevSlotId: '',
      }),
      filters: Immutable.Map({
        currentCollectionId: 'ca8f71be',
        totalTime: '0',
        dietTypes: Immutable.Set([]),
        dietaryAttributes: Immutable.Set([]),
      }),
      recipes: Immutable.fromJS({
        327: {
          id: '327',
          isRecommended: false,
          availability: Immutable.fromJS([
            {
              id: '123abc',
              from: '2018-07-09T13:00:00+01:00',
              until: '2018-07-17T11:59:59+01:00',
              featured: true,
            },
          ]),
        },
        1589: {
          id: '1589',
          isRecommended: false,
          availability: Immutable.fromJS([
            {
              id: '123abd',
              from: '2018-07-10T10:00:00+01:00',
              until: '2018-07-17T11:59:59+01:00',
              featured: false,
            },
          ]),
        },
      }),
      menuCollectionRecipes: Immutable.fromJS({
        ca8f71be: ['327', '1589'],
      }),
      menuCollections: Immutable.fromJS({
        ca8f71be: {
          default: true,
          id: 'ca8f71be',
        },
      }),
      menuRecipeStock: Immutable.fromJS({
        327: {
          2: 50,
          4: 2,
          8: 0,
        },
        1589: {
          2: 50,
          4: 2,
          8: 0,
        },
      }),
      menuRecieveMenuPending: false,
      temp: Immutable.fromJS({}),
      menuCutoffUntil: '2018-07-10T11:59:59+01:00',
    }

    test('get recipes that are inStock but are not featured', () => {
      const expectedResult = Immutable.fromJS([{
        id: '1589',
        isRecommended: false,
        availability: [{
          id: '123abd',
          from: '2018-07-10T10:00:00+01:00',
          until: '2018-07-17T11:59:59+01:00',
          featured: false,
        },
        ],
      }])
      expect(getRemainingRecipes(state)).toEqual(expectedResult)
    })
  })

  describe('getSortedRecipes', () => {
    const featuredRecipes = Immutable.fromJS([{ id: 3 }])
    const outofStockRecipes = Immutable.fromJS([{ id: 2 }, { id: 4 }])
    const remainingRecipes = Immutable.fromJS([{ id: 1 }, { id: 5 }])

    const emptyOutofStockRecipes = Immutable.fromJS([])

    const expectedResult = Immutable.fromJS([{ id: 3 }, { id: 1 }, { id: 5 }, { id: 2 }, { id: 4 }])
    const expectedEmptyResult = Immutable.fromJS([{ id: 3 }, { id: 1 }, { id: 5 }])

    test('should return a concatenated list from featuredRecipes, outOfStockRecipes and remainingRecipes', () => {
      expect(getSortedRecipes.resultFunc(featuredRecipes, outofStockRecipes, remainingRecipes)).toEqual(expectedResult)
    })

    test('should return a concatenated list even if one of the lists is empty', () => {
      expect(getSortedRecipes.resultFunc(featuredRecipes, emptyOutofStockRecipes, remainingRecipes)).toEqual(expectedEmptyResult)
    })
  })
})
