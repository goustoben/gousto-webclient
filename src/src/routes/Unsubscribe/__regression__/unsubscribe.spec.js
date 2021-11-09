const CONFIRM_UNSUBSCRIBE_ELEMENT_SELECTOR = '[data-testing="confirm-unsubscribe"]'
const axios = require('axios')

describe('Unsubscribing from marketing emails', () => {
  describe('Given I click an unsubscribe link that Gousto provided to me', () => {
    before(() => {
      configureEmulationState({
        users: [{
          authUserId: 'the-auth-user-id',
          marketingUnsubscribeToken: 'the-marketing-unsubscribe-token'
        }]
      })

      cy.stubAll3rdParties()

      cy.server({ignore: xhr => xhr.url === unsubscribeApiPathFor({authUserId: 'the-auth-user-id', marketingType: 'unsubscribe_emails'})})

      cy.visit(unsubscribeUrlPathFor({
        authUserId: 'the-auth-user-id',
        marketingType: 'unsubscribe_emails',
        marketingUnsubscribeToken: 'the-marketing-unsubscribe-token'
      }))
    })

    describe('And I confirm I want to unsubscribe', () => {
      before(() => {
        cy.get(CONFIRM_UNSUBSCRIBE_ELEMENT_SELECTOR).click()
      })

      it('Then I see the post-unsubscribe call to action', () => {
        cy.get('[data-testing="post-unsubscribe-cta"]')
      })
    })
  })

  describe('Given I click an unsubscribe link for a non-existent user', () => {
    before(() => {
      configureEmulationState({
        users: [{
          authUserId: 'the-auth-user-id',
          marketingUnsubscribeToken: 'the-marketing-unsubscribe-token'
        }]
      })

      cy.stubAll3rdParties()

      cy.server({ignore: xhr => xhr.url === unsubscribeApiPathFor({authUserId: 'non-existent-auth-user-id', marketingType: 'unsubscribe_emails'})})

      cy.visit(unsubscribeUrlPathFor({
        authUserId: 'non-existent-auth-user-id',
        marketingType: 'unsubscribe_emails',
        marketingUnsubscribeToken: 'the-marketing-unsubscribe-token'
      }))
    })

    describe('And I confirm I want to unsubscribe', () => {
      before(() => {
        cy.get(CONFIRM_UNSUBSCRIBE_ELEMENT_SELECTOR).click()
      })

      it('Then I see an error message rather than the post-unsubscribe call to action', () => {
        cy.contains('error')
        cy.get('[data-testing="post-unsubscribe-cta"]').should('not.exist')
      })
    })
  })
})

function configureEmulationState(state) {
  axios.put(`${Cypress.env('GOUSTO_SERVICE_EMULATION_BASE_URL')}/_config/state`, state)
}

function unsubscribeApiPathFor({authUserId, marketingType}) {
  return `${Cypress.env('GOUSTO_SERVICE_EMULATION_BASE_URL')}/user/${authUserId}/marketing/${marketingType}`
}

function unsubscribeUrlPathFor({authUserId, marketingType, marketingUnsubscribeToken}) {
  return `/unsubscribe?authUserId=${authUserId}&marketingType=${marketingType}&marketingUnsubscribeToken=${marketingUnsubscribeToken}`
}
