import { connect } from 'react-redux'

import { selectOrderIssue } from 'actions/getHelp'

import OrderIssue from './OrderIssue'

const mapStateToProps = (state) => ({
  content: {
    title: state.content.get('get-help_orderissues_pageheader_header')
    || 'Get help with your box',
    body: state.content.get('get-help_orderissues_pagecontent_copy')
    || 'What part of your order had an issue?',
    buttonCopy: state.content.get('get-help_orderissues_pagecontent_buttoncopy')
    || 'back',
    ingredientsItem: state.content.get('get-help_orderissues_pagecontent_ingredientsitem')
    || 'Ingredients (missing, damaged, etc)',
    recipeCardItem: state.content.get('get-help_orderissues_pagecontent_recipecarditem')
    || 'Recipe cards',
    deliveryItem: state.content.get('get-help_orderissues_pagecontent_deliveryitem')
    || 'Delivery',
    otherItem: state.content.get('get-help_orderissues_pagecontent_otheritem')
    || 'Other',
  }
})

const OrderIssueContainer = connect(mapStateToProps, {
  selectOrderIssue,
})(OrderIssue)

export default OrderIssueContainer
