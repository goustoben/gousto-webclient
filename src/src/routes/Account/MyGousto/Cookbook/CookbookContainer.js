import { connect } from 'react-redux'
import { Cookbook } from './Cookbook'
import { userLoadCookbookRecipes } from "actions/user/userLoadCookbookRecipes"

const mapStateToProps = state => ({
  orders: state.user.get('orders'),
  recipes: state.cookbookRecipes,
  loading: state.pending.get('COOKBOOK_RECIPES_RECEIVE', true)
})

export const CookbookContainer = connect(mapStateToProps, {
  userLoadCookbookRecipes
})(Cookbook)
