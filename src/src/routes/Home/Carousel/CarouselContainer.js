import { connect } from 'react-redux'
import { getHomePageRedesign } from 'selectors/features'
import { Carousel } from './Carousel'

const CarouselContainer = connect((state) => ({
  numRecipes: state.menuRecipes.count(),
  isHomePageRedesignEnabled: getHomePageRedesign(state),
}))(Carousel)

export { CarouselContainer }
