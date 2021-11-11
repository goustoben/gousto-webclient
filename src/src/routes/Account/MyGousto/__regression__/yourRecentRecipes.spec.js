import { selectRecipes, selectRecipeLink, selectCTA } from './pageUtils/yourRecentRecipes'
import { initialize } from './pageUtils/myGousto'

describe('Given I am logged in', () => {
  describe('When I am on the My Gousto page', () => {
    beforeEach(() => {
      initialize()
    })

    const expectedSuccessfullCTA = '/rate-my-recipes'

    describe('And I have had recent orders', () => {
      const expectedSuccessfullPath = '/cookbook/recipe-by-id/2635'

      it('Should see my last 6 ordered recipes', () => {
        selectRecipes().children().should('have.length', 6)
      })

      it('Should be able to click them to visit each recipe', () => {
        cy.wait('@recipes')
        selectRecipeLink().should('have.attr', 'href', expectedSuccessfullPath)
      })

      it('Should see a CTA to rate my recent recipes', () => {
        selectCTA().contains('Rate your recipes')
      })

      it('Should be able to click it to rate them', () => {
        selectCTA().should('have.attr', 'href', expectedSuccessfullCTA)
      })
    })
  })
})
