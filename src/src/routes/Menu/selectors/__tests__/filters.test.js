import Immutable from 'immutable'
import { getFilteredRecipeIds, getFilteredRecipes } from 'routes/Menu/selectors/filters.js'

describe('filters', () => {

  describe('getFilteredRecipes', () => {
    describe('getFilteredRecipes without foodBrand', () => {
      const state = {
        filters: Immutable.Map({
          currentCollectionId: 'ca8f71be',
          totalTime: '0',
          dietTypes: Immutable.Set([]),
          dietaryAttributes: Immutable.Set([]),
          foodBrand: null,
        }),
        basket: Immutable.fromJS({
          numPortions: 2,
        }),
        recipes: Immutable.fromJS({
          327: {
            id: '327',
            dietType: 'Meat',
          },
          1589: {
            id: '1589',
            dietType: 'Fish',
          },
          393: {
            id: '393',
            dietType: 'Vegetarian',
          },
          929: {
            id: '929',
            dietType: 'Vegan',
          },
          1651: {
            id: '1651',
            dietType: 'Meat',
          },
        }),
        menuCollectionRecipes: Immutable.fromJS({
          ca8f71be: ['327', '1589', '393'],
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
        menuRecipes: Immutable.fromJS(['327', '1589', '393', '929', '1651'])
      }

      test('get all filtered recipe for current collection', () => {
        expect(getFilteredRecipes(state)).toEqual(Immutable.List([
          Immutable.Map({
            id: '327',
            dietType: 'Meat',
          }),
          Immutable.Map({
            id: '1589',
            dietType: 'Fish',
          }),
          Immutable.Map({
            id: '393',
            dietType: 'Vegetarian',
          }),
        ]))
      })
    })

    describe('getFilteredRecipes with foodBrand', () => {
      const state = {
        filters: Immutable.Map({
          currentCollectionId: 'ca8f71be',
          totalTime: '0',
          dietTypes: Immutable.Set([]),
          dietaryAttributes: Immutable.Set([]),
          foodBrand: {
            name: "Takeaway Night",
            slug: "takeaway-night",
            borderColor: "#17B7BF",
          },
        }),
        basket: Immutable.fromJS({
          numPortions: 2,
        }),
        recipes: Immutable.fromJS({
          327: {
            id: '327',
            dietType: 'Meat',
            taxonomy: [
              {},
              {
                id: 2,
                name: "Food Brands",
                slug: "food-brands",
                tags: [
                  {
                    id: "9",
                    name: "Takeaway Night",
                    slug: "takeaway-night",
                    properties: {
                      ribbon_color: "#000000",
                      border_color: "#17B7BF",
                      text_color: "#FFFFFF",
                    },
                  }
                ]}]},
          1589: {
            id: '1589',
            dietType: 'Fish',
            taxonomy: [
              {},
              {
                id: 8,
                name: "Food Brands",
                slug: "food-brands",
                tags: [
                  {
                    id: "4",
                    name: "Modern Bistro",
                    slug: "modern-bistro",
                    properties: {
                      ribbon_color: "#000000",
                      border_color: "#17B7BF",
                      text_color: "#FFFFFF",
                    },
                  }
                ]}]
          },
          393: {
            id: '393',
            dietType: 'Vegetarian',
          },
          929: {
            id: '929',
            dietType: 'Vegan',
          },
          1651: {
            id: '1651',
            dietType: 'Meat',
          },
        }),
        menuCollectionRecipes: Immutable.fromJS({
          ca8f71be: ['327', '1589', '393'],
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
        menuRecipes: Immutable.fromJS(['327', '1589', '393', '929', '1651'])
      }

      test('should return food brand recipes if a food brand filter is present', () => {
        expect(getFilteredRecipes(state)).toEqual(Immutable.List([
          Immutable.Map({
            id: '327',
            dietType: 'Meat',
            taxonomy: Immutable.fromJS([
              {},
              {
                id: 2,
                name: "Food Brands",
                slug: "food-brands",
                tags: [
                  {
                    id: "9",
                    name: "Takeaway Night",
                    slug: "takeaway-night",
                    properties: {
                      ribbon_color: "#000000",
                      border_color: "#17B7BF",
                      text_color: "#FFFFFF",
                    },
                  }
                ]
              }
            ])
          }),
        ]))
      })
    })
  })

  describe('getFilteredRecipeIds', () => {
    const state = {
      filters: Immutable.Map({
        currentCollectionId: 'ca8f71be',
        totalTime: '0',
        dietTypes: Immutable.Set([]),
        dietaryAttributes: Immutable.Set([]),
      }),
      basket: Immutable.fromJS({
        numPortions: 2,
      }),
      recipes: Immutable.fromJS({
        327: {
          id: '327',
          dietType: 'Meat',
        },
        1589: {
          id: '1589',
          dietType: 'Fish',
        },
        393: {
          id: '393',
          dietType: 'Vegetarian',
        },
        929: {
          id: '929',
          dietType: 'Vegan',
        },
        1651: {
          id: '1651',
          dietType: 'Meat',
        },
      }),
      menuCollectionRecipes: Immutable.fromJS({
        ca8f71be: ['327', '1589', '393'],
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
    }

    test('get all filtered recipe ids for current collection', () => {
      expect(getFilteredRecipeIds(state)).toEqual(Immutable.fromJS(['327', '1589', '393']))
    })
  })

  describe('getRecipesByDietType', () => {
    const state = {
      filters: Immutable.Map({
        currentCollectionId: 'ca8f71be',
        totalTime: '0',
        dietTypes: Immutable.Set(['meat']),
        dietaryAttributes: Immutable.Set([]),
      }),
      basket: Immutable.fromJS({
        numPortions: 2,
      }),
      recipes: Immutable.fromJS({
        327: {
          id: '327',
          dietType: 'Meat',
        },
        1589: {
          id: '1589',
          dietType: 'Fish',
        },
        393: {
          id: '393',
          dietType: 'Vegetarian',
        },
        929: {
          id: '929',
          dietType: 'Vegan',
        },
        1651: {
          id: '1651',
          dietType: 'Meat',
        },
      }),
      menuCollectionRecipes: Immutable.fromJS({
        ca8f71be: ['327', '1589', '393'],
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
    }
    test('get recipes for selected dietTypes', () => {
      expect(getFilteredRecipes(state)).toEqual(Immutable.List([
        Immutable.Map({
          id: '327',
          dietType: 'Meat',
        }),
      ]))
    })
  })

  describe('getRecipesByDietaryAttributes', () => {
    const createTaxonomy = (tags) => ([
      {
        id: 1,
        name: 'Dietary attributes',
        slug: 'dietary-attributes',
        tags,
      },
    ])

    let state = {
      filters: Immutable.Map({
        currentCollectionId: '70c28cb0',
        totalTime: '0',
        dietTypes: Immutable.Set(['vegan', 'vegetarian']),
        dietaryAttributes: Immutable.Set(['gluten-free']),
      }),
      basket: Immutable.fromJS({
        numPortions: 2,
      }),
      recipes: Immutable.fromJS({
        327: {
          id: '327',
          dietType: 'Meat',
          taxonomy: createTaxonomy([]),
        },
        1589: {
          id: '1589',
          dietType: 'Fish',
          taxonomy: createTaxonomy([]),
        },
        393: {
          id: '393',
          dietType: 'Vegetarian',
          taxonomy: createTaxonomy([
            { slug: 'gluten-free' },
            { slug: 'dairy-free' },
          ]),
        },
        929: {
          id: '929',
          dietType: 'Vegan',
          taxonomy: createTaxonomy([
            { slug: 'gluten-free' },
          ]),
        },
        1651: {
          id: '1651',
          dietType: 'Meat',
          taxonomy: createTaxonomy([]),
        },
      }),
      menuCollectionRecipes: Immutable.fromJS({
        ca8f71be: ['327', '1589', '393'],
        '70c28cb0': ['929', '1651', '393'],
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
    }

    test('get recipes for selected dietaryAttributes', () => {
      expect(getFilteredRecipes(state)).toEqual(Immutable.List([
        Immutable.Map({
          id: '929',
          dietType: 'Vegan',
          taxonomy: Immutable.List([
            Immutable.Map({
              id: 1,
              name: 'Dietary attributes',
              slug: 'dietary-attributes',
              tags: Immutable.List([
                Immutable.Map({ slug: 'gluten-free' }),
              ]),
            }),
          ]),
        }),
        Immutable.Map({
          id: '393',
          dietType: 'Vegetarian',
          taxonomy: Immutable.List([
            Immutable.Map({
              id: 1,
              name: 'Dietary attributes',
              slug: 'dietary-attributes',
              tags: Immutable.List([
                Immutable.Map({ slug: 'gluten-free' }),
                Immutable.Map({ slug: 'dairy-free' }),
              ]),
            }),
          ]),
        }),
      ]))
    })

    test('get recipes for selected dietaryAttributes', () => {
      state = {
        ...state,
        filters: Immutable.Map({
          currentCollectionId: '70c28cb0',
          totalTime: '0',
          dietTypes: Immutable.Set([]),
          dietaryAttributes: Immutable.Set(['dairy-free', 'gluten-free']),
        })
      }

      expect(getFilteredRecipes(state)).toEqual(Immutable.List([
        Immutable.Map({
          id: '393',
          dietType: 'Vegetarian',
          taxonomy: Immutable.List([
            Immutable.Map({
              id: 1,
              name: 'Dietary attributes',
              slug: 'dietary-attributes',
              tags: Immutable.List([
                Immutable.Map({ slug: 'gluten-free' }),
                Immutable.Map({ slug: 'dairy-free' }),
              ]),
            }),
          ]),
        }),
      ]))
    })
  })

  describe('getRecipesByTotalTime', () => {
    const state = {
      filters: Immutable.Map({
        currentCollectionId: 'ca8f71be',
        totalTime: '25',
        dietTypes: Immutable.Set([]),
        dietaryAttributes: Immutable.Set([]),
      }),
      basket: Immutable.fromJS({
        numPortions: 2,
      }),
      recipes: Immutable.fromJS({
        327: {
          id: '327',
          dietType: 'Meat',
          cookingTime: '10',
          cookingTimeFamily: '10',
        },
        1589: {
          id: '1589',
          dietType: 'Fish',
          cookingTime: '20',
          cookingTimeFamily: '25',
        },
        393: {
          id: '393',
          dietType: 'Vegetarian',
          cookingTime: '30',
          cookingTimeFamily: '45',
        },
        929: {
          id: '929',
          dietType: 'Vegan',
          cookingTime: '40',
          cookingTimeFamily: '50',
        },
        1651: {
          id: '1651',
          dietType: 'Meat',
          cookingTime: '50',
          cookingTimeFamily: '65',
        },
      }),
      menuCollectionRecipes: Immutable.fromJS({
        ca8f71be: ['327', '1589', '393'],
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
    }
    test('get recipes with the cooking time under 25 minutes', () => {
      expect(getFilteredRecipes(state)).toEqual(Immutable.List([
        Immutable.Map({
          id: '327',
          dietType: 'Meat',
          cookingTime: '10',
          cookingTimeFamily: '10',
        }),
        Immutable.Map({
          id: '1589',
          dietType: 'Fish',
          cookingTime: '20',
          cookingTimeFamily: '25',
        })
      ]))
    })

    test('get recipes with the cooking time 30 minutes or less for 4 portions', () => {
      const newState = { ...state, filters: Immutable.fromJS({
        currentCollectionId: 'ca8f71be',
        totalTime: '30',
        dietTypes: Immutable.Set([]),
        dietaryAttributes: Immutable.Set([]),
      }), basket: Immutable.fromJS({
        numPortions: 4,
      }),
      }
      expect(getFilteredRecipes(newState)).toEqual(Immutable.List([
        Immutable.Map({
          id: '327',
          dietType: 'Meat',
          cookingTime: '10',
          cookingTimeFamily: '10',
        }),
        Immutable.Map({
          id: '1589',
          dietType: 'Fish',
          cookingTime: '20',
          cookingTimeFamily: '25',
        }),
      ]))
    })
  })

  describe('getNewRecipes', () => {
    const state = {
      filters: Immutable.Map({
        currentCollectionId: 'ca8f71be',
        totalTime: '0',
        dietTypes: Immutable.Set(['meat']),
        dietaryAttributes: Immutable.Set([]),
        newRecipes: true,
      }),
      basket: Immutable.fromJS({
        numPortions: 2,
      }),
      recipes: Immutable.fromJS({
        327: {
          id: '327',
          dietType: 'Meat',
          cookingTime: '10',
          cookingTimeFamily: '10',
          availability: [{
            offset: 3,
          },{
            offset: -0,
          }]
        },
        1589: {
          id: '1589',
          dietType: 'Fish',
          cookingTime: '20',
          cookingTimeFamily: '25',
          availability: [{
            offset: -3,
          },{
            offset: -0,
          }]
        },
        393: {
          id: '393',
          dietType: 'Vegetarian',
          cookingTime: '30',
          cookingTimeFamily: '45',
          availability: [{
            offset: -3,
          },{
            offset: -0,
          }]
        },
        929: {
          id: '929',
          dietType: 'Vegan',
          cookingTime: '40',
          cookingTimeFamily: '50',
          availability: [{
            offset: -3,
          },{
            offset: -0,
          }]
        },
        1651: {
          id: '1651',
          dietType: 'Meat',
          cookingTime: '50',
          cookingTimeFamily: '65',
          availability: [{
            offset: -3,
          },{
            offset: -0,
          }]
        },
      }),
      menuCollectionRecipes: Immutable.fromJS({
        ca8f71be: ['327', '1589', '393'],
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
    }
    test('should return only newRecipes', () => {
      expect(getFilteredRecipes(state)).toEqual(Immutable.List([
        Immutable.fromJS({
          id: '327',
          dietType: 'Meat',
          cookingTime: '10',
          cookingTimeFamily: '10',
          availability: [{
            offset: 3,
          },{
            offset: -0,
          }]
        }),
      ]))
    })
  })
})
