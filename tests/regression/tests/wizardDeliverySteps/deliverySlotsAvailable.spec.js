describe("Given I land on the delivery step of the wizard", () =>{
  const DATE = new Date(2020, 4, 1).getTime()
  const getTempDate = (win) => {
    return win.__store__.getState().temp.get('date')
  }
  const getCTA = $el => $el.find('[data-testing="signupDeliveryCTA"]')
  const getDropDown = $el => $el.find('[data-testing="signupDeliveryDay"]')
  const selectDate = () => {
    if(Cypress.env('platform') === 'mobile'){
      cy.get('body')
        .pipe(getDropDown)
        .click()
        .get('select')
        .eq(0)
        .select("\"2020-05-05\"")
    } else {
      cy.get('body')
        .pipe(getDropDown)
        .click()
        .get('.Select-option')
        .eq(1)
        .click()
    }
  }

  before(() => {
    cy.server()
    cy.clock(DATE, ['Date'])
    cy.route('/menu/v1/**', 'fixture:menu/twoWeeksDetails.json').as('getMenu')
    cy.route('GET', 'brand/v1/theme', 'fixture:brand/brand.json').as('getBrand')
    cy.route('GET', 'brand/v1/menu-headers', 'fixture:brand/brandHeaders.json')
    cy.route('GET', 'delivery_day/**/stock', 'fixture:stock/deliveryDayStock.json').as('getStock')
    cy.route('GET', 'deliveries/v1.0/**', 'fixture:deliveries/deliveryDays.json').as('getDeliveriesAvailable')
    cy.visit('/signup/?steps=delivery')
  })

  describe('When all delivery slots are available', () => {
    it("Then it should store the slot I pick", () => {
      cy.wait(['@getDeliveriesAvailable'])
      selectDate()
      cy.window().then(getTempDate).should('equal', '2020-05-05')
    })

    it("And it should display the CTA", () => {
      cy.get('body')
        .pipe(getCTA)
    })
  })
})
