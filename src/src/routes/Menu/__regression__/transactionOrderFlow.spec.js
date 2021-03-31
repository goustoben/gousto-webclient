import { withPlatformTags, WEB } from '../../../utils/regression/tags'

// eslint-disable-next-line no-underscore-dangle
const getRecipes = (win) => win.__store__.getState().basket.get('recipes').toArray()

describe('when the user is logged out', () => {
  describe('when the user navigate to the menu page', () => {
    before(() => {
      cy.mockDate()

      cy.server()

      cy.route(/user\/current/, 'fixture:user/userCurrent.json').as('userCurrent')
      cy.route(/user\/current\/projected-deliveries/, 'fixture:user/userCurrentProjectedDeliveries.json').as('projectedDeliveries')
      cy.route(/user\/current\/address/, 'fixture:user/userCurrentAddress.json').as('currentAddress')
      cy.route(/user\/current\/subscription/, 'fixture:user/userCurrentActiveSubscription.json').as('currentSubscription')
      cy.route('/customers/v1/customers/17247344/addresses', 'fixture:user/userAddresses.json')
      cy.route(/orderskiprecovery/, 'fixture:orderSkipRecovery.json')
      cy.route('POST', /user\/current\/subscription\/delivery\/disable/, 'fixture:user/userCurrentSubscriptionDelivery.json').as('cancelProjectedDelivery')
      cy.route('POST', /user\/(.*)\/subscription\/delivery\/enable/, 'fixture:user/userCurrentSubscriptionDelivery.json').as('restoreProjectedDelivery')
      cy.route('DELETE', /order/).as('cancelPendingOrder')
      cy.route(/prices/, 'fixture:prices/2person2portionNoDiscount.json').as('getPrices')
      cy.route('boxPrices', 'fixture:boxPrices/priceNoPromocode.json').as('getBoxPrice')
      cy.route('brand/v1/theme', 'fixture:brand/brand.json').as('getBrand')
      cy.route('brand/v1/menu-headers', 'fixture:brand/brandHeaders.json')
      cy.route('deliveries/v1.0/**', 'fixture:deliveries/deliveryDays.json').as('getDeliveryDays')
      cy.route('delivery_day/**/stock', 'fixture:stock/deliveryDayStock.json').as('getStock')
      cy.route(/menu\/v1/, 'fixture:menu/twoWeeksDetails.json').as('getMenu')
      cy.route('/userbucketing/v1/user/experiments', 'fixture:userbucketing/userbucketing.json').as('getExperiments')

      cy.login()

      cy.visit('/menu')

      cy.wait(['@getMenu', '@getBrand', '@identifyRequest', '@getStock'])

      cy.contains('Mon 4 May').click({ force: true })

      cy.wait(['@getDeliveryDays'])

      cy.get('[data-testing="dateSlot"]').eq(9).click()
      cy.get('[data-testing="boxSummaryContinueButton"]').click()

      cy.wait(['@identifyRequest'])
    })

    after(() => {
      cy.clock().then((clock) => {
        clock.restore()
      })
    })

    describe('when the user looks for the date range', () => {
      withPlatformTags(WEB).it('should be visible for desktop', () => {
        cy.contains('Menu for May')

        cy.get('[data-testing="menuDateRange-mobile"]')
          .should('not.be.visible')
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

    describe('when the user checks out', () => {
      before(() => {
        cy.server()

        // Mocks for creating a transactional order
        cy.route('POST', 'order/preview', 'fixture:order/preview.json').as('getPreviewOrder')
        cy.route('POST', /user\/current\/order/, 'fixture:user/userCurrentOrder').as('currentOrder')
        cy.route('POST', /order\/v2\/orders/, 'fixture:order/v2/create.json').as('ordersV2')
      })

      it('should create an order and navigate to order confirmation page', () => {
        cy.contains('Checkout').click({ force: true })

        // this explicit wait is required to cater for both flows of the order v2 a/b.
        // when v1 is removed, the TODO below can be uncommented and the wait(1000) deleted
        // TODO: cy.wait(['@ordersV2'])
        cy.wait(1000)

        cy.location('pathname').should('eq', '/order-confirmation/13526239')
      })
    })
  })
})
