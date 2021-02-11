
export const setMocksLoginHomePage = () => {
  cy.fixture('user/userCurrent').as('userCurrent')
  cy.route('GET', /user\/current/, '@userCurrent').as('userCurrentRequest')
  cy.fixture('user/userCurrentActiveSubscription').as('userCurrentSubscription')
  cy.route('GET', /user\/current\/subscription/, '@userCurrentSubscription').as('userCurrentSubscriptionRequest')
  cy.fixture('getHelp/user/userCurrentOrders').as('userCurrentOrders')
  cy.route('GET', /user\/current\/orders/, '@userCurrentOrders').as('userCurrentOrdersRequest')

  cy.login()

  cy.visit('/')

  cy.wait(['@identifyRequest', '@userCurrentRequest'])
}
