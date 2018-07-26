import { connect } from 'react-redux'
import RecipeCarousel from './RecipeCarousel'
import { cutoffDateTimeNow } from 'utils/deliveries'

const RecipeCarouselContainer = connect(state => ({
	homeCarouselRecipes: state.homeCarouselRecipes,
	cutoffDate: cutoffDateTimeNow(),
}), {})(RecipeCarousel)

export default RecipeCarouselContainer
