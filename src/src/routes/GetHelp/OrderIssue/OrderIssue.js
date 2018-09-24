import React, { PropTypes } from 'react'

import List from '../components/List'
import Item from '../components/Item'
import ItemLink from '../components/ItemLink'
import BottomBar from 'BottomBar'
import BottomButton from '../components/BottomButton'

import { client as routes } from 'config/routes'
import GetHelpLayout from 'layouts/GetHelpLayout'

const trackClick = (selectOrderIssue, issue) => () => selectOrderIssue(issue)

const OrderIssue = ({
	content: {
		title,
		body,
		buttonCopy,
		ingredientsItem,
		recipeCardItem,
		deliveryItem,
		otherItem,
	},
	selectOrderIssue
}) => (
	<GetHelpLayout title={title} body={body}>
		<List>
			<Item trackClick={trackClick(selectOrderIssue, 'ingredients')}>
				<ItemLink
					label={ingredientsItem}
					to="/get-help/contact"
					clientRouted
				/>
			</Item>
			<Item trackClick={trackClick(selectOrderIssue, 'recipe_card')}>
				<ItemLink
					label={recipeCardItem}
					to="/get-help/contact"
					clientRouted
				/>
			</Item>
			<Item trackClick={trackClick(selectOrderIssue, 'delivery')}>
				<ItemLink
					label={deliveryItem}
					to="/get-help/contact"
					clientRouted
				/>
			</Item>
			<Item trackClick={trackClick(selectOrderIssue, 'other')}>
				<ItemLink
					label={otherItem}
					to="/get-help/contact"
					clientRouted
				/>
			</Item>
		</List>
		<BottomBar>
			<BottomButton color="secondary" url={routes.myGousto} clientRouted={false}>
				{buttonCopy}
			</BottomButton>
		</BottomBar>
	</GetHelpLayout>
)

OrderIssue.propTypes = {
	content: PropTypes.shape({
		title: PropTypes.string.isRequired,
		body: PropTypes.string.isRequired,
		buttonCopy: PropTypes.string.isRequired,
		ingredientsItem: PropTypes.string.isRequired,
		recipeCardItem: PropTypes.string.isRequired,
		deliveryItem: PropTypes.string.isRequired,
		otherItem: PropTypes.string.isRequired,
	}).isRequired,
	selectOrderIssue: PropTypes.func,
}

OrderIssue.defaultProps = {
	selectOrderIssue: () => {},
}

export default OrderIssue
