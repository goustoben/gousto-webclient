export const initialize = () => {
  cy.stubAll3rdParties()

  cy.loginV2()

  cy.intercept('POST', '/loggingmanager/log*', { fixture: 'loggingmanager/log.json' })

  cy.intercept('GET', '/user/current*', { fixture: 'user/userCurrent.json' })

  cy.intercept('GET', '/user/current/orders*', { fixture: 'user/userCurrentOrders.json' })

  cy.intercept('GET', '/user/current/address*', { fixture: 'user/userCurrentAddress.json' })

  cy.intercept('GET', '/subscriptionquery/v1/projected-deliveries*', { fixture: 'subscription/projectedDeliveries.json' })

  cy.intercept('GET', '/subscriptionquery/v1/subscriptions*', { fixture: 'subscription/subscriptionQueryResponse.json' })

  cy.intercept('GET', '/userfeedback/v1/feedback', { fixture: 'user/userFeedback.json'})

  cy.intercept('GET', '/user/current/referralDetails*', { fixture: 'user/userCurrentReferralDetails.json' })

  cy.intercept('GET', '/recipes/v2/recipes*', { fixture: 'recipes/recipes.json'}).as('recipes')

  cy.visitAndWaitForClientSideReRender('/my-gousto')
}
