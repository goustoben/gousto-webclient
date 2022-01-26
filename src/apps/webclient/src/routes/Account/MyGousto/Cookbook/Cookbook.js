import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { Row } from 'Page/Grid'
import { getRecipeTitle, getRecipeImages, getRecipeID } from 'selectors/recipe'
import { client } from 'config/routes'
import placeholderSrc from 'media/images/product-placeholder.png'
import css from './Cookbook.css'
import { RecipeCard } from './RecipeCard'

const propTypes = {
  loading: PropTypes.bool,
  userLoadCookbookRecipes: PropTypes.func,
  orders: PropTypes.instanceOf(Immutable.Map),
  recipes: PropTypes.instanceOf(Immutable.List)
}

const defaultProps = {
  loading: false,
  userLoadCookbookRecipes: () => { },
  orders: Immutable.Map(),
  recipes: Immutable.List()
}
class Cookbook extends React.PureComponent {
  componentDidMount() {
    const { userLoadCookbookRecipes, orders } = this.props

    if (orders.size) {
      userLoadCookbookRecipes()
    }
  }

  componentDidUpdate(prevProps) {
    const { userLoadCookbookRecipes, orders } = this.props
    const isPrevOrderPropEqual = Immutable.is(prevProps.orders, orders)

    if (orders.size && !isPrevOrderPropEqual) {
      userLoadCookbookRecipes()
    }
  }

  renderRecipes() {
    const { recipes } = this.props
    let recipeCards = []

    recipeCards = recipes.map(recipe => {
      const title = getRecipeTitle(recipe)
      const id = getRecipeID(recipe)
      const images = getRecipeImages(recipe)
      const url = `${client.cookbookRecipeById}/${id}`

      return <RecipeCard key={title} title={title} link={url} images={images} />
    }).toArray()

    if (recipeCards.length < 6) {
      const emptyCards = 6 - recipeCards.length

      for (let i = 0; i < emptyCards; i++) {
        recipeCards.push(<RecipeCard images={placeholderSrc} />)
      }
    }

    return recipeCards
  }

  render() {
    const { loading } = this.props

    return (
      <div data-testing="myGoustoCookbook">
        {loading && (
          <p className={css.mobileShow}>Loading your most recent recipes...</p>
        )}
        <Row data-testing="recentPreviousRecipes">{this.renderRecipes()}</Row>
      </div>
    )
  }
}

Cookbook.propTypes = propTypes
Cookbook.defaultProps = defaultProps

export { Cookbook }
