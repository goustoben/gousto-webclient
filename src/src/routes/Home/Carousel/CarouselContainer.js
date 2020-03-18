import { connect } from 'react-redux'
import redirectAction from 'actions/redirect'
import { trackGetStarted } from 'actions/tracking'
import { Carousel } from './Carousel'

const CarouselContainer = connect((state) => ({
  numRecipes: state.menuRecipes.count(),
}), {
  redirect: redirectAction.redirect,
  trackGetStarted,
})(Carousel)

export { CarouselContainer }
