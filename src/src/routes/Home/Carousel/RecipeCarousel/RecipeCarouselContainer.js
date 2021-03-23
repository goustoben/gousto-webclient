import { connect } from 'react-redux'
import { getIsCarouselShiftEnabled } from 'selectors/features'
import { RecipeCarousel } from './RecipeCarousel'
import { getRecipesFromAllRecipesCollection } from './carouselRecipes'

const mapStateToProps = (state) => ({
  homeCarouselRecipes: getRecipesFromAllRecipesCollection(state),
  isCarouselShiftEnabled: getIsCarouselShiftEnabled(state),
})

const RecipeCarouselContainer = connect(mapStateToProps, {})(RecipeCarousel)

export { RecipeCarouselContainer }
