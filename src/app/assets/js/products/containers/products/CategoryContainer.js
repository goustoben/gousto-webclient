'use strict';

var React = require('react');
var ReactRedux = require('react-redux');
const PureRenderMixin = require('react-addons-pure-render-mixin');

var Actions = require('../../actions');

var CategoryList = require('../../components/category/CategoryList');

var CategoryContainer = React.createClass({
	mixins: [PureRenderMixin],

	render: function() {
		return (
			<CategoryList
				categories={this.props.categories}
				productCount={this.props.productCount}
				selectedCategory={this.props.selectedCategoryId}
				onCategoryChange={this.props.selectCategory}
			/>
		);
	}

});

const mapStateToProps = (state) => {
	return {
		categories: state.categories,
		productCount: state.productCount,
		selectedCategoryId: state.selectedCategoryId
	}
}

module.exports = ReactRedux.connect(
	mapStateToProps,
	Actions
)(CategoryContainer);
