function setLoginCookies() {
  const token = { access_token: '8tebopinE7WiWTgDDGl92NhMYXLMCD9AUHfEsWcH' }
  const expiry = { expires_at: '2030-01-31T22:15:01.593Z' }
  const refresh = { refresh_token: "5lJLjJ67tJ5n8RIW2ZYohXTes4F47qEMtzZSI4HM" }
  const remember = { remember_me: true }

  const encode = cookieValue => encodeURIComponent(JSON.stringify(cookieValue))

  document.cookie = `v1_oauth_token=${encode(token)};path=/;`
  document.cookie = `v1_oauth_expiry=${encode(expiry)};path=/`
  document.cookie = `v1_oauth_refresh=${encode(refresh)};path=/`
  document.cookie = `v1_oauth_remember=${encode(remember)};path=/`
}
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

  setLoginCookies()
})

Cypress.Commands.add('loginV2', () => {
  cy.intercept('POST', /login/, 'auth/login.json')
  cy.intercept('POST', /identify/, 'auth/identify.json')
  cy.intercept('POST', /refresh/, 'auth/refresh')
  cy.intercept('POST', /log-event/)

  setLoginCookies()
})

Cypress.Commands.add('checkoutLoggedOut', ({ withDiscount }) => {
  const pricesFixtureFile = withDiscount
    ? 'prices/2person2portionDiscount'
    : 'prices/2person2portionNoDiscount'

  cy.server()
  cy.clearCookies()
  cy.route('GET', /boxPrices|prices/, `fixture:${pricesFixtureFile}.json`).as('getPrices')
  cy.route('POST', /order\/preview/, 'fixture:order/preview.json').as('previewOrder')
  cy.route('GET', /promo_code=DTI-SB-5030/, 'fixture:prices/2person2portionDiscount.json').as('pricesDiscount')

  cy.route(
    'GET',
    /promocode\/DTI-SB-5030/,
    withDiscount
      ? 'fixture:promoCode/DTI-SB-5030-success.json'
      : 'fixture:promoCode/DTI-SB-5030-failure.json'
  ).as('getPromoCode')

  cy.route('GET', 'brand/v1/theme', 'fixture:brand/brand.json').as('getBrand')
  cy.route('GET', 'deliveries/v1.0/days**', 'fixture:deliveries/deliveryDays.json').as('getDeliveryDays')
  cy.route('GET', 'delivery_day/**/stock', 'fixture:stock/deliveryDayStock.json').as('getStock')
  cy.route('GET', 'brand/v1/menu-headers', 'fixture:brand/brandHeaders.json')
  cy.route('GET', '/menu/**', 'fixture:menu/twoWeeksDetails.json').as('getMenu')
  cy.route('GET', '/userbucketing/v1/user/experiments', 'fixture:userbucketing/userbucketing.json').as('getExperiments')

  cy.mockDate()

  cy.visit('/')

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

Cypress.Commands.add('applyPromoCode', () => {
  cy.get('[data-testing="promoModalButton"]').click()
})

Cypress.Commands.add('dismissPromoModal', () => {
  cy.get('[data-testing="promoModalButton"]').click()
})

Cypress.Commands.add('proceedToCheckout', ({ platform }) => {
  const POSTCODE = 'W3 7UP'

  if (platform === 'WEB') {
    // Go to /menu
    cy.get("[href='/menu']").first().click()
    cy.wait(['@getPromoCode'])
    cy.dismissPromoModal()

    // Try to add a recipe
    cy.get('[data-testing="menuRecipeAdd"]').eq(0).click()
    cy.get('[data-testing="menuBrowseCTAButton"]').last().click()
  } else {
    // Go to /menu
    cy.get('[data-testing="burgerMenu"]').click()
    cy.get("[href='/menu'] > li").first().click()
    cy.wait(['@getPromoCode'])
    cy.dismissPromoModal()

    // Try to add a recipe
    cy.get('[data-testing="menuRecipeAdd"]').eq(0).click()
    cy.get('div').contains('Get Started').click()
  }

  // This stops the `ndd` experiment from effecting our specs when running on staging
  cy.setFeatures([{ feature: 'ndd', value: false }])

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

  cy.wait(['@getStock', '@getPrices', '@previewOrder'])
})

Cypress.Commands.add('setFeatures', (features) => {
  cy.window()
    .then(win => {
      const dispatch = win.__store__.dispatch

      dispatch({
        type: 'FEATURES_SET',
        features
      })
    })
})

Cypress.Commands.add('visitSubscriptionSettingsPage', ({ isSubscriptionActive, features = [] }) => {
  cy.server()
  cy.route('POST', /identify/, 'fixture:auth/identify')
  cy.route('POST', /loggingmanager/, 'fixture:loggingmanager/log')

  cy.fixture('user/userCurrent').as('userCurrent')
  cy.route('GET', /user\/current/, '@userCurrent')

  if (isSubscriptionActive) {
    cy.route('GET', /subscriptionquery\/v1\/subscriptions\/(.*)/, 'fixture:subscription/subscriptionQueryResponse').as('subscriptionQueryResponse')
  } else {
    cy.route('GET', /subscriptionquery\/v1\/subscriptions\/(.*)/, 'fixture:subscription/inactiveSubscriptionQueryResponse').as('inactiveSubscriptionQueryResponse')
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

  cy.fixture('subscription/subscriptionUpdateResponse').as('subscriptionUpdateResponse')
  cy.route('POST', /subscriptioncommand\/v1\/subscriptions\/(.*)\/activate/, '@subscriptionUpdateResponse').as('activateSubscription')

  cy.visit('/subscription-settings')

  cy.setFeatures(features)

  if (isSubscriptionActive) {
    cy.wait('@subscriptionQueryResponse')
  } else {
    cy.wait('@inactiveSubscriptionQueryResponse')
  }

  cy.wait('@deliveryDays')
})

Cypress.Commands.add('interceptThirdPartyJS', (url, fixturePath, _as) => {
  return cy.readFile(
    `fixtures/${fixturePath}`,
    'utf8'
  ).then((stubResponse) => {
    return cy.intercept(url, (req) => {
      req.reply(stubResponse)
    });
  })
})

Cypress.Commands.add('interceptOptimizelyJavascript', () => cy.interceptThirdPartyJS(
  'https://cdn.optimizely.com/js/*.js',
  '3rd-party-scripts/optimizely/js/base_features_toggles.js')
)

Cypress.Commands.add('stubAll3rdParties', () => {
  cy.intercept('http://www.googletagmanager.com/**', { statusCode: 200, body: '//Cypress forced no-op', }).as('gtmNoOp')
  cy.intercept('https://logx.optimizely.com/**', { statusCode: 200, body: '//Cypress forced no-op', }).as('optimizelyLogNoOp')
  cy.intercept('https://**.facebook.net/**', { statusCode: 200, body: '//Cypress forced no-op', }).as('facebookNoOp')
  cy.intercept('http://widget.trustpilot.com/**', { statusCode: 200, body: '//Cypress forced no-op', }).as('trustpilotNoOp')
  cy.intercept('https://js.braintreegateway.com/**', { statusCode: 200, body: '//Cypress forced no-op', }).as('braintreeGatewayNoOp')
  cy.intercept('https://s3-gousto-staging-media.s3-eu-west-1.amazonaws.com/features.json**', {
    isRecaptchaEnabled: false
  }).as('disableRecaptcha')
})

Cypress.Commands.add('stubAllApis', () => {
  cy.intercept('https://**-api.gousto.info/**', { statusCode: 404, body: 'Cypress forced 404', })
})
