import { connect } from 'react-redux'

import { IngredientIssues } from './IngredientIssues.logic'

const mapStateToProps = (state) => ({
  content: {
    title: state.content.get('get-help_ingredientissues_pageheader_header')
    || 'Get help with your box',
    body: state.content.get('get-help_ingredientissues_pagecontent_copy')
    || 'Please let us know what was wrong with the ingredient(s)',
    button1Copy: state.content.get('get-help_ingredientissues_pagecontent_button1copy')
    || 'back',
    button2Copy: state.content.get('get-help_ingredientissues_pagecontent_button2copy')
    || 'submit details',
  }
})

const IngredientIssuesContainer = connect(mapStateToProps)(IngredientIssues)

export {
  IngredientIssuesContainer
}
