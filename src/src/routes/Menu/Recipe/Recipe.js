import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { GridRecipe } from './GridRecipe'
import css from './Recipe.css'

class Recipe extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      detailHover: false,
    }
  }

  get recipeComponent() {
    const { view, numPortions, isOutOfStock } = this.props
    const { detailHover } = this.state
    const fineDineInStyle = view === 'fineDineIn'

    switch (view) {
    case 'chefPrepared':
      return <GridRecipe {...this.props} highlight={this.highlight} unhighlight={this.unhighlight} detailHover={detailHover} numPortions={numPortions} isChefPrepared isOutOfStock={isOutOfStock} />
    default:
      return <GridRecipe {...this.props} highlight={this.highlight} unhighlight={this.unhighlight} detailHover={detailHover} isOutOfStock={isOutOfStock} fineDineInStyle={fineDineInStyle} />
    }
  }

  highlight = () => {
    this.setState({ detailHover: true })
  }

  unhighlight = () => {
    this.setState({ detailHover: false })
  }

  render() {
    const { view } = this.props
    const { detailHover } = this.state

    const className = classnames(
      css.grid,
      css[view],
      {
        [css.gridHover]: detailHover
      }
    )

    return (
      <div className={className}>
        {this.recipeComponent}
      </div>
    )
  }
}

Recipe.propTypes = {
  view: PropTypes.oneOf(['grid', 'list', 'featured', 'simple', 'fineDineIn', 'chefPrepared']).isRequired,
  numPortions: PropTypes.number.isRequired,
  originalId: PropTypes.string.isRequired,
  isOutOfStock: PropTypes.bool.isRequired,
  inBasket: PropTypes.bool.isRequired
}

export { Recipe }
