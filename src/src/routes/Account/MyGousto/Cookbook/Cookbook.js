import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { getRecipeTitle, getRecipeURL, getRecipeImages } from 'selectors/recipe'
import css from './Cookbook.css'
import { RecipeCard } from './RecipeCard'

class Cookbook extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    userLoadRecipes: PropTypes.func,
    orders: PropTypes.instanceOf(Immutable.Map),
    recipes: PropTypes.instanceOf(Immutable.List)
  }

  static defaultProps = {
    loading: false,
    userLoadRecipes: () => {},
    orders: Immutable.Map(),
    recipes: Immutable.List()
  }

  componentDidUpdate(prevProps) {
    const { userLoadRecipes, orders } = this.props
    const isPrevOrderPropEqual = JSON.stringify(prevProps.orders) === JSON.stringify(orders)

    if (orders && !isPrevOrderPropEqual) userLoadRecipes()
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
        {loading && <p className={css.mobileShow}>Loading your most recent recipes...</p>}
        {this.renderRecipes()}
      </div>
    )
  }
}

export { Cookbook }
