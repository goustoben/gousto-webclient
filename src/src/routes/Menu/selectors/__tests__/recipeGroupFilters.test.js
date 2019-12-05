import Immutable from 'immutable'
import { getRecipesFilteredByFoodBrand, getRecipesFilteredByCollectionSlug } from '../recipeGroupFilters'

describe('recipeGroupFilters', () => {
  describe('getRecipesFilteredByCollectionSlug', () => {
    const state = {
      filters: Immutable.Map({
        currentCollectionId: 'ca8f71be',
        recipeGroup: {
          slug: "taste-of-japan"
        }
      }),
      menuRecipes: Immutable.List(["1", "2", "3", "4", "5"]),
      menuCollectionRecipes: Immutable.fromJS({
        ca8f71be: ['1', '2', '3'],
        bc5fc11o: ['4', '5'],
      }),
      menuCollections: Immutable.fromJS({
        ca8f71be: {
          default: true,
          id: 'ca8f71be',
          slug: '10-minute-meals'
        },
        bc5fc11o: {
          default: false,
          id: 'bc5fc11o',
          slug: 'taste-of-japan'
        }}),
      recipes: Immutable.fromJS({
        1: {
          id: '1',
          dietType: 'Meat',
          cookingTime: '10',
          cookingTimeFamily: '10',
          availability: [{
            offset: 3,
          },{
            offset: -0,
          }],
          taxonomy: Immutable.List([
            Immutable.Map({
              id: 2,
              name: 'Food Brands',
              slug: 'food-brands',
              tags: Immutable.List([
                Immutable.Map({
                  id: 6,
                  name: 'Modern Bistro',
                  slug: 'modern-bistro' }),
              ]),
            }),
          ]),
        },
        2: {
          id: '2',
          dietType: 'Fish',
          cookingTime: '20',
          cookingTimeFamily: '25',
          availability: [{
            offset: -3,
          },{
            offset: -0,
          }],
          taxonomy: Immutable.List([
            Immutable.Map({
              id: 2,
              name: 'Food Brands',
              slug: 'food-brands',
              tags: Immutable.List([
                Immutable.Map({
                  id: 6,
                  name: 'Modern Bistro',
                  slug: 'modern-bistro' }),
              ]),
            }),
          ]),
        },
        3: {
          id: '3',
          dietType: 'Vegetarian',
          cookingTime: '30',
          cookingTimeFamily: '45',
          availability: [{
            offset: -3,
          },{
            offset: -0,
          }],
          taxonomy: Immutable.List([
            Immutable.Map({
              id: 2,
              name: 'Food Brands',
              slug: 'food-brands',
              tags: Immutable.List([
                Immutable.Map({
                  id: 6,
                  name: 'Modern Bistro',
                  slug: 'modern-bistro' }),
              ]),
            }),
          ]),
        },
        4: {
          id: '4',
          dietType: 'Vegan',
          cookingTime: '40',
          cookingTimeFamily: '50',
          availability: [{
            offset: -3,
          },{
            offset: -0,
          }],
          taxonomy: Immutable.List([
            Immutable.Map({
              id: 2,
              name: 'Food Brands',
              slug: 'food-brands',
              tags: Immutable.List([
                Immutable.Map({
                  id: 8,
                  name: 'Global Kitchen',
                  slug: 'global-kitchen'}),
              ]),
            }),
          ]),
        },
        5: {
          id: '5',
          dietType: 'Meat',
          cookingTime: '50',
          cookingTimeFamily: '65',
          availability: [{
            offset: -3,
          },{
            offset: -0,
          }],
          taxonomy: Immutable.List([
            Immutable.Map({
              id: 2,
              name: 'Food Brands',
              slug: 'food-brands',
              tags: Immutable.List([
                Immutable.Map({
                  id: 8,
                  name: 'Global Kitchen',
                  slug: 'global-kitchen' }),
              ]),
            }),
          ]),
        },
      }),
    }

    test('should return an array of recipes that have the slug taste-of-japan', () => {
      expect(getRecipesFilteredByCollectionSlug(state)).toEqual(Immutable.fromJS([
        {
          id: '4',
          dietType: 'Vegan',
          cookingTime: '40',
          cookingTimeFamily: '50',
          availability: [{
            offset: -3,
          },{
            offset: -0,
          }],
          taxonomy: Immutable.List([
            Immutable.Map({
              id: 2,
              name: 'Food Brands',
              slug: 'food-brands',
              tags: Immutable.List([
                Immutable.Map({
                  id: 8,
                  name: 'Global Kitchen',
                  slug: 'global-kitchen'}),
              ]),
            }),
          ]),
        },
        {
          id: '5',
          dietType: 'Meat',
          cookingTime: '50',
          cookingTimeFamily: '65',
          availability: [{
            offset: -3,
          },{
            offset: -0,
          }],
          taxonomy: Immutable.List([
            Immutable.Map({
              id: 2,
              name: 'Food Brands',
              slug: 'food-brands',
              tags: Immutable.List([
                Immutable.Map({
                  id: 8,
                  name: 'Global Kitchen',
                  slug: 'global-kitchen' }),
              ]),
            }),
          ])
        }
      ]))
    })
  })

  describe('getRecipesFilteredByFoodBrand', () => {
    const state = {
      filters: Immutable.Map({
        currentCollectionId: 'ca8f71be',
        recipeGroup: {
          slug: "global-kitchen"
        }
      }),
      menuRecipes: Immutable.List(["1", "2", "3", "4", "5"]),
      recipes: Immutable.fromJS({
        1: {
          id: '1',
          dietType: 'Meat',
          cookingTime: '10',
          cookingTimeFamily: '10',
          availability: [{
            offset: 3,
          },{
            offset: -0,
          }],
          taxonomy: Immutable.List([
            Immutable.Map({
              id: 2,
              name: 'Food Brands',
              slug: 'food-brands',
              tags: Immutable.List([
                Immutable.Map({
                  id: 6,
                  name: 'Modern Bistro',
                  slug: 'modern-bistro' }),
              ]),
            }),
          ]),
        },
        2: {
          id: '2',
          dietType: 'Fish',
          cookingTime: '20',
          cookingTimeFamily: '25',
          availability: [{
            offset: -3,
          },{
            offset: -0,
          }],
          taxonomy: Immutable.List([
            Immutable.Map({
              id: 2,
              name: 'Food Brands',
              slug: 'food-brands',
              tags: Immutable.List([
                Immutable.Map({
                  id: 6,
                  name: 'Modern Bistro',
                  slug: 'modern-bistro' }),
              ]),
            }),
          ]),
        },
        3: {
          id: '3',
          dietType: 'Vegetarian',
          cookingTime: '30',
          cookingTimeFamily: '45',
          availability: [{
            offset: -3,
          },{
            offset: -0,
          }],
          taxonomy: Immutable.List([
            Immutable.Map({
              id: 2,
              name: 'Food Brands',
              slug: 'food-brands',
              tags: Immutable.List([
                Immutable.Map({
                  id: 6,
                  name: 'Modern Bistro',
                  slug: 'modern-bistro' }),
              ]),
            }),
          ]),
        },
        4: {
          id: '4',
          dietType: 'Vegan',
          cookingTime: '40',
          cookingTimeFamily: '50',
          availability: [{
            offset: -3,
          },{
            offset: -0,
          }],
          taxonomy: Immutable.List([
            Immutable.Map({
              id: 2,
              name: 'Food Brands',
              slug: 'food-brands',
              tags: Immutable.List([
                Immutable.Map({
                  id: 8,
                  name: 'Global Kitchen',
                  slug: 'global-kitchen'}),
              ]),
            }),
          ]),
        },
        5: {
          id: '5',
          dietType: 'Meat',
          cookingTime: '50',
          cookingTimeFamily: '65',
          availability: [{
            offset: -3,
          },{
            offset: -0,
          }],
          taxonomy: Immutable.List([
            Immutable.Map({
              id: 2,
              name: 'Food Brands',
              slug: 'food-brands',
              tags: Immutable.List([
                Immutable.Map({
                  id: 8,
                  name: 'Global Kitchen',
                  slug: 'global-kitchen' }),
              ]),
            }),
          ]),
        },
      }),
    }

    test('should return an array of recipes that have the slug global-kitchen', () => {
      expect(getRecipesFilteredByFoodBrand(state)).toEqual(Immutable.fromJS([
        {
          id: '4',
          dietType: 'Vegan',
          cookingTime: '40',
          cookingTimeFamily: '50',
          availability: [{
            offset: -3,
          },{
            offset: -0,
          }],
          taxonomy: Immutable.List([
            Immutable.Map({
              id: 2,
              name: 'Food Brands',
              slug: 'food-brands',
              tags: Immutable.List([
                Immutable.Map({
                  id: 8,
                  name: 'Global Kitchen',
                  slug: 'global-kitchen'}),
              ]),
            }),
          ]),
        },
        {
          id: '5',
          dietType: 'Meat',
          cookingTime: '50',
          cookingTimeFamily: '65',
          availability: [{
            offset: -3,
          },{
            offset: -0,
          }],
          taxonomy: Immutable.List([
            Immutable.Map({
              id: 2,
              name: 'Food Brands',
              slug: 'food-brands',
              tags: Immutable.List([
                Immutable.Map({
                  id: 8,
                  name: 'Global Kitchen',
                  slug: 'global-kitchen' }),
              ]),
            }),
          ])
        }
      ]))
    })
  })
})
