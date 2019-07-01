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
  foodBrandDescription: {
    '10-minute-meals': 'Easy, speedy recipes for busy days',
    'everyday-favourites': 'Family dinners, sorted (with 2 of your 5-a-day)',
    'takeaway-night': 'Cook your favourite takeaways at home',
    'modern-bistro': 'Restaurant-style dining made easy',
    'health-boost': 'Delicious and nutritious for feel-good feasting',
    'global-kitchen': 'Take your tastebuds on an adventure ',
    'fine-dine-in': 'Decadent dishes sure to impress'
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
}

export default config
