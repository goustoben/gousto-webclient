import React, { PropTypes } from 'react'
import Immutable from 'immutable' /* eslint-disable new-cap */
import PureRenderMixin from 'react-addons-pure-render-mixin'
import CategoryItem from './CategoryItem'

const CategoryList = React.createClass({
	propTypes: {
		categories: PropTypes.instanceOf(Immutable.Map).isRequired,
		onCategoryChange: PropTypes.func,
		productCount: PropTypes.instanceOf(Immutable.Map).isRequired,
		selectedCategory: PropTypes.string,
	},

	mixins: [PureRenderMixin],

	componentWillReceiveProps(nextProps) {
		if (nextProps.productCount.count() > 1) {
			nextProps.categories.every(category => {
				const id = category.get('id')

				// if no category has been selected or if selected category has no stock
				if (!nextProps.selectedCategory ||
					(id === nextProps.selectedCategory && nextProps.productCount.get(id, 0) === 0)) {
					const firstDisplayedCategoryId = this.getFirstCategoryWithStock(nextProps.categories, nextProps.productCount).get('id', 0)
					this.props.onCategoryChange(firstDisplayedCategoryId)

					return false
				}

				return true
			})
		}
	},

	getFirstCategoryWithStock(categories, productsStock) {
		let firstCategoryWithStock = Immutable.Map()

		categories.every(category => {
			const id = category.get('id')

			if (productsStock.get(id, 0) > 0) {
				firstCategoryWithStock = category

				return false
			}

			return true
		})

		return firstCategoryWithStock
	},

	getItems(view) {
		const categoryItems = []

		this.props.categories.forEach(category => {
			const id = category.get('id')

			if (this.props.productCount.get(id, 0) > 0) {
				let selected = false

				if (id === this.props.selectedCategory) {
					selected = true
				}
				const relationships = category.get('relationships')
				if (relationships && relationships.parent_id == null) {
					categoryItems.push(
						<CategoryItem
							key={id}
							{...category.toObject()}
							selected={selected}
							onCategoryChange={this.handleChange}
							view={view}
						/>
					)
				}
			}
		})

		return categoryItems
	},

	handleChange(id) {
		this.props.onCategoryChange(id)
	},

	handleSelectChange(e) {
		this.handleChange(e.target.value)
	},

	render() {
		return (
			<div>
				<ul className="category-list mobile-hide">
					{this.getItems('desktop')}
				</ul>
				<select
					onChange={this.handleSelectChange}
					value={this.props.selectedCategory}
					className="category-list--mobile desktop-hide"
				>
					{this.getItems('mobile')}
				</select>
			</div>

		)
	},
})

module.exports = CategoryList
