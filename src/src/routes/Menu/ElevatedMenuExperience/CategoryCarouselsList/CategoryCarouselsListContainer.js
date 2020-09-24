import { connect } from 'react-redux'
import { getFeaturedCategories } from '../../selectors/categories'
import { CategoryCarouselsList } from './CategoryCarouselsList'

function mapStateToProps(state) {
  return {
    categories: getFeaturedCategories(state),
  }
}

const mapDispatchToProps = {}

const CategoryCarouselsListContainer = connect(mapStateToProps, mapDispatchToProps)(CategoryCarouselsList)

export { CategoryCarouselsListContainer }
