import { connect } from 'react-redux'
import { getRecipeListRecipes } from '../../selectors/recipeList'
import { CategoryCarousel } from './CategoryCarousel'

function mapStateToProps(state, props) {
  const { category } = props

  return {
    recipes: getRecipeListRecipes(state, { collectionId: category.get('id') }).recipes
  }
}

const mapDispatchToProps = {}

const CategoryCarouselContainer = connect(mapStateToProps, mapDispatchToProps)(CategoryCarousel)

export { CategoryCarouselContainer }
