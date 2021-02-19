import { connect } from 'react-redux'
import { getRecipeListRecipes } from '../../selectors/recipeList'
import { categoryButtonClicked } from '../../actions/menuCategoriesModal'
import { CategoryCarousel } from './CategoryCarousel'
import { getCarouselConfigForCategory } from '../../selectors/categories'

function mapStateToProps(state, props) {
  const { category } = props

  return {
    recipes: getRecipeListRecipes(state, { collectionId: category.get('id') }).recipes,
    carouselConfig: getCarouselConfigForCategory(state, props)
  }
}

const mapDispatchToProps = {
  categoryButtonClicked
}

const CategoryCarouselContainer = connect(mapStateToProps, mapDispatchToProps)(CategoryCarousel)

export { CategoryCarouselContainer }
