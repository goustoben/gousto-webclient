describe('Given the customer is logged in', () => {
  beforeEach(() => {
    cy.setLoginCookiesWithAccessToken('the-access-token')
  })

  describe('When their order is eligible for ingredients refund and they visit the Recipe Cards URL directly', () => {
    beforeEach(() => {
      cy.serverWithEmulatedPaths('/order/the-order-id')

      cy.configureEmulationState({
        orders: [{
          id: 'the-order-id',
          recipeItems: [
            {recipeId: '2151', recipeUuid: '12054592-71aa-45e3-86d5-80e73b1ff38e'},
            {recipeId: '2026', recipeUuid: 'f2b6772d-3615-4608-affe-527c50e808c6'},
            {recipeId: '3064', recipeUuid: 'e9ddc6f1-a3e7-448b-8612-bc81d7f086c2'},
            {recipeId: '3041', recipeUuid: '59c4b9ce-cb52-44a1-8f3c-f702ad13bd9b'},
          ],
          delivery_date: '1970-01-01 00:00:00',
          delivery_slot: {
            delivery_start: '00:00:00',
            delivery_end: '00:00:00',
          }
        }],
        sessions: [{accessToken: 'the-access-token'}]
      })

      cy.fixture('getHelp/recipes/recipesWithIngredients').as('recipesWithIngredients')
      cy.route('GET', /menu\/v1\/recipes/, 'fixture:getHelp/menu/recipeWithIngredientsFromMenu').as('recipesWithIngredientsRoute')

      cy.visit('get-help/user/ANY_USER_ID/order/the-order-id/recipe-cards')
    })

    it('shows the Recipe Cards page with the recipes loaded', () => {
      cy.get('[data-testing="getHelpRecipe"]').eq(0).contains('Pesto Chicken Caprese Salad With Croutons')
      cy.get('[data-testing="getHelpRecipe"]').eq(1).contains('Pulled Hoisin Chicken And Sesame Noodles')
      cy.get('[data-testing="getHelpRecipe"]').eq(2).contains('Sweet Chilli Jumbo Prawn Cali-Style Sushi Bowl')
      cy.get('[data-testing="getHelpRecipe"]').eq(3).contains('Charlie Bigham\'s Moussaka')
    })
  })

  after(() => cy.resetEmulatedPaths())
})

