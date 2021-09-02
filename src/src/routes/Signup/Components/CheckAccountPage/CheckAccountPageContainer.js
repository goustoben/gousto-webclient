import { connect } from 'react-redux'
import {
  signupCheckAccountGoToBoxPrices,
  signupCheckAccountLogin,
} from 'routes/Signup/signupActions'
import { CheckAccountPage } from './CheckAccountPage'

const mapDispatchToProps = {
  signupCheckAccountGoToBoxPrices,
  signupCheckAccountLogin,
}

export const CheckAccountPageContainer = connect(null, mapDispatchToProps)(CheckAccountPage)
