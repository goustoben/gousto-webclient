describe('Given the customer is logged in', () => {
  beforeEach(() => {
    cy.server()
    cy.fixture('user/userCurrent').as('userCurrent')
    cy.route('GET', /user\/current/, '@userCurrent').as('userCurrentRequest')
    cy.fixture('user/userCurrentActiveSubscription').as('userCurrentSubscription')
    cy.route('GET', /user\/current\/subscription/, '@userCurrentSubscription').as('userCurrentSubscriptionRequest')

    cy.login()
  })

  describe('When their order is eligible for ingredients refund and they visit the Recipe Cards URL directly', () => {
    beforeEach(() => {
      cy.fixture('getHelp/ssr/validate').as('validate')
      cy.route('POST', /ssr\/v1\/ssr\/validate/, '@validate')
      cy.fixture('getHelp/order/order26May20').as('urlOrder')
      cy.route('GET', /order\/16269494/, '@urlOrder')
      cy.fixture('getHelp/recipes/recipesWithIngredients').as('recipesWithIngredients')
      cy.route('GET', /recipes\/v2\/recipes/, '@recipesWithIngredients')
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
