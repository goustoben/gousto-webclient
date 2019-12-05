import Immutable from 'immutable'
import { getFilteredRecipeIds, getFilteredRecipes } from 'routes/Menu/selectors/filters.js'

describe('filters', () => {

  describe('getFilteredRecipes', () => {
    describe('getFilteredRecipes without recipeGroup having thematics', () => {
      const state = {
        filters: Immutable.Map({
          currentCollectionId: 'ca8f71be',
          recipeGroup: null,
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
            slug: 'all-recipes'
          },
          '70c28cb0': {
            default: false,
            id: '70c28cb0',
            slug: 'chicken',
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

    describe('getFilteredRecipes with thematics', () => {
      const state = {
        filters: Immutable.Map({
          currentCollectionId: 'ca8f71be',
          recipeGroup: {
            name: "10-Minute Meals",
            slug: "10-minute-meals",
            borderColor: "#FB6126",
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
            slug: '10-minute-meals'
          },
          '70c28cb0': {
            default: false,
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
          Immutable.Map({
            id: '1589',
            dietType: 'Fish',
            taxonomy: Immutable.fromJS([
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
                ]
              }
            ]),
          }),
          Immutable.Map({
            id: '393',
            dietType: 'Vegetarian',
          })
        ]))
      })
    })
  })

  describe('getFilteredFoodBrandRecipes', () => {
    describe('getFilteredFoodBrandRecipes without recipeGroup', () => {
      const state = {
        filters: Immutable.Map({
          currentCollectionId: 'ca8f71be',
          recipeGroup: null,
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
            slug: 'all-recipes'
          },
          '70c28cb0': {
            default: false,
            id: '70c28cb0',
            slug: 'chicken',
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

    describe('getFilteredFoodBrandRecipes with recipe group having a food brand', () => {
      const state = {
        filters: Immutable.Map({
          currentCollectionId: 'ca8f71be',
          recipeGroup: {
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
            slug: 'all-recipes'
          },
          '70c28cb0': {
            default: false,
            id: '70c28cb0',
            slug: 'chicken',
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
          default: false,
          id: '70c28cb0',
        },
      }),
    }

    test('get all filtered recipe ids for current collection', () => {
      expect(getFilteredRecipeIds(state)).toEqual(Immutable.fromJS(['327', '1589', '393']))
    })
  })
})
