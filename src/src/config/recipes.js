const config = {
  range: {
    imageTypes: [
      'range-main-image',
      'range-detail-1-image',
      'range-detail-2-image',
    ],
    badges: {
      sharers: {
        text: 'Sharers',
        color: 'White',
        backgroundColor: '#1E2C48',
        borderColor: '#1E2C48',
      },
      ten_to_table: {
        text: '10-Minute Meal',
        color: 'White',
        backgroundColor: 'Carrot',
        borderColor: 'DarkCarrot',
      },
      everyday_favourites: {
        text: 'Everyday Favourites',
        color: '#1E2C48',
        backgroundColor: 'Cauliflower',
        borderColor: 'DarkCauliflower',
      },
      fine_dine_in: {
        text: 'Fine Dine In',
        color: 'White',
        backgroundColor: '#1E2C48',
        borderColor: '#1E2C48',
      },
    },
  },
  dietTypes: {
    meat: 'Meat',
    fish: 'Fish',
    vegetarian: 'Vegetarian',
    vegan: 'Plant-Based',
  },
  totalTime: {
    0: 'Any length',
    25: 'Under 25 mins',
    30: 'Under 30 mins',
  },
  dietaryAttributes: {
    'gluten-free': 'Gluten free',
    'dairy-free': 'Dairy free',
  },
  newRecipes: 'New recipes',
  recipeDetailViews: ['detail', 'fineDineInDetail'],
  thematicBorderColor: '#1E2C48',
}

export default config
