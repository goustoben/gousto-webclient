export const getRecipeTitle = recipe => recipe.get('title')

export const getRecipeURL = recipe => recipe.get('url')

export const getRecipeImages = recipe => recipe.getIn(['media', 'images', 0, 'urls'])

export const getDisclaimerForRecipeID = ({recipes}, recipeID) => {
  const recipeDetails = recipes.get(recipeID)

  if (!recipeDetails) {
    return null
  }

  const healthKitchenDetails = recipeDetails.get('healthKitchen')

  return healthKitchenDetails && healthKitchenDetails.get('disclaimer')
}

export const getMicronutrientsForRecipeID = ({recipes}, recipeID) => {
  return [
    {
      "name": "Iron",
      "content": {
        "amount": 6.5,
        "unit": "µg"
      },
      "nrvPercent": 46.4
    },
    {
      "name": "Thiamin",
      "content": {
        "amount": 0.4,
        "unit": "mg"
      },
      "nrvPercent": 36.5
    },
    {
      "name": "Niacin",
      "content": {
        "amount": 18,
        "unit": "mg"
      },
      "nrvPercent": 112.2
    },
    {
      "name": "B6",
      "content": {
        "amount": 1.1,
        "unit": "mg"
      },
      "nrvPercent": 77
    },
    {
      "name": "Pantothenic acid",
      "content": {
        "amount": 3.1,
        "unit": "mg"
      },
      "nrvPercent": 51.4
    },
    {
      "name": "Magnesium",
      "content": {
        "amount": 197.5,
        "unit": "mg"
      },
      "nrvPercent": 52.7
    }
  ]
}
