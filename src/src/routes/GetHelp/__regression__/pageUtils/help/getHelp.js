export const clickAcceptCTA = () => {
  cy.get('[role=button]').contains('Accept').click()
}

export const clickCTABack = () => {
  cy.get('[data-testing="CTABack"]').click()
}

export const clickContactUsCTA = () => {
  cy.get('[role=button]').contains('Contact Us').click()
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
    cy.get('[data-testing="input-check"]').eq(index).click()
  })
}

export const selectOrderIssue = (issue) => {
  switch (issue) {
  case 'ingredient': {
    cy.get('[data-testing="getHelpIssuesIngredient"] a').click()
    break
  }
  case 'delivery': {
    cy.get('[data-testing="getHelpIssuesDelivery"] a').click()
    break
  }
  default: {
    throw new Error('selectOrderIssue: unkown issue')
  }
  }
}
