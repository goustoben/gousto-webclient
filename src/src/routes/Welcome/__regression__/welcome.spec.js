describe('Given I am logged in', () => {
  beforeEach(() => {
    cy.stubAll3rdParties()
    cy.server()
    cy.fixture('user/userCurrent').as('userCurrent')
    cy.route('GET', /user\/current/, '@userCurrent').as('userCurrentRequest')
    cy.fixture('user/userCurrentProjectedDeliveries').as('userCurrentProjectedDeliveries')
    cy.route('GET', /user\/current\/projected-deliveries/, '@userCurrentProjectedDeliveries').as('projectedDeliveries')
    cy.fixture('user/userCurrentActiveSubscription').as('userCurrentSubscription')
    cy.fixture('getHelp/user/userCurrentOrders').as('userCurrentOrders')
    cy.fixture('welcome/order/order26May20_open').as('orderFixture')
    cy.route('GET', 'brand/v1/theme', 'fixture:brand/brand.json')
    cy.route('GET', 'brand/v1/menu-headers', 'fixture:brand/brandHeaders.json')
    cy.route('GET', /customers\/v1\/customers\/17247344\/subscription\/pause-reasons/, {
      data: [],
    }).as('pauseReasons')
    cy.route('GET', /order\/16269494/, '@orderFixture')
    cy.route('GET', /user\/current\/orders/, '@userCurrentOrders')
    cy.route('GET', '/menu/**', 'fixture:menu/twoWeeksDetails.json')
    cy.route('GET', '/deliveries/v1.0/**', 'fixture:deliveries/deliveryDays.json')
    cy.fixture('boxPrices/priceNoPromocode').as('boxPrices')
    cy.route('GET', '/boxPrices', '@boxPrices')

    cy.login()
  })

  describe('When I am on the /welcome-to-gousto page', () => {
    it('shows app promo, order schedule, and raf sections', () => {
      cy.visit('/welcome-to-gousto/16269494')
      cy.wait(['@identifyRequest', '@userCurrentRequest'], { timeout: 50000 })
      cy.get('[data-testing="appPromo"]').should('exist')
      cy.get('[data-testing="referAFriendSection"]').should('exist')
      cy.get('[data-testing="orderScheduleContainer"]').should('exist')
    })
  })
})
