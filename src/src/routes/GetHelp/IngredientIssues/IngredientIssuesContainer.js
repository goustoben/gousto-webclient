import { connect } from 'react-redux'

import { IngredientIssues } from './IngredientIssues.logic'

const getSelectedIngredients = (state) => {
  const selectedRecipeAndIngredientIds = state.getHelp.get('selectedIngredients')
  const selectedIngredientIds = selectedRecipeAndIngredientIds.map(
    ingredient => ingredient.get('ingredientId')
  )
  const recipes = state.getHelp.get('recipes')
  const selectedIngredients = []
  recipes.forEach(recipe => {
    recipe.get('ingredients').forEach(ingredient => {
      if (selectedIngredientIds.includes(ingredient.get('id'))) {
        selectedIngredients.push(ingredient.toJS())
      }
    })
  })

  return selectedIngredients
}

const mapStateToProps = (state) => ({
  content: {
    title: state.content.get('get-help_ingredientissues_pageheader_header')
    || 'Get help with your box',
    body: state.content.get('get-help_ingredientissues_pagecontent_copy')
    || 'Please let us know what was wrong with the ingredient(s)',
    button1Copy: state.content.get('get-help_ingredientissues_pagecontent_button1copy')
    || 'back',
    button2Copy: state.content.get('get-help_ingredientissues_pagecontent_button2copy')
    || 'continue',
  },
  ingredients: getSelectedIngredients(state)
})

const IngredientIssuesContainer = connect(mapStateToProps)(IngredientIssues)

export {
  IngredientIssuesContainer
}
