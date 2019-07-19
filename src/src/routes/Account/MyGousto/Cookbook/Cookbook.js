import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import { RecipeCard } from'./RecipeCard'
import { Section } from '../Section'

const recipes = [1,2,3]

class Cookbook extends React.PureComponent {

  static propTypes = {
const Cookbook = () => (
    userLoadRecipes: PropTypes.func,
    orders: PropTypes.instanceOf(Immutable.Map())
  }

  componentDidUpdate() {
    const { userLoadRecipes, orders } = this.props
    if (orders) userLoadRecipes()
  }

  render() {

    return (
      <div>
          { recipes.map(() => (
          <RecipeCard />
    ))
    }
      </div>
    )
  }
}

export { Cookbook }
