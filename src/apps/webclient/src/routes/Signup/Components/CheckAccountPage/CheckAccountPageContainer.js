import { connect } from 'react-redux'
import {
  signupCheckAccountGoToBoxPrices,
  signupCheckAccountLogin,
} from 'routes/Signup/signupActions'
import { getIsAuthenticated } from 'selectors/auth'
import { redirect } from 'actions/redirect'
import { CheckAccountPage } from './CheckAccountPage'

const mapStateToProps = (state) => ({
  isAuthenticated: getIsAuthenticated(state),
})

const mapDispatchToProps = {
  signupCheckAccountGoToBoxPrices,
  signupCheckAccountLogin,
  redirect,
}

export const CheckAccountPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckAccountPage)
