import { connect } from 'react-redux'

import { Ingredients } from './Ingredients.logic'

const mapStateToProps = (state) => ({
  order: state.getHelp.get('order').toJS(),
  recipes: state.getHelp.get('recipes').toJS(),
  user: {
    id: state.user.get('id'),
    accessToken: state.auth.get('accessToken'),
  },
  content: {
    title: state.content.get('get-help_contact_pageheader_header')
    || 'Get help with your box',
    body: state.content.get('get-help_contact_pagecontent_copy')
    || 'Which ingredient(s) had an issue? Select meal to see ingredients.',
    button1Copy: state.content.get('get-help_orderissues_pagecontent_button1copy')
    || 'back',
    button2Copy: state.content.get('get-help_orderissues_pagecontent_button2copy')
    || 'continue',
  }
})

const IngredientsContainer = connect(mapStateToProps)(Ingredients)

export {
  IngredientsContainer
}
