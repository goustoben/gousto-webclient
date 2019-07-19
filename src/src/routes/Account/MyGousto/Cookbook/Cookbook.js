import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import { RecipeCard } from'./RecipeCard'
import { Section } from '../Section'

class Cookbook extends React.PureComponent {

  static propTypes = {
    loading: PropTypes.bool,
    empty: PropTypes.bool,
    userLoadRecipes: PropTypes.func,
    orders: PropTypes.object,
    recipes: PropTypes.object,
  }

  componentDidUpdate() {
    const { userLoadRecipes, orders } = this.props
    if (orders) userLoadRecipes()
  }

  renderRecipes() {
    const { recipes } = this.props

    recipes.map(recipe => {
      const title = recipe.get('title')
      const recipeUrl = recipe.get('url')

      return <RecipeCard key={title} title={title} link={recipeUrl}/>
    })
  }

  render() {
    const { loading, empty } = this.props

    return (
      <div>
        <Section title='Your recent cookbook'>
          {loading && <p className="desktop-hide cookbook-empty">Loading your your most recent recipes...</p>}
          {empty && <p className="desktop-hide cookbook-empty">Please order more recipes to view your recipe cookbook</p>}
          {this.renderRecipes}
        </Section>
      </div>
    )
  }
}

export { Cookbook }
