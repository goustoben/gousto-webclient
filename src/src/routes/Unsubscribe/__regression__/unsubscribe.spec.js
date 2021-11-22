const CONFIRM_UNSUBSCRIBE_ELEMENT_SELECTOR = '[data-testing="confirm-unsubscribe"]'

describe('Unsubscribing from marketing emails', () => {
  describe('Given I click an unsubscribe link that Gousto provided to me', () => {
    before(() => {
      cy.configureEmulationState({
        users: [{
          authUserId: 'the-auth-user-id',
          marketingUnsubscribeToken: 'the-marketing-unsubscribe-token'
        }]
      })

      cy.stubAll3rdParties()

      cy.serverWithEmulatedPaths(unsubscribeApiPathFor({authUserId: 'the-auth-user-id', marketingType: 'unsubscribe_emails'}))

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
      cy.configureEmulationState({
        users: [{
          authUserId: 'the-auth-user-id',
          marketingUnsubscribeToken: 'the-marketing-unsubscribe-token'
        }]
      })

      cy.stubAll3rdParties()

      cy.serverWithEmulatedPaths(unsubscribeApiPathFor({authUserId: 'non-existent-auth-user-id', marketingType: 'unsubscribe_emails'}))

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

  after(() => cy.resetEmulatedPaths())
})

function unsubscribeApiPathFor({authUserId, marketingType}) {
  return `/user/${authUserId}/marketing/${marketingType}`
}

function unsubscribeUrlPathFor({authUserId, marketingType, marketingUnsubscribeToken}) {
  return `/unsubscribe?authUserId=${authUserId}&marketingType=${marketingType}&marketingUnsubscribeToken=${marketingUnsubscribeToken}`
}
