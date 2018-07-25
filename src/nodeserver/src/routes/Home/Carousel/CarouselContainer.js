import { connect } from 'react-redux'
import Carousel from './Carousel'

import redirectAction from 'actions/redirect'

const CarouselContainer = connect((state) => ({
	numRecipes: state.homeCarouselRecipes.count(),
}), {
	redirect: redirectAction.redirect,
})(Carousel)

export default CarouselContainer
