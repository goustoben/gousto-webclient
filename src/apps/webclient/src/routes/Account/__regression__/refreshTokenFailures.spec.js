describe('Refresh token failures', () => {
  describe('given api returns 401', () => {
    beforeEach(() => {
      cy.loginV2()

      cy.intercept('POST', /identify/, {
        statusCode: 401,
      })
      cy.intercept('POST', /refresh/, {
        statusCode: 401,
      }).as('updateRefreshToken')

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
    })

    it('should logout and redirect to login', () => {
      cy.wait('@updateRefreshToken')
      cy.get('ul li a').contains('Upcoming Deliveries').click()

      cy.get('[data-testid=modalClose]').should('be.visible')

      cy.location('href').should(
        'contains',
        '?target'
      )

      cy.location('href').should(
        'contains',
        'my-deliveries#login'
      )
    })
  })
})

