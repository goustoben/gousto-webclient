import { transformRecipesWithIngredients } from './recipeTransform'

describe('transformRecipesWithIngredients', () => {
  let result
  const RECIPES = [{
    id: '123abc',
    attributes: {
      name: 'Pasta',
      core_recipe_id: '998',
      gousto_reference: 889
    },
    relationships: {
      ingredients: {
        data: [{
          id: 'ab123cd',
          labels: {
            for2: 'onion'
          }
        }]
      }
    }
  }, {
    id: '456def',
    attributes: {
      name: 'Rice',
      core_recipe_id: '778',
      gousto_reference: 667
    },
    relationships: {
      ingredients: {
        data: [{
          id: 'ef456gh',
          labels: {
            for2: 'garlic'
          }
        }]
      }
    }
  }]
  const INGREDIENTS_DATA = [{
    id: 'ab123cd',
    attributes: {
      images: [{
        crops: [{
          url: 'onion-url-50w',
          width: 50
        }]
      }]
    }
  }, {
    id: 'ef456gh',
    attributes: {
      images: [{
        crops: [{
          url: 'garlic-url-50w',
          width: 50
        }]
      }]
    }
  }]

  beforeEach(() => {
    result = transformRecipesWithIngredients(RECIPES, INGREDIENTS_DATA)
  })

  test('returns the recipes with ingredients in the right shape', () => {
    const EXPECTED_RECIPES = [{
      id: '998',
      uuid: '123abc',
      title: 'Pasta',
      goustoReference: '889',
      ingredients: [{
        label: 'onion',
        urls: [{
          url: 'onion-url-50w',
          width: 50
        }],
        uuid: 'ab123cd'
      }]
    },
    {
      id: '778',
      uuid: '456def',
      title: 'Rice',
      goustoReference: '667',
      ingredients: [{
        label: 'garlic',
        urls: [{
          url: 'garlic-url-50w',
          width: 50
        }],
        uuid: 'ef456gh'
      }]
    }]
    expect(result).toEqual(EXPECTED_RECIPES)
  })

  describe('when ingredients do not have images', () => {
    beforeEach(() => {
      const INGREDIENTS_DATA_WITH_NO_IMAGE = [{
        id: 'ab123cd',
        attributes: {
          images: []
        }
      }, {
        id: 'ef456gh',
        attributes: {
          images: []
        }
      }]
      result = transformRecipesWithIngredients(RECIPES, INGREDIENTS_DATA_WITH_NO_IMAGE)
    })
    test('returns the recipes with ingredients and empty urls', () => {
      const EXPECTED_RECIPES = [{
        id: '998',
        uuid: '123abc',
        title: 'Pasta',
        goustoReference: '889',
        ingredients: [{
          label: 'onion',
          urls: [],
          uuid: 'ab123cd'
        }]
      },
      {
        id: '778',
        uuid: '456def',
        title: 'Rice',
        goustoReference: '667',
        ingredients: [{
          label: 'garlic',
          urls: [],
          uuid: 'ef456gh'
        }]
      }]
      expect(result).toEqual(EXPECTED_RECIPES)
    })
  })
})
