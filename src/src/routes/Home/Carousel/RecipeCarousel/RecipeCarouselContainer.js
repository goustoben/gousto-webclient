import { connect } from 'react-redux'
import { RecipeCarousel } from './RecipeCarousel'
import { getRecipesFromAllRecipesCollection } from './carouselRecipes'

const mapStateToProps = (state) => ({
  homeCarouselRecipes: getRecipesFromAllRecipesCollection(state),
})

const RecipeCarouselContainer = connect(mapStateToProps, {})(RecipeCarousel)

export { RecipeCarouselContainer }
