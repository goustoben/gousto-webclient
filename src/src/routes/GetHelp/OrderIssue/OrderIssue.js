import React, { PropTypes } from 'react'

import ItemLink from '../components/ItemLink'
import BottomBar from 'BottomBar'
import { List } from '../components/List'
import { BottomButton } from '../components/BottomButton'

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
			<ItemLink
				label={ingredientsItem}
				trackClick={trackClick(selectOrderIssue, 'ingredients')}
				to={`${routes.getHelp.index}/${routes.getHelp.ingredients}`}
				clientRouted
			/>
			<ItemLink
				label={recipeCardItem}
				trackClick={trackClick(selectOrderIssue, 'recipe_card')}
				to={`${routes.getHelp.index}/${routes.getHelp.contact}`}
				clientRouted
			/>
			<ItemLink
				label={deliveryItem}
				trackClick={trackClick(selectOrderIssue, 'delivery')}
				to={`${routes.getHelp.index}/${routes.getHelp.contact}`}
				clientRouted
			/>
			<ItemLink
				label={otherItem}
				trackClick={trackClick(selectOrderIssue, 'other')}
				to={`${routes.getHelp.index}/${routes.getHelp.contact}`}
				clientRouted
			/>
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
