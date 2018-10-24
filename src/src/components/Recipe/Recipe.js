import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Immutable from 'immutable'

import css from './Recipe.css'
import GridRecipe from 'Recipe/GridRecipe'
import SmallRecipe from 'Recipe/SmallRecipe'
import SimpleRecipe from 'Recipe/SimpleRecipe'
import FeaturedRecipe from 'Recipe/FeaturedRecipe'
import FineDineInRecipe from 'Recipe/FineDineInRecipe'

export const recipePropTypes = {
	title: PropTypes.string.isRequired,
	media: PropTypes.instanceOf(Immutable.List),
	onClick: PropTypes.func,
	stock: PropTypes.number,
	view: React.PropTypes.oneOf(['grid', 'gridSmall', 'list', 'featured', 'simple', 'fineDineIn']).isRequired,
	surcharge: PropTypes.number,
	range: PropTypes.string,
}

class Recipe extends React.PureComponent {
	static propTypes = recipePropTypes

	static defaultProps = {
		view: 'grid',
	}

	constructor() {
		super()
		this.state = {
			detailHover: false,
		}
	}

	get recipeComponent() {
		switch (this.props.view) {
			case 'gridSmall':
				return <SmallRecipe />
			case 'featured':
				return <FeaturedRecipe {...this.props} highlight={this.highlight} unhighlight={this.unhighlight} detailHover={this.state.detailHover} />
			case 'simple':
				return <SimpleRecipe {...this.props} />
			case 'fineDineIn':
				return <FineDineInRecipe {...this.props} {...this.props} highlight={this.highlight} unhighlight={this.unhighlight} detailHover={this.state.detailHover} />
			default:
				return <GridRecipe {...this.props} {...this.props} highlight={this.highlight} unhighlight={this.unhighlight} detailHover={this.state.detailHover} />
		}
	}

	highlight = () => {
		this.setState({ detailHover: true })
	}

	unhighlight = () => {
		this.setState({ detailHover: false })
	}

	render() {
		return (
			<div className={classnames('grid', css[this.props.view], { [css.gridHover]: this.state.detailHover })}>
				{this.recipeComponent}
			</div>
		)
	}
}

export default Recipe
