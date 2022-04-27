export const initialize = ({ isEligibleFor5Recipes }) => {
  cy.stubAll3rdParties()

  cy.loginV2()

  cy.intercept('GET', /user\/current/, { fixture: 'user/userCurrent.json' }).as('user')

  cy.intercept('GET', /user\/current\/orders/, { fixture: 'user/userCurrentOrdersAllStates.json' }).as('currentOrders')

  cy.intercept('GET', /subscriptionquery\/v1\/projected-deliveries\/(.*)/, { fixture: 'subscription/projectedDeliveries.json' }).as('projectedDeliveries')

  cy.intercept('GET', /user\/current\/address/, { fixture: 'user/userCurrentAddress.json' }).as('currentAddress')

  cy.intercept('GET', /subscriptionquery\/v1\/subscriptions\/(.*)/, { fixture: 'subscription/subscriptionQueryResponse.json' }).as('currentSubscription')

  cy.intercept('GET', '/customers/v1/customers/17247344/addresses', { fixture: 'user/userAddresses.json' })

  cy.intercept('GET', /orderskiprecovery/, { fixture: 'orderSkipRecovery.json' })

  cy.intercept('POST', /subscriptioncommand\/v1\/subscriptions\/(.*)\/skip?/, { fixture: 'subscription/subscriptionUpdateResponse.json' }).as('skipDates')

  cy.intercept('POST', /subscriptioncommand\/v1\/subscriptions\/(.*)\/unskip?/, { fixture: 'subscription/subscriptionUpdateResponse.json' }).as('unSkipDates')

  cy.intercept('DELETE', '**/order/**', {statusCode: 204}).as('cancelPendingOrder')

  cy.intercept('GET', /delivery_day(.*)/, {})

  if (isEligibleFor5Recipes) {
    cy.intercept('GET', '/menu/**', { fixture: 'menu/v1/eligible5RecipeResponse.json' } ).as('getEligible5RecipesMenu')
  } else {
    cy.intercept('GET', '/menu/**', { fixture: 'menu/v1/ineligible5RecipeResponse.json' } ).as('getIneligible5RecipesMenu')
  }

  cy.visitAndWaitForClientSideReRender('/my-deliveries')

  if (isEligibleFor5Recipes) {
    cy.wait('@getEligible5RecipesMenu')
  } else {
    cy.wait('@getIneligible5RecipesMenu')
  }

  cy.wait(['@currentOrders', '@user', '@projectedDeliveries', '@currentSubscription'])
}
