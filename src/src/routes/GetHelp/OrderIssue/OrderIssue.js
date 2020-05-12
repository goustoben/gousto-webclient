import PropTypes from 'prop-types'
import React from 'react'

import BottomBar from 'BottomBar'
import { client as routes, zendesk as zendeskRoutes } from 'config/routes'
import { addUserIdToUrl } from 'utils/url'
import GetHelpLayout from 'layouts/GetHelpLayout'
import { ItemLink } from '../components/ItemLink'
import { List } from '../components/List'
import { BottomButton } from '../components/BottomButton'

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
  selectOrderIssue,
  userId,
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
        to={`${routes.getHelp.index}/${routes.getHelp.recipeCards}`}
        clientRouted
      />
      <ItemLink
        label={deliveryItem}
        trackClick={trackClick(selectOrderIssue, 'delivery')}
        to={`${routes.getHelp.index}/${routes.getHelp.delivery}`}
        clientRouted
      />
      <ItemLink
        label={otherItem}
        trackClick={trackClick(selectOrderIssue, 'other')}
        to={addUserIdToUrl(zendeskRoutes.faqs, userId)}
        clientRouted={false}
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
  userId: PropTypes.string.isRequired,
}

OrderIssue.defaultProps = {
  selectOrderIssue: () => {},
}

export {
  OrderIssue
}
