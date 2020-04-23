import { withPlatformTags, MOBILE, WEB } from '../../utils/tags'

describe('given customer is on the signup/postcode page', () => {
  const postcodeURL = '/signup/postcode'

  beforeEach(() => {
    cy.server()
    cy.visit(postcodeURL)
    cy.get('[data-testing="signupBoxSize2Portions"]')
      .should('be.visible')
      .click()
    cy.getDeliveryOptions()
  })

  it('should have an empty input and disabled button by default', () => {
    cy.get('[data-testing="signupPostcodeInput"]')
      .should('be.visible')
      .and('be.empty')
    cy.get('[data-testing="signupPostcodeCTADesktop"]').should('have.class','disabled')
  })

  describe('when postcode is filled out with proper value', () => {
    const deliveryOptionsURL = '/signup/delivery-options'

    beforeEach(() => {
      cy.get('[data-testing="signupPostcodeInput"]')
        .type('E1 7JB', { delay: 80 })
        .should('have.value', 'E1 7JB')
    })

    withPlatformTags(WEB).it('should take a user to a delivery options step when Continue button is clicked', () => {
      cy.get('[data-testing="signupPostcodeCTADesktop"]')
        .should('not.have.class','disabled')
        .click()

      cy.wait('@deliveries')
      cy.url().should('include', deliveryOptionsURL)
    })

    withPlatformTags(MOBILE).it('should take a user to a delivery options step when Next button is clicked', () => {
      cy.get('[data-testing="signupPostcodeCTAMobile"]')
        .should('not.have.class','disabled')
        .click()

      cy.wait('@deliveries')
      cy.url().should('include', deliveryOptionsURL)
    })
  })

  describe('when postcode is filled out with invalid data', () => {
    beforeEach(() => {
      cy.get('[data-testing="signupPostcodeInput"]')
        .type('W3', { delay: 80 })
        .should('have.value', 'W3')
    })

    withPlatformTags(WEB).it('should not take a user to the delivery step and disable Continue button', () => {
      cy.get('[data-testing="signupPostcodeCTADesktop"]')
        .should('be.visible')
        .click()

      cy.url().should('include', postcodeURL)
      cy.get('[data-testing="signupPostcodeCTADesktop"]').should('have.class','disabled')
    })

    withPlatformTags(MOBILE).it('should not take a user to the delivery step and disable Next button', () => {
      cy.get('[data-testing="signupPostcodeCTAMobile"]')
        .should('be.visible')
        .click()

      cy.url().should('include', postcodeURL)
      cy.get('[data-testing="signupPostcodeCTAMobile"]').should('have.class','disabled')
    })
  })
})
