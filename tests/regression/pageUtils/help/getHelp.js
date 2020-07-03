export const clickAcceptCTA = () => {
  cy.get('[role=button]').contains('Accept').click()
}

export const clickContinueCTA = () => {
  cy.get('[role=button]').contains('Continue').click()
}

export const clickSubmitCTA = () => {
  cy.get('[role=button]').contains('Submit').click()
}

export const expandRecipes = (recipeIndexes) => {
  recipeIndexes.forEach((index) => {
    cy.get('[data-testing="getHelpRecipe"]').eq(index).click()
  })
}

export const fillIngredientIssueDescriptions = (descriptions) => {
  descriptions.forEach((description, index) => {
    cy.get('textarea')
      .eq(index)
      .type(description)
  })
}

export const selectIngredients = (ingredientIndexes) => {
  ingredientIndexes.forEach((index) => {
    cy.get('[data-testing="getHelpIngredientInputCheck"] input').eq(index).check()
  })
}

export const selectOrderIssue = (issue) => {
  switch (issue) {
    case 'ingredient': {
      cy.get('[data-testing="getHelpIssuesIngredient"]').click()
      break
    }
    default: {
      throw new Error('selectOrderIssue: unkown issue')
    }
  }
}
