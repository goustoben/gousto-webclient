import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Immutable from 'immutable'

import { CTAToAllRecipes } from 'Recipe/CTAToAllRecipes'
import { CTAThematic } from 'Recipe/CTAThematic'
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
  view: PropTypes.oneOf(['grid', 'gridSmall', 'list', 'featured', 'simple', 'fineDineIn', 'ctaAllRecipe', 'ctaThematic']).isRequired,
  surcharge: PropTypes.number,
  range: PropTypes.instanceOf(Immutable.Map),
  collectionFilterChange: PropTypes.func,
  id: PropTypes.string,
  thematicName: PropTypes.string,
  selectedDate: PropTypes.string
}

class Recipe extends React.PureComponent {
  static propTypes = recipePropTypes

  static defaultProps = {
    title: '',
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
    const { view, collectionFilterChange, thematicName, selectedDate } = this.props
    const { detailHover } = this.state

    switch (view) {
    case 'gridSmall':
      return <SmallRecipe {...this.props}/>
    case 'featured':
      return <FeaturedRecipe {...this.props} highlight={this.highlight} unhighlight={this.unhighlight} detailHover={detailHover} />
    case 'simple':
      return <SimpleRecipe {...this.props} />
    case 'fineDineIn':
      return <FineDineInRecipe {...this.props} highlight={this.highlight} unhighlight={this.unhighlight} detailHover={detailHover} />
    case 'ctaAllRecipe':
      return <CTAToAllRecipes collectionFilterChange={collectionFilterChange} />
    case 'ctaThematic':
      return <CTAThematic name={thematicName} selectedDate={selectedDate} />
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
      'grid',
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

export default Recipe
