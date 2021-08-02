import PropTypes from 'prop-types'
import React from 'react'

import { client as routes } from 'config/routes'
import { GetHelpLayout } from '../layouts/GetHelpLayout'
import { ItemLink } from '../components/ItemLink'
import { List } from '../components/List'

const trackClick = (selectOrderIssue, issue) => () => selectOrderIssue(issue)

const OrderIssue = ({
  content: {
    title,
    body,
    ingredientsItem,
    recipeCardItem,
    deliveryItem,
    otherItem,
  },
  selectOrderIssue,
  orderId,
  userId,
}) => (
  <GetHelpLayout title={title} body={body}>
    <List>
      <div data-testing="getHelpIssuesIngredient">
        <ItemLink
          label={ingredientsItem}
          trackClick={trackClick(selectOrderIssue, 'ingredients')}
          to={routes.getHelp.ingredients({ userId, orderId })}
          clientRouted
        />
      </div>
      <ItemLink
        label={recipeCardItem}
        trackClick={trackClick(selectOrderIssue, 'recipe_card')}
        to={routes.getHelp.recipeCards({ userId, orderId })}
        clientRouted
      />
      <div data-testing="getHelpIssuesDelivery">
        <ItemLink
          label={deliveryItem}
          trackClick={trackClick(selectOrderIssue, 'delivery')}
          to={routes.getHelp.delivery({userId, orderId})}
          clientRouted
        />
      </div>
      <ItemLink
        label={otherItem}
        trackClick={trackClick(selectOrderIssue, 'other')}
        to={routes.helpCentre}
        clientRouted={false}
      />
    </List>
  </GetHelpLayout>
)

OrderIssue.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    ingredientsItem: PropTypes.string.isRequired,
    recipeCardItem: PropTypes.string.isRequired,
    deliveryItem: PropTypes.string.isRequired,
    otherItem: PropTypes.string.isRequired,
  }).isRequired,
  orderId: PropTypes.string.isRequired,
  selectOrderIssue: PropTypes.func,
  userId: PropTypes.string.isRequired,
}

OrderIssue.defaultProps = {
  selectOrderIssue: () => {},
}

export {
  OrderIssue
}
