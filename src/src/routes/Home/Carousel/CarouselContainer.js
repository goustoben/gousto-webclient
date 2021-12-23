import { connect } from 'react-redux'
import { Carousel } from './Carousel'

const CarouselContainer = connect((state) => ({
  numRecipes: state.menuRecipes.count(),
}))(Carousel)

export { CarouselContainer }
