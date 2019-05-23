import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Immutable from 'immutable'

import CTAToAllRecipes from 'CTAToAllRecipes'

import GridRecipe from 'Recipe/GridRecipe'
import SmallRecipe from 'Recipe/SmallRecipe'
import SimpleRecipe from 'Recipe/SimpleRecipe'
import FeaturedRecipe from 'Recipe/FeaturedRecipe'
import FineDineInRecipe from 'Recipe/FineDineInRecipe'
import css from './Recipe.css'

const recipePropTypes = {
  title: PropTypes.string.isRequired,
  media: PropTypes.instanceOf(Immutable.List),
  onClick: PropTypes.func,
  stock: PropTypes.number,
  view: PropTypes.oneOf(['grid', 'gridSmall', 'list', 'featured', 'simple', 'fineDineIn']).isRequired,
  surcharge: PropTypes.number,
  range: PropTypes.instanceOf(Immutable.Map),
  collectionFilterChange: PropTypes.func,
}

class Recipe extends React.PureComponent {
  static propTypes = recipePropTypes

  static defaultProps = {
    view: 'grid',
    collectionFilterChange: () => {},
  }

  constructor() {
    super()
    this.state = {
      detailHover: false,
    }
  }

  get recipeComponent() {
    const { view, collectionFilterChange } = this.props
    const { detailHover } = this.state

    switch (view) {
    case 'gridSmall':
      return <SmallRecipe {...this.props}/>
    case 'featured':
      return <FeaturedRecipe {...this.props} highlight={this.highlight} unhighlight={this.unhighlight} detailHover={detailHover} />
    case 'simple':
      return <SimpleRecipe {...this.props} />
    case 'fineDineIn':
      return <FineDineInRecipe {...this.props} {...this.props} highlight={this.highlight} unhighlight={this.unhighlight} detailHover={detailHover} />
    case 'ctaAllRecipe': 
      return <CTAToAllRecipes collectionFilterChange={collectionFilterChange} />
    default:
      return <GridRecipe {...this.props} {...this.props} highlight={this.highlight} unhighlight={this.unhighlight} detailHover={detailHover} />
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

    return (
      <div className={classnames('grid', css[view], { [css.gridHover]: detailHover })}>
        {this.recipeComponent}
      </div>
    )
  }
}

export default Recipe
