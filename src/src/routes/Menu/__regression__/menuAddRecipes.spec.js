const PAGE_URL = 'menu'

const getRecipes = (win) => (
  win.__store__.getState().basket.get('recipes').toArray()
)

describe('Given I am a logged out user', () => {
  describe('When I land on the menu', () => {
    before(() => {
      cy.server()
      const DATE = new Date(2020, 4, 1).getTime()
      cy.clock(DATE, ['Date'])
      cy.route('GET', 'boxPrices', 'fixture:boxPrices/priceNoPromocode.json').as('getBoxPrice')
      cy.route('GET', 'brand/v1/theme', 'fixture:brand/brand.json').as('getBrand')
      cy.route('GET', 'brand/v1/menu-headers', 'fixture:brand/brandHeaders.json')
      cy.route('GET', 'deliveries/v1.0/**', 'fixture:deliveries/deliveryDays.json').as('getDeliveryDays')
      cy.route('GET', 'delivery_day/**/stock', 'fixture:stock/deliveryDayStock.json').as('getStock')
      cy.route('/menu/v1/**', 'fixture:menu/twoWeeksDetails.json').as('getMenu')
      cy.visit(PAGE_URL)
      cy.wait(['@getMenu', '@getBrand', '@getStock', '@getDeliveryDays'])
      cy.setupMenu({ platform: Cypress.env('platform') === 'mobile' ? 'MOBILE' : 'WEB' })
      cy.wait('@getDeliveryDays')
    })

    after(() => {
      cy.clock().then((clock) => {
        clock.restore()
      })
    })

    describe('And I click on “Add recipe“ for a given recipe', () => {
      before(() => {
        cy.get('[data-testing="menuRecipeAdd"]').first().click()
      })

      it('Then that recipe is added to my basket', () => {
        cy.window().then(getRecipes).then(
          recipes => recipes.length
        ).should('equal', 1)
      })
    })

    describe('And I click on “Add recipe“ for another recipe', () => {
      before(() => {
        cy.get('[data-testing="menuRecipeAdd"]').eq(4).click()
      })

      it('Then that recipe is also added to my basket', () => {
        cy.window().then(getRecipes).then(
          recipes => recipes.length
        ).should('equal', 2)
      })

      it('And the “checkout” CTA is enabled', () => {
        cy.get('[data-testing="boxSummaryButton"]').should('not.be.disabled')
      })
    })

    describe('And I’ve opened a detail screen for a recipe', () => {
      before(() => {
        cy.get('[data-testing="menuRecipeViewDetails"]').eq(3).click()
      })

      describe('And I click on “Add recipe“ for the selected recipe', () => {
        before(() => {
          cy.get('[data-testing="menuRecipeDetailsClose"]').first().find('[data-testing="menuRecipeAdd"]').click()
        })

        it('Then that recipe is added to my basket', () => {
          cy.window().then(getRecipes).then(
            recipes => recipes.length
          ).should('equal', 3)
        })
      })

      describe('And I click on “Add recipe“ for the selected recipe again', () => {
        before(() => {
          cy.get('[data-testing="menuRecipeDetailsClose"]').first().find('[data-testing="menuAddServings"]').eq(2)
            .click()
        })

        it('Then that recipe is added to my basket twice', () => {
          cy.window().then(getRecipes).then(
            recipes => recipes.length
          ).should('equal', 3)
        })
      })
    })

    describe('And I view the menu after 4 recipes have been added', () => {
      before(() => {
        cy.get('[data-testing="menuRecipeDetailsClose"]').eq(1).click()
      })

      it('Then the add recipe CTAs should be disabled', () => {
        cy.get('[data-testing="menuRecipeAddDisabled"]').first().should('exist')
      })
    })

    describe('And the menu has recipes out of stock', () => {
      it('Then the out of stock recipe menuRecipeAdd CTA should not exist', () => {
        cy.get('[data-testing="menuRecipeOutOfStock"]').find('[data-testing="menuRecipeAdd"]').should('not.exist')
      })
    })
  })
})
