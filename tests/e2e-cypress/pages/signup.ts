import Page from './page'

class Signup extends Page {
  visit() {
    cy.visit('/signup/box-size')
  }

  clickClaimDiscount() {
    cy.findByText('Claim discount').click()
  }

  clickChooseBox(size: 'regular' | 'large') {
    cy.findByText(`Choose ${size} box`).click()
  }

  clickConfirmDeliveryDay() {
    cy.findByText(/Select /).click()
  }

  clickSeeThisWeeksMenu() {
    cy.findByText(/See this week’s menu/i).click()
  }

  enterPostcode(postcode = this.defaultData.address.postcode) {
    cy.findByRole('textbox').type(postcode)
    cy.findByText('Continue').click()
  }
}

export const signup = new Signup()
