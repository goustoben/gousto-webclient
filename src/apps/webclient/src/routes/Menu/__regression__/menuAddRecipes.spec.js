import { withPlatformTags, MOBILE, WEB } from '../../../utils/regression/tags'

const PAGE_URL = 'menu'

const getRecipes = (win) => win.__store__.getState().basket.get('recipes').toArray()

describe('Given I am a logged out user', () => {
  describe('When I land on the menu', () => {
    before(() => {
      cy.stubAll3rdParties()
      cy.server()
      cy.mockDate()
      cy.route('GET', 'boxPrices', 'fixture:boxPrices/priceNoPromocode.json').as('getBoxPrice')
      cy.route('GET', 'brand/v1/theme', 'fixture:brand/brand.json').as('getBrand')
      cy.route('GET', 'brand/v1/menu-headers', 'fixture:brand/brandHeaders.json')
      cy.route('GET', 'deliveries/v1.0/**', 'fixture:deliveries/deliveryDays.json').as(
        'getDeliveryDays',
      )
      cy.route('GET', 'delivery_day/**/stock', 'fixture:stock/deliveryDayStock.json').as('getStock')
      cy.route('GET', '/menu/v1/**', 'fixture:menu/twoWeeksDetails.json').as('getMenu')
      cy.route(
        'GET',
        '/userbucketing/v1/user/experiments',
        'fixture:userbucketing/userbucketing.json',
      ).as('getExperiments')
      cy.route('GET', '/promocode/**', 'fixture:promoCode/promoCodeDetails').as('promoCodeDetails')
      cy.visit(PAGE_URL)
      cy.wait(['@getMenu', '@getBrand', '@getStock', '@getDeliveryDays'])
      cy.applyPromoCode()
      cy.setupMenu({ platform: Cypress.env('platform') === 'mobile' ? 'MOBILE' : 'WEB' })
      cy.wait('@getDeliveryDays')
    })

    after(() => {
      cy.clock().then((clock) => {
        clock.restore()
      })
    })

    describe('And I look for the menu date range on the page', () => {
      withPlatformTags(WEB).it('Then it should be visible for desktop', () => {
        cy.get('[data-testing="menuDateRange-desktop"]').should(
          'have.text',
          'Menu for May 02 - May 08',
        )

        cy.get('[data-testing="menuDateRange-mobile"]').should('not.be.visible')
      })

      withPlatformTags(MOBILE).it('Then it should be visible for mobile', () => {
        cy.get('[data-testing="menuDateRange-mobile"]').should(
          'have.text',
          'Menu for May 02 - May 08',
        )

        cy.get('[data-testing="menuDateRange-desktop"]').should('not.be.visible')
      })
    })

    describe('And I click on “Add recipe“ for a given recipe', () => {
      before(() => {
        cy.get('[data-testing="menuRecipeAdd"]').first().click()
      })

      it('Then that recipe is added to my basket', () => {
        cy.window()
          .then(getRecipes)
          .then((recipes) => recipes.length)
          .should('equal', 1)
      })
    })

    describe('And I click on “Add recipe“ for another recipe', () => {
      before(() => {
        cy.get('[data-testing="menuRecipeAdd"]').eq(4).click()
      })

      it('Then that recipe is also added to my basket', () => {
        cy.window()
          .then(getRecipes)
          .then((recipes) => recipes.length)
          .should('equal', 2)
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
          cy.get('[data-testing="menuRecipeDetailsClose"]')
            .first()
            .find('[data-testing="menuRecipeAdd"]')
            .click()
        })

        it('Then that recipe is added to my basket', () => {
          cy.window()
            .then(getRecipes)
            .then((recipes) => recipes.length)
            .should('equal', 3)
        })
      })

      describe('And I click on “Add recipe“ for the selected recipe again', () => {
        before(() => {
          cy.get('[data-testing="menuRecipeDetailsClose"]')
            .first()
            .find('[data-testing="menuAddServings"]')
            .eq(2)
            .click()
        })

        it('Then that recipe is added to my basket twice', () => {
          cy.window()
            .then(getRecipes)
            .then((recipes) => recipes.length)
            .should('equal', 3)
        })
      })
    })

    describe('And I click on “Add recipe“ for 5th recipe', () => {
      before(() => {
        cy.get('[data-testing="menuRecipeDetailsClose"]').eq(1).click()
        cy.get('[data-testing="menuRecipeAdd"]').eq(2).click()
      })

      it('Then 5th recipe is added to my basket', () => {
        // Recipes count is still be 4 as same recipe is added for 4 portions which makes it 5 in total.
        cy.window().then(getRecipes).then(
          recipes => recipes.length
        ).should('equal', 4)
      })
    })

    describe('And I view the menu after 5 recipes have been added', () => {
      it('Then the add recipe CTAs should be disabled', () => {
        cy.get('[data-testing="menuRecipeAddDisabled"]').first().should('exist')
      })
    })

    describe('And the menu has recipes out of stock', () => {
      it('Then the out of stock recipe menuRecipeAdd CTA should not exist', () => {
        cy.get('[data-testing="menuRecipeOutOfStock"]')
          .find('[data-testing="menuRecipeAdd"]')
          .should('not.exist')
      })
    })
  })
})
