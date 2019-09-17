import { connect } from 'react-redux'
import { getBasketRecipes } from 'selectors/basket'
import { getOkShortlistRecipeIds } from 'routes/Menu/selectors/basket'
import { basketSum } from 'utils/basket'
import { RecipesCountButton } from './RecipesCountButton'

const mapStateToProps = (state) => ({
  basketRecipes: basketSum(getBasketRecipes(state)),
  shortlistRecipes: basketSum(getOkShortlistRecipeIds(state))
})

const RecipesCountButtonContainer = connect(mapStateToProps)(RecipesCountButton)

export {
  RecipesCountButtonContainer
}
