import React, { PropTypes } from 'react'
import Immutable from 'immutable' /* eslint-disable new-cap */

import css from './Detail.css'

import DefaultDetail from 'Recipe/Detail/DefaultDetail'
import FineDineInDetail from 'Recipe/Detail/FineDineInDetail'

export const detailPropTypes = {
	media: PropTypes.instanceOf(Immutable.List),
	title: PropTypes.string,
	view: PropTypes.string,
	tag: PropTypes.string,
	count: PropTypes.number,
	average: PropTypes.number,
	per100Grams: PropTypes.instanceOf(Immutable.Map),
	perPortion: PropTypes.instanceOf(Immutable.Map),
	ingredients: PropTypes.instanceOf(Immutable.List),
	allergens: PropTypes.instanceOf(Immutable.List),

	stock: PropTypes.number,
	inBasket: PropTypes.bool,
	id: PropTypes.string,
	useWithin: PropTypes.string.isRequired,
	cookingTime: PropTypes.number.isRequired,
	availability: PropTypes.instanceOf(Immutable.List),
	cutoffDate: PropTypes.string,
	description: PropTypes.string,
	youWillNeed: PropTypes.instanceOf(Immutable.List),
	cuisine: PropTypes.string,
	diet: PropTypes.string,
	equipment: PropTypes.instanceOf(Immutable.List),

	menuRecipeDetailVisibilityChange: PropTypes.func,
	scrolledPastPoint: PropTypes.bool,
	restrictedView: PropTypes.bool,
	surcharge: PropTypes.number,
	range: PropTypes.string,
}

class Detail extends React.Component {
	static propTypes = detailPropTypes

	static defaultProps = {
		restrictedView: false,
	}

	constructor(props) {
		super(props)
		this.state = { scrolledPastPoint: false }
	}

	componentDidMount() {
		window.addEventListener('scroll', this.onScroll)
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll)
	}

	onScroll = () => {
		const threshold = 295

		if (window.pageYOffset < threshold && this.state.scrolledPastPoint) {
			this.setState({ scrolledPastPoint: false })
		}
		if (window.pageYOffset >= threshold && !this.state.scrolledPastPoint) {
			this.setState({ scrolledPastPoint: true })
		}
	}

	get detailComponent() {
		switch (this.props.view) {
			case 'fineDineInDetail':
				return <FineDineInDetail {...this.props} scrolledPastPoint={this.state.scrolledPastPoint} />
			default:
				return <DefaultDetail {...this.props} scrolledPastPoint={this.state.scrolledPastPoint} />
		}
	}

	render() {
		const { menuRecipeDetailVisibilityChange } = this.props

		return (
			<div onClick={() => { menuRecipeDetailVisibilityChange(false) }}>
				<div className={css.container} onClick={(e) => { e.stopPropagation() }}>
					{this.detailComponent}
				</div>
			</div>
		)
	}
}

export default Detail
