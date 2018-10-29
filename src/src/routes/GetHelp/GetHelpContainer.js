import { connect } from 'react-redux'

import { storeGetHelpOrderId } from 'actions/getHelp'
import userActions from 'actions/user'
import recipeActions from 'actions/recipes'

import GetHelp from './GetHelp'

const mapStateToProps = (state, ownProps) => ({
	location: ownProps.location,
	orders: state.user.get('orders').toJS(),
	recipes: state.recipes.toJS(),
})

const GetHelpContainer = connect(mapStateToProps, {
	storeGetHelpOrderId,
	userLoadOrder: userActions.userLoadOrder,
	recipesLoadRecipesById: recipeActions.recipesLoadRecipesById,
})(GetHelp)

export default GetHelpContainer
