// // ***********************************************
// // For examples of custom
// // commands please read more here:
// // https://on.cypress.io/custom-commands
// // ***********************************************
Cypress.Commands.add('mockDate', () => {
  const DATE = new Date(2020, 4, 1).getTime()
  cy.clock(DATE, ['Date'])
})

Cypress.Commands.add('login', () => {
  cy.server()
  cy.fixture('auth/login').as('login')
  cy.route('POST', /login/, '@login')
  cy.fixture('auth/identify').as('identify')
  cy.route('POST', /identify/, '@identify').as('identifyRequest')
  cy.fixture('auth/refresh').as('refresh')
  cy.route('POST', /refresh/, '@refresh')
  cy.route('POST', /log-event/, {})

  const token = { access_token: '8tebopinE7WiWTgDDGl92NhMYXLMCD9AUHfEsWcH' }
  const expiry = { expires_at: '2030-01-31T22:15:01.593Z' }
  const refresh = { refresh_token: "5lJLjJ67tJ5n8RIW2ZYohXTes4F47qEMtzZSI4HM" }
  const remember = { remember_me: true }

  const encode = cookieValue => encodeURIComponent(JSON.stringify(cookieValue))

  document.cookie = `v1_oauth_token=${encode(token)};path=/;`
  document.cookie = `v1_oauth_expiry=${encode(expiry)};path=/`
  document.cookie = `v1_oauth_refresh=${encode(refresh)};path=/`
  document.cookie = `v1_oauth_remember=${encode(remember)};path=/`
})

Cypress.Commands.add('checkoutLoggedOut', ({ withDiscount }) => {
  const pricesFixtureFile = withDiscount
    ? 'prices/2person2portionDiscount'
    : 'prices/2person2portionNoDiscount'

  const DATE = new Date(2020, 4, 1).getTime()
  cy.server()
  cy.clearCookies()
  cy.route('GET', /boxPrices|prices/, `fixture:${pricesFixtureFile}.json`).as('getPrices')
  cy.route('GET', /intervals/, 'fixture:customers/intervals.json').as('getIntervals')
  cy.route('POST', /order\/preview/, 'fixture:order/preview.json').as('previewOrder')
  cy.route('GET', /promo_code=DTI-SB-5030/, 'fixture:prices/2person2portionDiscount.json').as('pricesDiscount')
  cy.route('GET', 'brand/v1/theme', 'fixture:brand/brand.json').as('getBrand')
  cy.route('GET', 'deliveries/v1.0/days**', 'fixture:deliveries/deliveryDays.json').as('getDeliveryDays')
  cy.route('GET', 'delivery_day/**/stock', 'fixture:stock/deliveryDayStock.json').as('getStock')
  cy.route('GET', 'brand/v1/menu-headers', 'fixture:brand/brandHeaders.json')
  cy.route('GET', '/menu/**', 'fixture:menu/twoWeeksDetails.json').as('getMenu')
  cy.route('GET', '/userbucketing/v1/user/experiments', 'fixture:userbucketing/userbucketing.json').as('getExperiments')
  cy.visit('/')
  cy.clock(DATE, ['Date'])
  cy.wait(['@getMenu', '@getBrand', '@getStock'])
})

Cypress.Commands.add('setupMenu', ({ platform }) => {
  const POSTCODE = 'W3 7UP'

  if (platform === 'WEB') {
    // Try to add a recipe
    cy.get('[data-testing="menuRecipeAdd"]').eq(0).click()
    cy.get('[data-testing="menuBrowseCTAButton"]').last().click()
  } else {
    // Try to add a recipe
    cy.get('[data-testing="menuRecipeAdd"]').eq(0).click()
    cy.get('div').contains('Get Started').click()
  }

  // Add Postcode
  cy.get('[data-testing="menuPostcodeInput"]').click().type(`${POSTCODE}{enter}`)
  cy.wait('@getDeliveryDays')
  cy.get('[data-testing="boxSummaryContinueButton"]').click()
})

Cypress.Commands.add('proceedToCheckout', ({ platform }) => {
  const POSTCODE = 'W3 7UP'

  if (platform === 'WEB') {
    // Go to /menu
    cy.get("[href='/menu']").first().click()
    
    // Try to add a recipe
    cy.get('[data-testing="menuRecipeAdd"]').eq(0).click()
    cy.get('[data-testing="menuBrowseCTAButton"]').last().click()
  } else {
    // Go to /menu
    cy.get('[data-testing="burgerMenu"]').click()
    cy.get("[href='/menu'] > li").first().click()

    // Try to add a recipe
    cy.get('[data-testing="menuRecipeAdd"]').eq(0).click()
    cy.get('div').contains('Get Started').click()
  }

  // Add Postcode
  cy.get('[data-testing="menuPostcodeInput"]').click().type(`${POSTCODE}{enter}`)
  cy.wait('@getDeliveryDays')
  cy.get('[data-testing="boxSummaryContinueButton"]').click()

  // Add recipes after adding postcode
  cy.get('[data-testing="menuRecipeAdd"]').eq(0).click()
  cy.get('[data-testing="menuRecipeAdd"]').eq(1).click()

  // Go to /checkout
  if (platform === 'WEB') {
    cy.get('[data-testing="boxSummaryButton"]').last().click()
  } else {
    cy.get('[data-testing="boxSummaryButton"]').first().click()
  }
  
  cy.wait(['@getIntervals', '@getStock', '@getPrices', '@previewOrder'])
})

Cypress.Commands.add('visitSubscriptionSettingsPage', ({ isSubscriptionActive }) => {
      cy.server()
      cy.fixture('user/userCurrent').as('userCurrent')
      cy.route('GET', /user\/current/, '@userCurrent')

      if(isSubscriptionActive) {
        cy.route('GET', /user\/current\/subscription/, 'fixture:user/userCurrentActiveSubscription.json').as('currentActiveSubscription')
      } else {
        cy.route('GET', /user\/current\/subscription/, 'fixture:user/userCurrentPausedSubscription.json').as('currentPausedSubscription')
      }

      cy.fixture('user/userCurrentOrders').as('userCurrentOrders')
      cy.route('GET', /user\/current\/orders/, '@userCurrentOrders').as('currentOrders')

      cy.fixture('user/userAddresses').as('userAdresses')
      cy.route('GET', '/customers/v1/customers/17247344/addresses', '@userAdresses')

      cy.route('GET', /boxPrices|prices/, 'fixture:boxPrices/priceWithPromoCode.json').as('getPrices')

      cy.route('GET', /^(?=.*\bdeliveries\/v1.0\/days\b).*$/, 'fixture:deliveries/deliveryDays.json').as('deliveryDays')

      cy.fixture('user/userCurrentProjectedDeliveries').as('userCurrentProjectedDeliveries')
      cy.route('GET', /user\/current\/projected-deliveries/, '@userCurrentProjectedDeliveries').as('projectedDeliveries')

      cy.fixture('user/userCurrentAddress').as('userCurrentAddress')
      cy.route('GET', /user\/current\/address/, '@userCurrentAddress')

      cy.route('PUT', /user\/current\/subscription\/activate/, 'fixture:user/userCurrentActivateSubscription.json').as('currentActivateSubscription')

      cy.visit('/subscription-settings')

      if (isSubscriptionActive) {
        cy.wait('@currentActiveSubscription')
      } else {
        cy.wait('@currentPausedSubscription')
      }
      cy.wait('@deliveryDays')
})
