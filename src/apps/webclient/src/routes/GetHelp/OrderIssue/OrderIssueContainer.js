import { connect } from 'react-redux'

import { selectOrderIssue } from 'actions/getHelp'
import { getUserId } from 'selectors/user'
import { getOrderId } from '../selectors/selectors'

import { OrderIssue } from './OrderIssue'

const mapStateToProps = (state) => ({
  content: {
    title: state.content.get('get-help_orderissues_pageheader_header')
    || 'Get help with your box',
    body: state.content.get('get-help_orderissues_pagecontent_copy')
    || 'What part of your order had an issue?',
    ingredientsItem: state.content.get('get-help_orderissues_pagecontent_ingredientsitem')
    || 'Ingredients (missing, damaged, wrong)',
    recipeCardItem: state.content.get('get-help_orderissues_pagecontent_recipecarditem')
    || 'Recipe cards',
    deliveryItem: state.content.get('get-help_orderissues_pagecontent_deliveryitem')
    || 'Delivery',
    otherItem: state.content.get('get-help_orderissues_pagecontent_otheritem')
    || 'Other',
  },
  orderId: getOrderId(state),
  userId: getUserId(state),
})

const OrderIssueContainer = connect(mapStateToProps, {
  selectOrderIssue,
})(OrderIssue)

export {
  OrderIssueContainer
}
