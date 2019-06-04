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
        backgroundColor: 'Pomegranate',
        borderColor: 'Pomegranate',
      },
      ten_to_table: {
        text: '10-Minute Meal',
        color: 'White',
        backgroundColor: 'Carrot',
        borderColor: 'DarkCarrot',
      },
      everyday_favourites: {
        text: 'Everyday Favourites',
        color: 'Pomegranate',
        backgroundColor: 'Cauliflower',
        borderColor: 'DarkCauliflower',
      },
      fine_dine_in: {
        text: 'Fine Dine In',
        color: 'White',
        backgroundColor: 'Blackberry',
        borderColor: 'DarkBlackberry',
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
    25: 'Under 25',
    30: 'Under 30',
  },
  dietaryAttributes: {
    'gluten-free': 'Gluten free',
    'dairy-free': 'Dairy free',
  },
  newRecipes: 'New recipes'
}

export default config
