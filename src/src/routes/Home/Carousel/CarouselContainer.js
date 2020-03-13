import { connect } from 'react-redux'
import redirectAction from 'actions/redirect'
import { Carousel } from './Carousel'

const CarouselContainer = connect((state) => ({
  numRecipes: state.menuRecipes.count(),
}), {
  redirect: redirectAction.redirect,
})(Carousel)

export { CarouselContainer }
