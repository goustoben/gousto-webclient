describe('given customer is on the signup/box-size page', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('/signup/box-size')
  })

  it('should have 2 and 4 portions buttons', () => {
    cy.get('[data-testing="signupBoxSize2Portions"]').should('be.visible')
    cy.get('[data-testing="signupBoxSize4Portions"]').should('be.visible')
  })

  describe('when 2 portions button is clicked', () => {
    it('should take a user to postcode', () => {
      cy.get('[data-testing="signupBoxSize2Portions"]').click()
      cy.url().should('include', '/signup/postcode')
    })
  })

  describe('when 4 portions button is clicked', () => {
    it('should take a user to postcode', () => {
      cy.get('[data-testing="signupBoxSize4Portions"]').click()
      cy.url().should('include', '/signup/postcode')
    })
  })
})
