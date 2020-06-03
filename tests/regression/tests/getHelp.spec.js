import { clickHelp } from '../pageUtils/home'
import {
  clickAcceptCTA,
  clickContinueCTA,
  clickSubmitCTA,
  expandRecipes,
  fillIngredientIssueDescriptions,
  selectIngredients,
  selectOrderIssue,
} from '../pageUtils/getHelp'

describe('Given the customer is logged in', () => {
  beforeEach(() => {
    cy.server()
    cy.fixture('user/userCurrent').as('userCurrent')
    cy.route('GET', /user\/current/, '@userCurrent').as('userCurrentRequest')
    cy.fixture('user/userCurrentSubscription').as('userCurrentSubscription')
    cy.route('GET', /user\/current\/subscription/, '@userCurrentSubscription').as('userCurrentSubscriptionRequest')

    cy.login()

    // Make sure that we are authenticated when going to /get-help/eligibility-check
    cy.visit('/')
    cy.wait(['@identifyRequest', '@userCurrentRequest'])

    cy.clock(new Date(2020, 4, 28).getTime(), ['Date'])
  })

  afterEach(() => {
    cy.clock().then((clock) => {
      clock.restore()
    })
  })

  describe('When their order is eligible for ingredients refund and Help is clicked', () => {
    beforeEach(() => {
      cy.fixture('getHelp/user/userCurrentOrders').as('userCurrentOrders')
      cy.route('GET', /user\/current\/orders/, '@userCurrentOrders').as('userCurrentOrdersRequest')
      cy.fixture('getHelp/recipes/recipesWithIngredients').as('recipesWithIngredients')
      cy.route('GET', /recipes\/v2\/recipes/, '@recipesWithIngredients')
      cy.fixture('getHelp/ssr/validate').as('validate')
      cy.route('POST', /ssr\/v1\/ssr\/validate/, '@validate')

      // Going to / and then clicking in Help is done only to make sure we are authenticated
      // when we go to /get-help/eligibility-check.
      clickHelp()
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

              clickAcceptCTA()
            })

            it('shows the refund confirmation step', () => {
              cy.url().should('include', 'confirmation')
              cy.contains('Thanks')
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
    })
  })
})
