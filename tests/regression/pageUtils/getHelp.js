export const clickPrimaryCTA = () => {
  cy.get('[class^=BottomBar__bottomBar] [class^=Button__container]').eq(1).click()
}

export const expandRecipes = (recipeIndexes) => {
  recipeIndexes.forEach((index) => {
    cy.get('[data-testing="getHelpRecipe"]').eq(index).click()
  })
}

export const fillIngredientIssueDescriptions = (descriptions) => {
  descriptions.forEach((description, index) => {
    cy.get('[class^=IngredientReasons__issueDetails] textarea')
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
