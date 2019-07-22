import React from 'react'
import PropTypes from 'prop-types'
import { getRecipeTitle, getRecipeURL, getRecipeImages } from 'selectors/recipe'

import { RecipeCard } from './RecipeCard'

class Cookbook extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    empty: PropTypes.bool,
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
    const { loading, empty } = this.props

    return (
      <div>
        {loading && (
          <p className="desktop-hide cookbook-empty">
            Loading your your most recent recipes...
          </p>
        )}
        {empty && (
          <p className="desktop-hide cookbook-empty">
            Please order more recipes to view your recipe cookbook
          </p>
        )}
        {this.renderRecipes()}
      </div>
    )
  }
}

export { Cookbook }
