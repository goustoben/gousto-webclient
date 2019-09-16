import { connect } from 'react-redux'
import { getBasketRecipes, getShortlistRecipeIds } from 'selectors/basket'
import { basketSum } from 'utils/basket'
import { RecipesCountButton } from './RecipesCountButton'

const mapStateToProps = (state) => ({
  basketRecipes: basketSum(getBasketRecipes(state)),
  shortlistRecipes: getShortlistRecipeIds(state).size
})

const RecipesCountButtonContainer = connect(mapStateToProps)(RecipesCountButton)

export {
  RecipesCountButtonContainer
}
