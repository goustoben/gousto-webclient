import { connect } from 'react-redux'
import { getBasketRecipes, getShortlistRecipeIds } from 'selectors/basket'
import { RecipesCountButton } from './RecipesCountButton'

const getRecipeNumberInBasket = (recipes) => (
  recipes.reduce((acc, current) => acc + current, 0)
)

const mapStateToProps = (state) => ({
  basketRecipes: getRecipeNumberInBasket(getBasketRecipes(state)),
  shortlistRecipes: getShortlistRecipeIds(state).size
})

const RecipesCountButtonContainer = connect(mapStateToProps)(RecipesCountButton)

export {
  RecipesCountButtonContainer
}
