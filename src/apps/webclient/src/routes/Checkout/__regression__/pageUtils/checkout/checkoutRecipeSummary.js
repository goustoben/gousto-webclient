import { getStore } from './checkoutGeneralUtils'

export const addRecipeDispatch = () => {
  cy.window().then(getStore).invoke('dispatch', {
    type: 'BASKET_RECIPE_ADD',
    recipeId: '2413',
  })
}

export const showOrderSummary = () => {
  if (Cypress.env().platform === 'mobile') {
    cy.get('[data-testing="checkoutOrderSummary"]').eq(0).click()
  }
}
