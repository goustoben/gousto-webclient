import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Immutable from 'immutable'

import { CTAToAllRecipes } from './CTAToAllRecipes'
import { CTAThematic } from './CTAThematic'
import { GridRecipe } from './GridRecipe'
import { FeaturedRecipe } from './FeaturedRecipe'
import { FineDineInRecipe } from './FineDineInRecipe'
import css from './Recipe.css'

const recipePropTypes = {
  title: PropTypes.string.isRequired,
  media: PropTypes.instanceOf(Immutable.List),
  onClick: PropTypes.func,
  stock: PropTypes.number,
  view: PropTypes.oneOf(['grid', 'list', 'featured', 'simple', 'fineDineIn', 'chefPrepared', 'ctaAllRecipe', 'ctaThematic']).isRequired,
  surcharge: PropTypes.number,
  range: PropTypes.instanceOf(Immutable.Map),
  collectionFilterChange: PropTypes.func,
  id: PropTypes.string,
  originalId: PropTypes.string.isRequired,
  thematicName: PropTypes.string,
  selectedDate: PropTypes.string,
  numPortions: PropTypes.number,
}

class Recipe extends React.PureComponent {
  static propTypes = recipePropTypes

  constructor() {
    super()
    this.state = {
      detailHover: false,
    }
  }

  get recipeComponent() {
    const { view, collectionFilterChange, thematicName, selectedDate, numPortions } = this.props
    const { detailHover } = this.state

    switch (view) {
    case 'featured':
      return <FeaturedRecipe {...this.props} highlight={this.highlight} unhighlight={this.unhighlight} detailHover={detailHover} />
    case 'fineDineIn':
      return <FineDineInRecipe {...this.props} highlight={this.highlight} unhighlight={this.unhighlight} detailHover={detailHover} />
    case 'ctaAllRecipe':
      return <CTAToAllRecipes collectionFilterChange={collectionFilterChange} />
    case 'ctaThematic':
      return <CTAThematic name={thematicName} selectedDate={selectedDate} />
    case 'chefPrepared':
      return <GridRecipe {...this.props} highlight={this.highlight} unhighlight={this.unhighlight} detailHover={detailHover} numPortions={numPortions} isChefPrepared />
    default:
      return <GridRecipe {...this.props} highlight={this.highlight} unhighlight={this.unhighlight} detailHover={detailHover} />
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

Recipe.defaultProps = {
  collectionFilterChange: () => {},
}

export { Recipe }
