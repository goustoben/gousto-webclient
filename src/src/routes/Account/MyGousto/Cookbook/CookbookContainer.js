import { connect } from 'react-redux'
import { userLoadRecipes } from 'actions/user'
import { Cookbook } from './Cookbook'

const mapStateToProps = state => ({
  orders: state.user.get('orders'),
  recipes: state.recipes,
  loading: state.pending.get('RECIPES_RECEIVE', true)
})

export const CookbookContainer = connect(mapStateToProps, {
  userLoadRecipes
})(Cookbook)
