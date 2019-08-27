import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { Row } from 'Page/Grid'
import { getRecipeTitle, getRecipeURL, getRecipeImages } from 'selectors/recipe'
import css from './Cookbook.css'
import { RecipeCard } from './RecipeCard'

class Cookbook extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    userLoadCookbookRecipes: PropTypes.func,
    orders: PropTypes.instanceOf(Immutable.Map),
    recipes: PropTypes.instanceOf(Immutable.List)
  }

  static defaultProps = {
    loading: false,
    userLoadCookbookRecipes: () => {},
    orders: Immutable.Map(),
    recipes: Immutable.List()
  }

  componentDidUpdate(prevProps) {
    const { userLoadCookbookRecipes, orders } = this.props
    const isPrevOrderPropEqual = Immutable.is(prevProps.orders, orders)

    if (orders && !isPrevOrderPropEqual) userLoadCookbookRecipes()
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
        {loading && (
          <p className={css.mobileShow}>Loading your most recent recipes...</p>
        )}
        <Row>{this.renderRecipes()}</Row>
      </div>
    )
  }
}

export { Cookbook }
