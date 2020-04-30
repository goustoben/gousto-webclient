// // ***********************************************
// // For examples of custom
// // commands please read more here:
// // https://on.cypress.io/custom-commands
// // ***********************************************

Cypress.Commands.add('login', () => {
  cy.server()
  cy.fixture('auth/login').as('login')
  cy.route('POST', /login/, '@login')
  cy.fixture('auth/identify').as('identify')
  cy.route('POST', /identify/, '@identify')
  cy.fixture('auth/refresh').as('refresh')
  cy.route('POST', /refresh/, '@refresh')

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

Cypress.Commands.add('goToCheckoutFlow', (withDiscount = false) => {
  const recipes = '{"2328": 2}'
  const pricesFixtureFile = withDiscount ? 'prices/2person2portionDiscount' : 'prices/2person2portionNoDiscount'

  cy.server()
  cy.fixture('boxPrices/priceNoPromocode').as('boxPrices')
  cy.route('GET', /boxPrices/, '@boxPrices')
  cy.fixture('order/preview').as('previewOrder')
  cy.route('POST', /order\/preview/, '@previewOrder').as('previewOrder')
  cy.fixture(pricesFixtureFile).as('prices')
  cy.route('GET', /promo_code=&/, '@prices').as('prices')

  cy.setCookie('v1_goustoStateStore_basket_numPortions', "2")
  cy.setCookie('v1_goustoStateStore_basket_postcode', encodeURIComponent('"W3 7UP"'))
  cy.setCookie('v1_goustoStateStore_basket_recipes', encodeURIComponent(JSON.stringify(recipes)))

  // Due to server side rendering, we currently need to go to the menu and choose a REAL date before checkout.
  // Checkout fetch data gets the menu days and checks that the date and slot are present in the response.
  // If not present the user is redirected to the menu.
  // If we store a incorrect date/slot in a cookie then this is an infinite loop
  cy.visit('/menu')

  cy.get('[data-testing="boxSummaryContinueButton"]').click()

  cy.visit('/check-out')
  cy.wait(['@previewOrder', '@prices'])
})

