describe('Given the customer is logged in', () => {
  beforeEach(() => {
    cy.server()

    document.cookie = `v1_oauth_token=${encode({access_token: 'ANY_ACCESS_TOKEN'})};path=/;`
    document.cookie = `v1_oauth_expiry=${encode({expires_at: '1970-01-01T00:00:00.000Z'})};path=/`
    document.cookie = `v1_oauth_refresh=${encode({refresh_token: 'ANY_REFRESH_TOKEN'})};path=/`
  })

  describe('When their order is eligible for ingredients refund and they visit the Recipe Cards URL directly', () => {
    beforeEach(() => {
      cy.fixture('getHelp/order/order26May20').as('urlOrder')
      cy.route('GET', /order\/16269494/, '@urlOrder')
      cy.fixture('getHelp/recipes/recipesWithIngredients').as('recipesWithIngredients')
      cy.route('GET', /menu\/v1\/recipes/, 'fixture:getHelp/menu/recipeWithIngredientsFromMenu').as('recipesWithIngredientsRoute')

      cy.visit('get-help/user/17247344/order/16269494/recipe-cards')
    })

    it('shows the Recipe Cards page with the recipes loaded', () => {
      cy.get('[data-testing="getHelpRecipe"]').eq(0).contains('Pesto Chicken Caprese Salad With Croutons')
      cy.get('[data-testing="getHelpRecipe"]').eq(1).contains('Pulled Hoisin Chicken And Sesame Noodles')
      cy.get('[data-testing="getHelpRecipe"]').eq(2).contains('Sweet Chilli Jumbo Prawn Cali-Style Sushi Bowl')
      cy.get('[data-testing="getHelpRecipe"]').eq(3).contains('Charlie Bigham\'s Moussaka')
    })
  })
})

function encode(cookieValue) {
  return encodeURIComponent(JSON.stringify(cookieValue))
}
