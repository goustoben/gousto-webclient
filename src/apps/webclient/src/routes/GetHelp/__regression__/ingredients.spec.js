import { clickMyGousto } from './pageUtils/home/home'
import {
  clickClaimCTA,
  clickGetInTouchCTA,
  clickContinueCTA,
  clickSubmitCTA,
  expandRecipes,
  fillIngredientIssueDescriptions,
  selectIngredients,
  selectOrderIssue,
} from './pageUtils/help/getHelp'

describe('Given the customer is logged in', () => {
  beforeEach(() => {
    cy.server()
    cy.fixture('user/userCurrent').as('userCurrent')
    cy.route('GET', /user\/current/, '@userCurrent').as('userCurrentRequest')
    cy.fixture('user/userCurrentActiveSubscription').as('userCurrentSubscription')
    cy.route('GET', /subscriptionquery\/v1\/subscriptions/, '@userCurrentSubscription').as('userCurrentSubscriptionRequest')
    cy.fixture('getHelp/order/order26May20').as('currentOrder')
    cy.route('GET', /order\/16269494/, '@currentOrder')

    cy.login()
  })

  afterEach(() => {
    cy.clock().then((clock) => {
      clock.restore()
    })
  })

  describe('When the order is eligible for ingredients refund and I click "Any issues with this box?" on last delivery in My Gousto', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.wait(['@identifyRequest', '@userCurrentRequest'])

      cy.clock(new Date(2020, 4, 28).getTime(), ['Date'])

      cy.stubAll3rdParties()
      cy.fixture('getHelp/user/userCurrentOrders').as('userCurrentOrders')
      cy.route('GET', /user\/current\/orders/, '@userCurrentOrders').as('userCurrentOrdersRequest')
      cy.fixture('getHelp/recipes/recipesWithIngredients').as('recipesWithIngredients')
      cy.route('GET', /recipes\/v2\/recipes/, '@recipesWithIngredients')
      cy.route('GET', /menu\/v1\/recipes/, 'fixture:getHelp/menu/recipeWithIngredientsFromMenu').as('recipesWithIngredientsRoute')
      cy.fixture('getHelp/ssr/validate').as('validate')
      cy.route('GET', /ssr\/v3\/validate/, '@validate')

      clickMyGousto()

      cy.get('[data-testing="PreviousOrderGetHelpCTA"]').click()
    })

    describe('And the issue "Ingredients" is clicked', () => {
      beforeEach(() => {
        cy.wait(['@userCurrentSubscriptionRequest', '@userCurrentOrdersRequest'])
        selectOrderIssue('ingredient')
      })

      describe('And ingredients are selected which add up under the valid thresholds of money and number of ingredients', () => {
        beforeEach(() => {
          cy.fixture('getHelp/ssr/validateIngredientsValid').as('validateIngredientsValid')
          cy.route('POST', /ssr\/v2\/validate-ingredients/ ,'@validateIngredientsValid')
          cy.fixture('getHelp/ssr/categories').as('categories')
          cy.route('GET', /ssr\/v1\/ssr\/categories/, '@categories').as('categoriesRequest')

          expandRecipes([1])
          selectIngredients([4, 6])
          clickContinueCTA()
          cy.wait('@categoriesRequest')
          clickContinueCTA()
        })

        describe('And the descriptions about the ingredient issues are filled', () => {
          beforeEach(() => {
            cy.fixture('getHelp/ssr/value').as('value')
            cy.route('POST', /ssr\/v2\/value/, '@value').as('valueRequest')

            fillIngredientIssueDescriptions([
              'It is not in the box',
              'It is just missing'
            ])
            clickSubmitCTA()
          })

          describe('And the credit is accepted', () => {
            beforeEach(() => {
              cy.fixture('getHelp/ssr/refund').as('refund')
              cy.route('POST', /ssr\/v2\/refund/, '@refund')

              cy.wait('@valueRequest')

              // This is an antipattern, we should be able to remove it when we fix data-testing in <Button> component
              cy.wait(2000)

              clickClaimCTA()
            })

            it('shows the refund confirmation step', () => {
              cy.url().should('include', 'confirmation')
              cy.contains('thanks')
            })
          })

          describe('And the credit is not accepted', () => {
            beforeEach(() => {
              cy.wait('@valueRequest')

              cy.wait(2000)

              clickGetInTouchCTA()
            })

            it('shows the Contact Us step', () => {
              cy.url().should('include', 'contact')
              cy.contains('chat')
              cy.contains('email')
              cy.contains('phone')
            })
          })
        })
      })

      describe('And ingredients are selected which add up too much money', () => {
        beforeEach(() => {
          cy.fixture('getHelp/ssr/validateIngredientsNotValid').as('validateIngredientsNotValid')
          cy.route({
            method: 'POST',
            url: /ssr\/v2\/validate-ingredients/,
            status: 422,
            response: '@validateIngredientsNotValid',
          })

          expandRecipes([0, 1, 2])
          selectIngredients([0, 5, 13])
          clickContinueCTA()
        })

        it('shows the Contact Us step', () => {
          cy.url().should('include', 'contact')
          cy.contains('chat')
          cy.contains('email')
          cy.contains('phone')
        })
      })

      describe('And ingredients are selected but they are too many', () => {
        beforeEach(() => {
          cy.fixture('getHelp/ssr/validateIngredientsNotValid').as('validateIngredientsNotValid')
          cy.route({
            method: 'POST',
            url: /ssr\/v2\/validate-ingredients/,
            status: 422,
            response: '@validateIngredientsNotValid',
          })

          expandRecipes([0, 1, 2])
          selectIngredients([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 13, 14, 15, 16])
          clickContinueCTA()
        })

        it('shows the Contact Us step', () => {
          cy.url().should('include', 'contact')
          cy.contains('chat')
          cy.contains('email')
          cy.contains('phone')
        })
      })
    })
  })

  describe('When their order is eligible for ingredients refund and they visit the Ingredients URL directly', () => {
    beforeEach(() => {
      cy.fixture('getHelp/ssr/validate').as('validate')
      cy.route('GET', /ssr\/v3\/validate/, '@validate')
      cy.fixture('getHelp/order/order26May20').as('urlOrder')
      cy.route('GET', /order\/16269494/, '@urlOrder')
      cy.fixture('getHelp/recipes/recipesWithIngredients').as('recipesWithIngredients')
      cy.route('GET', /recipes\/v2\/recipes/, '@recipesWithIngredients')
      cy.route('GET', /menu\/v1\/recipes/, 'fixture:getHelp/menu/recipeWithIngredientsFromMenu').as('recipesWithIngredientsRoute')

      cy.visit('get-help/user/17247344/order/16269494/ingredients')
    })

    it('shows the Ingredients page with the recipes and ingredients loaded', () => {
      expandRecipes([1])
      cy.get('[data-testing="input-check"]').eq(0).contains('1 red chilli')
      cy.get('[data-testing="input-check"]').eq(1).contains('2 garlic cloves')
      cy.get('[data-testing="input-check"]').eq(2).contains('15g fresh root ginger')
    })
  })
})
