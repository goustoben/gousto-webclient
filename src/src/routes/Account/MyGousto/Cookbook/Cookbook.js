import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import { RecipeCard } from'./RecipeCard'
import { Section } from '../Section'

const recipes = [1,2,3]

class Cookbook extends React.PureComponent {

  static propTypes = {
    loading: PropTypes.bool,
    empty: PropTypes.bool,
    userLoadRecipes: PropTypes.func,
    orders: PropTypes.instanceOf(Immutable.Map())
  }

  componentDidUpdate() {
    const { userLoadRecipes, orders } = this.props
    if (orders) userLoadRecipes()
  }

  render() {
    const { loading, empty } = this.props

    return (
      <div>
        <Section title='Your recent cookbook'>
          {loading && <p className="desktop-hide cookbook-empty">Loading your your most recent recipes...</p>}
          {empty && <p className="desktop-hide cookbook-empty">Please order more recipes to view your recipe cookbook</p>}

          { recipes.map(() => (
          <RecipeCard />
          ))}
        </Section>
      </div>
    )
  }
}

export { Cookbook }
