import { isPlatform, WEB } from '../../../../../../utils/regression/tags'

export const initialize = () => {
  cy.stubAll3rdParties()

  cy.loginV2()

  cy.visitAndWaitForClientSideReRender('/order-confirmation/13722513')

  cy.wait(['@user', '@currentOrder', '@productsCategories', '@productsStock', '@getMenu'])
}

export const stubMarketplace = (ageVerified = true) => {
  if (ageVerified) {
    cy.intercept('GET', '/user/current', { fixture: 'user/userCurrentAgeVerified.json' }).as('user')
  } else {
    cy.intercept('GET', '/user/current', { fixture: 'user/userCurrent.json' }).as('user')
  }
  cy.intercept('GET', '/user/current/raf-campaign-details', {
    fixture: 'user/userRafCampaignDetails.json',
  })
  cy.intercept('GET', '/user/current/balance', { fixture: 'user/userCurrentBalance.json' })
  cy.intercept('GET', '/user/current/orders**', { fixture: 'user/userCurrentOrders.json' })

  cy.intercept('GET', '/order/**', { fixture: 'user/userCurrentOrder.json' }).as('currentOrder')

  cy.intercept('GET', '/subscriptionquery/v1/subscriptions/17247344', {
    fixture: 'subscription/subscriptionQueryResponse.json',
  }).as('currentSubscription')

  cy.intercept('GET', '/customers/v1/customers/17247344/subscription/pause-reasons**', {
    fixture: 'customers/pauseReasons.json',
  })

  cy.intercept('GET', '/products/v2.0/products**', { fixture: 'product/products.json' }).as(
    'products',
  )
  cy.intercept('GET', '/products/v2.0/categories**', {
    fixture: 'product/productsCategories.json',
  }).as('productsCategories')
  cy.intercept('GET', '/products/stock', { fixture: 'product/productsStock.json' }).as(
    'productsStock',
  )

  cy.intercept('GET', '/menu/v1/**', { fixture: 'menu/twoWeeksDetails.json' }).as('getMenu')

  cy.intercept('/forget**', { statusCode: 200, body: '//Cypress forced no-op' })
  cy.intercept('https://www.ribbonapp.com/**', { statusCode: 200, body: '//Cypress forced no-op' })
}

export const stubUserAndOrders = () => {
  cy.intercept('POST', '/user/current', { fixture: 'user/userCurrent.json' }).as('user')
  cy.intercept('GET', '/order/**', { fixture: 'user/userCurrentOrder.json' }).as('currentOrder')
}

export const marketVisible = () => {
  cy.get('[data-testid="MarketPresentation"]').should('be.visible')
}

export const marketAddProduct = (name, ageVerified = false, index = 0) => {
  cy.get('[data-testing="productItem"]').eq(index).contains(name)
  cy.get('[data-testing="productItem"]').eq(index).contains('Add').click()
  if (!ageVerified) {
    cy.contains('div', "Yes, I'm over 18").click()
  }
  cy.get('[data-testing="productItem"]').eq(index).contains(/^1$/)
}

export const marketAddAndRemoveLimitReachedProduct = (index = 0) => {
  const addButton = cy.get('[data-testing="productItem"]').eq(index).contains('span', '+').parent()

  addButton.click().should('have.class', 'disabled')

  if (isPlatform(WEB)) {
    cy.get('[data-testing="item-product-minus"]').click()
    addButton.should('not.have.class', 'disabled')
  } else {
    cy.contains('span', '-').click()
  }
}

export const marketUpdateAddProductOrder = () => {
  cy.intercept('POST', '/order/13722513/update-items', {
    fixture: 'user/userCurrentProductOrder.json',
  }).as('updateItem')
  cy.get('[data-testing="updateOrder"]').click({ multiple: true, force: true })
  cy.wait(['@updateItem', '@currentOrder'])
}

export const marketUpdateRemoveProductOrder = () => {
  cy.intercept('POST', '/order/13722513/update-items', {
    fixture: 'user/userCurrentOrder.json',
  }).as('updateItem')
  cy.get('[data-testing="updateOrder"]').click({ multiple: true, force: true })
  cy.wait(['@updateItem', '@currentOrder'])
}

export const marketOrderSummaryContainsProduct = (name) => {
  cy.get('[data-testing="item-product"]').contains(name)
}
