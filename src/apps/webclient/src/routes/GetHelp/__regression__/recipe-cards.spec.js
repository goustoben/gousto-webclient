import { isPlatform, MOBILE } from '../../../utils/regression/tags'

describe('Given I am logged in', () => {
  beforeEach(() => {
    cy.stubAll3rdParties()
    cy.intercept('POST', /log-event/)
    cy.intercept('GET', '/user/current/orders*', { fixture: 'user/userCurrentOrders.json' })
    cy.intercept('GET', /user\/current\/subscription/, { fixture: 'user/userCurrentActiveSubscription.json' }).as('userCurrentSubscriptionRequest')
    cy.intercept('GET', /customers\/v1\/customers\/17247344\/subscription\/pause-reasons/, { data: [] })
    cy.intercept('GET', 'subscriptionquery/v1/subscriptions/17247344', { fixture: 'subscription/subscriptionQueryResponse.json' })
    cy.intercept('GET', /menu\/v1\/recipes/, { fixture: 'getHelp/menu/recipeWithIngredientsFromMenu.json' }).as('recipesWithIngredientsRoute')
    cy.intercept('POST', /ssr\/v1\/ssr\/validate/, { fixture: 'getHelp/ssr/validate.json' })
    cy.intercept('GET', 'order/16269494*', { fixture: 'getHelp/order/order26May20.json' })
    cy.intercept('POST', /ssrrecipecards\/v1\/request-recipe-cards/, { fixture: 'getHelp/ssrrecipecards/requestRecipeCards.json' })
    cy.intercept('GET', /ssrrecipecards\/v1\/validate/, { fixture: 'getHelp/ssrrecipecards/validate.json' })
    cy.loginV2()
  })

  describe('When I visit the Recipe Cards URL directly, then it shows the recipes or the corresponding order', () => {
    beforeEach(() => {
      cy.visitAndWaitForClientSideReRender('get-help/user/17247344/order/16269494/recipe-cards')

      cy.get('[data-testing="getHelpRecipe"]').eq(0).contains('Pesto Chicken Caprese Salad With Croutons')
      cy.get('[data-testing="getHelpRecipe"]').eq(1).contains('Pulled Hoisin Chicken And Sesame Noodles')
      cy.get('[data-testing="getHelpRecipe"]').eq(2).contains('Sweet Chilli Jumbo Prawn Cali-Style Sushi Bowl')
      cy.get('[data-testing="getHelpRecipe"]').eq(3).contains('Charlie Bigham\'s Moussaka')
    })

    describe('and I click the CTA to choose printed recipe cards', () => {
      beforeEach(() => {
        cy.intercept('GET', 'user/current/address*', { fixture: 'user/userCurrentAddress.json' })
        cy.get('[data-testing="choosePrintedRecipeCards"]').click()
      })

      describe('and click on a couple of recipe input checkboxes', () => {
        beforeEach(() => {
          cy.get('[data-testing="getHelpRecipeSelect"]').eq(0).click()
          cy.get('[data-testing="getHelpRecipeSelect"]').eq(2).click()
        })

        describe('and I click Change to change the address', () => {
          beforeEach(() => {
            cy.get('[data-testing="changeAddressButton"]').click()
          })

          describe('and I select another address from available options', () => {
            beforeEach(() => {
              cy.get('[name="recipe-card-addresses"]').eq(1).click()
            })

            describe('and I click continue', () => {
              beforeEach(() => {
                if (isPlatform(MOBILE)) {
                  // Click outside of the modal to close it
                  cy.root().click(0, 0)
                }
                cy.get('[data-testing="continueRecipeCard"]').click()
              })

              describe('and I select the issue of each recipe', () => {
                const recipeId1 = '2151'
                const recipeId2 = '2026'

                beforeEach(() => {
                  cy.get(`[for="${recipeId1}-missing"]`).click()
                  cy.get(`[for="${recipeId2}-wrong"]`).click()
                })

                describe('and I click the Confirm CTA', () => {
                  beforeEach(() => {
                    cy.get('[data-testing="getHelpRecipeCardConfirm"]').click()
                  })

                  it('shows the confirmation screen with links to the selected recipes', () => {
                    cy.contains('Recipe cards confirmed')
                    cy.get(`[href="/cookbook/recipe-by-id/${recipeId1}"]`)
                      .contains('Pesto Chicken Caprese Salad With Croutons')
                    cy.get(`[href="/cookbook/recipe-by-id/${recipeId2}"]`)
                      .contains('Sweet Chilli Jumbo Prawn Cali-Style Sushi Bowl')
                  })
                })
              })
            })
          })
        })
      })
    })
  })
})
