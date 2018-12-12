import { connect } from 'react-redux'

import { fetchIngredientIssues } from 'actions/getHelp'
import { IngredientIssues } from './IngredientIssues.logic'

const getSelectedIngredients = (state) => {
  const selectedRecipePlusIngredients = state.getHelp.get('selectedIngredients')
  const selectedIngredientPlusRecipeIds = selectedRecipePlusIngredients.map(
    ingredientAndRecipe =>
      `${ingredientAndRecipe.get('recipeId')}-${ingredientAndRecipe.get('ingredientId')}`
  )
  const recipes = state.getHelp.get('recipes')
  const selectedIngredients = []
  recipes.forEach(recipe => {
    recipe.get('ingredients').forEach(ingredient => {
      if (selectedIngredientPlusRecipeIds.includes(
        `${recipe.get('id')}-${ingredient.get('id')}`)
      ) {
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
  ingredients: getSelectedIngredients(state),
  issues: state.getHelp.get('ingredientIssues').toJS(),
  subIssues: state.getHelp.get('ingredientSubIssues').toJS(),
})

const IngredientIssuesContainer = connect(mapStateToProps, {
  fetchIngredientIssues,
})(IngredientIssues)

export {
  IngredientIssuesContainer
}
