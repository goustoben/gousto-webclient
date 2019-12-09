import { connect } from 'react-redux'
import { RecipeCards } from './RecipeCards.logic'

const mapStateToProps = (state) => {
  return {
    recipes: state.getHelp.get('recipes').toJS(),
    title: state.content.get('get-help_contact_pageheader_header')
    || 'Get help with your box',
  }
}

const RecipeCardsContainer = connect(mapStateToProps)(RecipeCards)

export {
  RecipeCardsContainer
}
