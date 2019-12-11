import { connect } from 'react-redux'
import {
  validateLatestOrder,
  validateSelectedIngredients,
  storeSelectedIngredients
} from 'actions/getHelp'
import { Ingredients } from './Ingredients.logic'

const mapStateToProps = (state) => {
  return {
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
      || 'Back',
      button2Copy: state.content.get('get-help_orderissues_pagecontent_button2copy')
      || 'Continue',
    }
  }
}

const IngredientsContainer = connect(mapStateToProps, {
  validateLatestOrder,
  storeSelectedIngredients,
  validateSelectedIngredients
})(Ingredients)

export {
  IngredientsContainer
}
