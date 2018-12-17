import { connect } from 'react-redux'
import { IngredientReasons } from './IngredientReasons.logic'

const mapStateToProps = (state) => {
  return {
    content: {
      title: state.content.get('get-help_ingredientreasons_pageheader_header')
      || 'Get help with your box',
      body: state.content.get('get-help_ingredientreasons_pagecontent_copy')
      || 'Please tell us a bit more about your problem ingredients.',
      secondBody: state.content.get('get-help_ingredientreasons_pagecontent_aftercopy')
      || 'For example, please tell us how the damage ocurred, or the specific issue with the quality.',
      button1Copy: state.content.get('get-help_ingredientreasons_pagecontent_button1copy')
      || 'back',
      button2Copy: state.content.get('get-help_ingredientreasons_pagecontent_button2copy')
      || 'submit details',
    },
    ingredientsAndIssues: state.getHelp.get('selectedIngredients').toJS(),
  }
}

const IngredientReasonsContainer = connect(mapStateToProps)(IngredientReasons)

export {
  IngredientReasonsContainer
}
