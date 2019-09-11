import { connect } from 'react-redux'
import redirectAction from 'actions/redirect'
import Carousel from './Carousel'

const CarouselContainer = connect((state) => ({
  numRecipes: state.homeCarouselRecipes.count(),
}), {
  redirect: redirectAction.redirect,
})(Carousel)

export default CarouselContainer
