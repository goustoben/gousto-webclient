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

  const token = {access_token: '8tebopinE7WiWTgDDGl92NhMYXLMCD9AUHfEsWcH'}
  const expiry = {expires_at: '2030-01-31T22:15:01.593Z'}
  const refresh = {refresh_token: "5lJLjJ67tJ5n8RIW2ZYohXTes4F47qEMtzZSI4HM"}
  const remember = {remember_me: true}

  const encode = cookieValue => encodeURIComponent(JSON.stringify(cookieValue))

  document.cookie=`v1_oauth_token=${encode(token)};path=/;`
  document.cookie=`v1_oauth_expiry=${encode(expiry)};path=/`
  document.cookie=`v1_oauth_refresh=${encode(refresh)};path=/`
  document.cookie=`v1_oauth_remember=${encode(remember)};path=/`
})
