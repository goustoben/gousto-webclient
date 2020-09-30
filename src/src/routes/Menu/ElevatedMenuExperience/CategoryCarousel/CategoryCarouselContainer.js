import { connect } from 'react-redux'
import { getRecipeListRecipes } from '../../selectors/recipeList'
import { categoryButtonClicked } from '../../actions/menuCategoriesModal'
import { CategoryCarousel } from './CategoryCarousel'

function mapStateToProps(state, props) {
  const { category } = props

  return {
    recipes: getRecipeListRecipes(state, { collectionId: category.get('id') }).recipes
  }
}

const mapDispatchToProps = {
  categoryButtonClicked
}

const CategoryCarouselContainer = connect(mapStateToProps, mapDispatchToProps)(CategoryCarousel)

export { CategoryCarouselContainer }
