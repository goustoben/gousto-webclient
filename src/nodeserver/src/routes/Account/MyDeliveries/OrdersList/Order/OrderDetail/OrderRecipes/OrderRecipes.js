import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Immutable from 'immutable'

import Button from 'Button'
import Link from 'Link'
import routes from 'config/routes'
import Content from 'containers/Content'

import css from './OrderRecipes.css'
import OrderSideSwipe from './OrderSideSwipe/OrderSideSwipe'

const OrderRecipes = ({
	recipes,
	orderId,
	orderState,
	whenCutoff,
}) => (
	<div>
		<div className={`${css.header} ${css.hideInMobile}`}>
			<Content contentKeys="mydeliveriesOrderOrderrecipesTitle" >
				<span>Recipe box</span>
			</Content>
		</div>
		<OrderSideSwipe recipes={recipes} orderState={orderState} />
		{orderState === 'menu open' ?
			<div className={css.textRow}>
				<p className={css.subHeader}>
					<Content contentKeys="mydeliveriesOrderOrderrecipesMessage" >
						<span>You haven't chosen any recipes yet.</span>
					</Content>
				</p>
				<p>If you do not choose by <strong>{whenCutoff}</strong>, Gousto will send you a selection of recipes based on your subscription settings.</p>
			</div>
		: null}
		{['menu open', 'recipes chosen'].indexOf(orderState) > -1 ?
			<div className={css.buttonRow}>
				<Link to={`${routes.client.menu}/${orderId}`} clientRouted={false}>
					<Button color={orderState === 'recipes chosen' ? 'secondary' : 'primary'} noDecoration>
						{orderState === 'recipes chosen' ? 'Edit recipes' : 'Choose recipes'}
					</Button>
				</Link>
			</div>
		: null}
	</div>
)

OrderRecipes.propTypes = {
	recipes: ImmutablePropTypes.listOf(
		ImmutablePropTypes.contains({
			recipeImage: PropTypes.string,
			recipeTitle: PropTypes.string,
		})
	),
	orderId: PropTypes.string,
	orderState: PropTypes.string,
	whenCutoff: PropTypes.string,
}

OrderRecipes.defaultProps = {
	recipes: Immutable.List([]),
	orderId: '',
	orderState: '',
	whenCutoff: '',
}

export default OrderRecipes
