import React from 'react'
import PropTypes from 'prop-types'
import { getRecipeTitle, getRecipeURL, getRecipeImages } from 'selectors/recipe'
import css from './Cookbook.css'
import { RecipeCard } from './RecipeCard'

class Cookbook extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    userLoadRecipes: PropTypes.func,
    orders: PropTypes.object,
    recipes: PropTypes.object
  }

  componentDidUpdate() {
    const { userLoadRecipes, orders } = this.props
    if (orders) userLoadRecipes()
  }

  renderRecipes() {
    const { recipes } = this.props

    return recipes.map(recipe => {
      const title = getRecipeTitle(recipe)
      const url = getRecipeURL(recipe)
      const images = getRecipeImages(recipe)

      return <RecipeCard key={title} title={title} link={url} images={images} />
    })
  }

  render() {
    const { loading } = this.props

    return (
      <div>
        {loading && <p className={css.mobileShow}>Loading your your most recent recipes...</p>}
        {this.renderRecipes()}
      </div>
    )
  }
}

export { Cookbook }
