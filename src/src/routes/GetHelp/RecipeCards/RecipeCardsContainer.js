import { connect } from 'react-redux'
import { getRecipesForGetHelp } from 'selectors/getHelp'
import { trackRecipeCardClick } from 'actions/getHelp'
import { RecipeCards } from './RecipeCards.logic'

const mapStateToProps = (state) => ({
  recipes: getRecipesForGetHelp(state),
  title: state.content.get('get-help_contact_pageheader_header')
    || 'Get help with your box',
})

const RecipeCardsContainer = connect(mapStateToProps, {
  trackRecipeCardClick,
})(RecipeCards)

export {
  RecipeCardsContainer
}
