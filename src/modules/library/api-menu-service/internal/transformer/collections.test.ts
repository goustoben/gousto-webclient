import { MenuAPIResponseDataItem, MenuServiceData } from '../http'
import { collectionsTransformer } from './collections'

describe('collectionTransformer', () => {
  const menuServiceResponse: MenuServiceData = {
    meta: {
      isPreviewMenu: false,
      recommendations: {
        limit: 25,
        tutorial: '',
        enabled: true,
        name: 'Gousto Recommends',
        version: 'goustoRecommends/ltr',
      },
    },
    data: [
      {
        id: '295',
        type: 'menu',
        attributes: {
          name: 'default',
          is_default: true,
          core_menu_id: '295',

          starts_at: '2022-07-05T12:00:00+01:00',
          period: {
            core_period_id: '443',
          },
          signup_default_day: null,
          ends_at: '2022-07-12T11:59:59+01:00',
        },
        relationships: {
          collections: {
            data: [
              {
                id: 'a4f1eb8e-2eda-11e9-81ec-06399ef4685e',
                type: 'collection',
                relationships: {
                  recipes: {
                    data: [
                      {
                        type: 'recipe',
                        id: '3a1f873f-8a62-4ca8-a842-32ca52bee9d5',
                        core_recipe_id: '2106',
                        meta: {
                          core_recipe_id: '2106',
                        },
                      },
                    ],
                  },
                },
              },
              {
                id: 'bc5fc11e-afbf-11e8-9691-0645394f11eae',
                type: 'collection',
                relationships: {
                  recipes: {
                    data: [],
                  },
                },
              },
            ],
          },
          recipes: {
            data: [],
          },
          boxes: {
            data: [],
          },
          debut_recipes: {
            data: [],
          },
          featured_categories: {
            data: [],
          },
          featured_recipe: {
            data: null as any,
          },
          recipe_options: {
            data: [],
          },
        },
        meta: {
          recommender: {
            limit: 25,
            tutorial: '',
            enabled: true,
            name: 'Gousto Recommends',
            version: 'goustoRecommends/ltr',
          },
          swapsExperimentUserAllocationGroup: 'variant-b',
          cfyLengthExperimentUserAllocationGroup: 'control',
        },
      },
    ],
    collection: {
      'a4f1eb8e-2eda-11e9-81ec-06399ef4685e': {
        id: 'a4f1eb8e-2eda-11e9-81ec-06399ef4685e',
        type: 'collection',
        attributes: {
          description: "All the week's chicken recipes",
          meta_title: null,
          long_title: null,
          meta_description: null,
          short_title: 'Chicken',
          colour: '#D8A958',
          schedule_end: '2020-04-21T11:59:59+01:00',
          slug: 'chicken',
          schedule_start: '2019-02-12T12:00:00+00:00',
          order: 400,
        },
      },
      'bc5fc11e-afbf-11e8-9691-0645394f11eae': {
        id: 'bc5fc11e-afbf-11e8-9691-0645394f11eae',
        type: 'collection',
        attributes: {
          description: 'Easy, speedy recipes for busy days',
          meta_title: null,
          long_title: null,
          meta_description: null,
          short_title: '10-Minute Meals',
          colour: '#6ACBB8',
          schedule_end: '2020-04-21T11:59:59+01:00',
          slug: '10-minute-meals',
          schedule_start: '2019-02-12T12:00:00+00:00',
          order: 200,
        },
      },
    },
    recipe: {
      2106: {
        id: '3a1f873f-8a62-4ca8-a842-32ca52bee9d5',
        type: 'recipe',
        attributes: {
          country: {
            name: 'India',
            alpha2: 'IN',
          },
          core_recipe_id: '2106',
          basics: [
            {
              name: 'Butter',
              slug: 'butter',
            },
            {
              name: 'Salt',
              slug: 'salt',
            },
            {
              name: 'Sugar',
              slug: 'sugar',
            },
            {
              name: 'Vegetable oil',
              slug: 'vegetable-oil',
            },
          ],
          description:
            "This mild chicken curry packs in flavours, no punches needed. Mild isn't a byword for boring, because its creamy sauce pairs perfectly with turmeric and sultana rice for a family-pleasing treat. ",
          shelf_life: {
            min_days: 2,
            max_days: 3,
          },
          food_brand: {
            name: 'Everyday Favourites',
            slug: 'everyday-favourites',
          },
          box_type: {
            name: 'Gourmet',
            slug: 'gourmet',
          },
          country_secondary: null,
          gousto_reference: 1995,
          difficulty_level: null,
          images: [
            {
              description: null,
              title: null,
              type: 'mood-image',
              crops: [
                {
                  width: 50,
                  url: 'https://production-media.gousto.co.uk/cms/mood-image/1995--Easy-Chicken-Curry-x50.jpg',
                },
                {
                  width: 200,
                  url: 'https://production-media.gousto.co.uk/cms/mood-image/1995--Easy-Chicken-Curry-x200.jpg',
                },
                {
                  width: 400,
                  url: 'https://production-media.gousto.co.uk/cms/mood-image/1995--Easy-Chicken-Curry-x400.jpg',
                },
                {
                  width: 700,
                  url: 'https://production-media.gousto.co.uk/cms/mood-image/1995--Easy-Chicken-Curry-x700.jpg',
                },
                {
                  width: 1000,
                  url: 'https://production-media.gousto.co.uk/cms/mood-image/1995--Easy-Chicken-Curry-x1000.jpg',
                },
                {
                  width: 1500,
                  url: 'https://production-media.gousto.co.uk/cms/mood-image/1995--Easy-Chicken-Curry-x1500.jpg',
                },
              ],
            },
            {
              description: null,
              title: null,
              type: 'homepage-image',
              crops: [
                {
                  width: 50,
                  url: 'https://production-media.gousto.co.uk/cms/homepage-image/1995-x50.jpg',
                },
                {
                  width: 200,
                  url: 'https://production-media.gousto.co.uk/cms/homepage-image/1995-x200.jpg',
                },
                {
                  width: 400,
                  url: 'https://production-media.gousto.co.uk/cms/homepage-image/1995-x400.jpg',
                },
                {
                  width: 700,
                  url: 'https://production-media.gousto.co.uk/cms/homepage-image/1995-x700.jpg',
                },
                {
                  width: 1000,
                  url: 'https://production-media.gousto.co.uk/cms/homepage-image/1995-x1000.jpg',
                },
                {
                  width: 1500,
                  url: 'https://production-media.gousto.co.uk/cms/homepage-image/1995-x1500.jpg',
                },
              ],
            },
          ],
          five_a_day: 2,
          cuisine: {
            name: 'Indian',
            slug: 'indian',
          },
          equipment: [],
          diet_type: {
            name: 'Meat',
            slug: 'meat',
          },
          allergens: [
            {
              name: 'peanut',
              contain_type: 'may_contain',
              slug: 'peanut',
            },
            {
              name: 'nut',
              contain_type: 'may_contain',
              slug: 'nut',
            },
            {
              name: 'sesame',
              contain_type: 'may_contain',
              slug: 'sesame',
            },
            {
              name: 'milk',
              contain_type: 'contains',
              slug: 'milk',
            },
            {
              name: 'egg',
              contain_type: 'may_contain',
              slug: 'egg',
            },
            {
              name: 'soya',
              contain_type: 'may_contain',
              slug: 'soya',
            },
            {
              name: 'celery',
              contain_type: 'may_contain',
              slug: 'celery',
            },
            {
              name: 'mustard',
              contain_type: 'may_contain',
              slug: 'mustard',
            },
          ],
          prep_times: {
            for2: 25,
            for4: 30,
          },
          dietary_claims: [
            {
              name: 'Gluten free',
              slug: 'gluten-free',
            },
          ],
          recipe_developer: {
            name: 'Hannah Mariaux',
          },
          name: 'Mild Chicken Curry',
          surcharges: {
            for2: null,
            for4: null,
          },
          dish_types: [
            {
              name: 'Curry',
            },
          ],
          rating: {
            average: 4.44,
            count: 10375,
            love_count: 7383,
          },
          nutritional_information: {
            per_portion: {
              fibre_mg: 5154,
              protein_mg: 39494,
              net_weight_mg: 726500,
              energy_kj: 3108,
              carbs_sugars_mg: 20758,
              fat_saturates_mg: 16922,
              carbs_mg: 77966,
              salt_mg: 2323,
              fat_mg: 29062,
              energy_kcal: 739,
            },
            per_100g: {
              fibre_mg: 1150,
              protein_mg: 8811,
              net_weight_mg: 726500,
              energy_kj: 693,
              carbs_sugars_mg: 4631,
              fat_saturates_mg: 3775,
              carbs_mg: 17393,
              salt_mg: 518,
              fat_mg: 6483,
              energy_kcal: 165,
            },
          },
          roundel: null,
          partnership: null,
          spice_level: {
            name: 'hot',
          },
          chef_prepared: false,
          health_attributes: [],
          ingredient_preparation: {
            time: {
              for2: 10,
              for4: 20,
            },
          },
        },
        relationships: {
          ingredients: {
            data: [
              {
                quantities: {
                  for2: 1,
                  for4: 2,
                },
                id: '79dc3eeb-991b-4673-913e-fbdc339f1fcf',
                type: 'ingredient',
                labels: {
                  for2: '1 brown onion',
                  for4: '2 brown onions',
                },
              },
              {
                quantities: {
                  for2: 2,
                  for4: 4,
                },
                id: '488d5751-dcff-4985-88c0-bf745ff54904',
                type: 'ingredient',
                labels: {
                  for2: '80g Cornish clotted cream',
                  for4: '160g Cornish clotted cream',
                },
              },
            ],
          },
        },
      },
    },
    ingredient: {
      '79dc3eeb-991b-4673-913e-fbdc339f1fcf': {
        id: '79dc3eeb-991b-4673-913e-fbdc339f1fcf',
        type: 'ingredient',
        published_at: '2022-02-01T09:45:52+00:00',
        attributes: {
          net_weight_mg: 80000,
          sub_ingredients: 'brown onion',
          images: [
            {
              description: 'Onion',
              type: 'ingredient-image',
              title: 'Onion',
              crops: [
                {
                  width: 50,
                  url: 'https://s3-eu-west-1.amazonaws.com/s3-gousto-radishes-media/cms/ingredient-image/onion-x50.jpg',
                },
                {
                  width: 200,
                  url: 'https://s3-eu-west-1.amazonaws.com/s3-gousto-radishes-media/cms/ingredient-image/onion-x200.jpg',
                },
                {
                  width: 700,
                  url: 'https://s3-eu-west-1.amazonaws.com/s3-gousto-radishes-media/cms/ingredient-image/onion-x700.jpg',
                },
                {
                  width: 1000,
                  url: 'https://s3-eu-west-1.amazonaws.com/s3-gousto-radishes-media/cms/ingredient-image/onion-x1000.jpg',
                },
                {
                  width: 1500,
                  url: 'https://s3-eu-west-1.amazonaws.com/s3-gousto-radishes-media/cms/ingredient-image/onion-x1500.jpg',
                },
              ],
            },
          ],
          label: 'Brown onion',
          allergens: [],
          dietary_claims: [
            {
              name: 'Gluten free',
              slug: 'gluten-free',
            },
            {
              name: 'Dairy free',
              slug: 'dairy-free',
            },
            {
              name: 'Vegetarian',
              slug: 'vegetarian',
            },
            {
              name: 'Vegan',
              slug: 'vegan',
            },
          ],
          name: '1 brown onion',
        },
      },
    },
    box: {}
  }

  test('should transform data into format expected by UI', () => {
    const expectedFormat = [
      {
        colour: '#D8A958',
        description: "All the week's chicken recipes",
        id: 'a4f1eb8e-2eda-11e9-81ec-06399ef4685e',
        order: 400,
        published: true,
        shortTitle: 'Chicken',
        slug: 'chicken',
        requirements: {},
        recipesInCollection: ['2106'],
        isFeaturedCategory: false,
        featuredCategoryOrder: 0,
        carouselConfig: null,
      },
      {
        colour: '#6ACBB8',
        description: 'Easy, speedy recipes for busy days',
        id: 'bc5fc11e-afbf-11e8-9691-0645394f11eae',
        order: 200,
        published: true,
        shortTitle: '10-Minute Meals',
        slug: '10-minute-meals',
        requirements: {},
        recipesInCollection: [],
        isFeaturedCategory: false,
        featuredCategoryOrder: 0,
        carouselConfig: null,
      },
    ]

    const result = collectionsTransformer(menuServiceResponse, menuServiceResponse.data[0])
    expect(result).toEqual(expectedFormat)
  })

  describe('when menu does not have relationships', () => {
    test('should return undefined', () => {
      const newMenu: MenuAPIResponseDataItem = {
        ...menuServiceResponse.data[0],
        relationships: {} as any,
      }

      const result = collectionsTransformer(menuServiceResponse, newMenu)
      expect(result).toEqual(undefined)
    })
  })

  describe('when menu has featured categories', () => {
    test('should return feature category options', () => {
      const expectedFormat = [
        {
          colour: '#D8A958',
          description: "All the week's chicken recipes",
          id: 'a4f1eb8e-2eda-11e9-81ec-06399ef4685e',
          order: 400,
          published: true,
          shortTitle: 'Chicken',
          slug: 'chicken',
          requirements: {},
          recipesInCollection: ['2106'],
          isFeaturedCategory: true,
          featuredCategoryOrder: 0,
        },
        {
          colour: '#6ACBB8',
          description: 'Easy, speedy recipes for busy days',
          id: 'bc5fc11e-afbf-11e8-9691-0645394f11eae',
          order: 200,
          published: true,
          shortTitle: '10-Minute Meals',
          slug: '10-minute-meals',
          requirements: {},
          recipesInCollection: [],
          isFeaturedCategory: true,
          featuredCategoryOrder: 1,
        },
      ]
      const newMenu: MenuAPIResponseDataItem = {
        ...menuServiceResponse.data[0],
        relationships: {
          ...menuServiceResponse.data[0].relationships,
          featured_categories: {
            data: [
              {
                id: 'a4f1eb8e-2eda-11e9-81ec-06399ef4685e',
                type: 'collection',
              },
              {
                id: 'bc5fc11e-afbf-11e8-9691-0645394f11eae',
                type: 'collection',
              },
            ],
          },
        },
      }

      const result = collectionsTransformer(menuServiceResponse, newMenu)
      expect(result).toEqual(expectedFormat)
    })

    describe('when feature categories does not have metadata', () => {
      test('should return categoryDetails as undefined', () => {
        const expectedFormat = [
          {
            colour: '#D8A958',
            description: "All the week's chicken recipes",
            id: 'a4f1eb8e-2eda-11e9-81ec-06399ef4685e',
            order: 400,
            published: true,
            shortTitle: 'Chicken',
            slug: 'chicken',
            requirements: {},
            recipesInCollection: ['2106'],
            isFeaturedCategory: true,
            featuredCategoryOrder: 0,
            categoryDetails: undefined,
          },
          {
            colour: '#6ACBB8',
            description: 'Easy, speedy recipes for busy days',
            id: 'bc5fc11e-afbf-11e8-9691-0645394f11eae',
            order: 200,
            published: true,
            shortTitle: '10-Minute Meals',
            slug: '10-minute-meals',
            requirements: {},
            recipesInCollection: [],
            isFeaturedCategory: true,
            featuredCategoryOrder: 1,
            categoryDetails: undefined,
          },
        ]
        const newMenu: MenuAPIResponseDataItem = {
          ...menuServiceResponse.data[0],
          relationships: {
            ...menuServiceResponse.data[0].relationships,
            featured_categories: {
              data: [
                {
                  id: 'a4f1eb8e-2eda-11e9-81ec-06399ef4685e',
                  type: 'collection',
                },
                {
                  id: 'bc5fc11e-afbf-11e8-9691-0645394f11eae',
                  type: 'collection',
                },
              ],
            },
          },
        }

        const result = collectionsTransformer(menuServiceResponse, newMenu)
        expect(result).toEqual(expectedFormat)
      })
    })

    describe('when feature categories has metadata', () => {
      test('should return categoryDetails', () => {
        const meta = {
          title: 'Chicken',
          description: "All the week's chicken recipes",
          styleSlug: 'default',
        }

        const expectedFormat = [
          {
            colour: '#D8A958',
            description: "All the week's chicken recipes",
            id: 'a4f1eb8e-2eda-11e9-81ec-06399ef4685e',
            order: 400,
            published: true,
            shortTitle: 'Chicken',
            slug: 'chicken',
            requirements: {},
            recipesInCollection: ['2106'],
            isFeaturedCategory: true,
            featuredCategoryOrder: 0,
            carouselConfig: meta,
          },
        ]
        const newMenu: MenuAPIResponseDataItem = {
          ...menuServiceResponse.data[0],
          relationships: {
            ...menuServiceResponse.data[0].relationships,
            collections: {
              data: [
                {
                  id: 'a4f1eb8e-2eda-11e9-81ec-06399ef4685e',
                  type: 'collection',
                  relationships: {
                    recipes: {
                      data: [
                        {
                          type: 'recipe',
                          id: '3a1f873f-8a62-4ca8-a842-32ca52bee9d5',
                          core_recipe_id: '2106',
                          meta: {
                            core_recipe_id: '2106',
                          },
                        },
                      ],
                    },
                  },
                },
              ],
            },
            featured_categories: {
              data: [
                {
                  id: 'a4f1eb8e-2eda-11e9-81ec-06399ef4685e',
                  type: 'collection',
                  meta,
                },
              ],
            },
          },
        }

        const result = collectionsTransformer(menuServiceResponse, newMenu)
        expect(result).toEqual(expectedFormat)
      })
    })
  })
})
