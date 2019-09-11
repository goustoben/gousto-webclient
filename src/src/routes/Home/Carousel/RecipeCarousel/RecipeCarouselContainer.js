import { connect } from 'react-redux'
import { cutoffDateTimeNow } from 'utils/deliveries'
import RecipeCarousel from './RecipeCarousel'

const RecipeCarouselContainer = connect(state => ({
  homeCarouselRecipes: state.homeCarouselRecipes,
  cutoffDate: cutoffDateTimeNow(),
}), {})(RecipeCarousel)

export default RecipeCarouselContainer
