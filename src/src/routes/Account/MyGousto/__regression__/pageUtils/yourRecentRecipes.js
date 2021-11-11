const CTA_CONTAINER = 'recentPreviousRecipe'
const RECIPES_CONTAINER = 'recentPreviousRecipes'

export const selectRecipes = () => cy.get(`[data-testing=${RECIPES_CONTAINER}]`)
export const selectRecipeLink = () => cy.get(`[data-testing=${RECIPES_CONTAINER}] div a`)
export const selectCTA = () => cy.get(`[data-testing=${CTA_CONTAINER}] a`)
