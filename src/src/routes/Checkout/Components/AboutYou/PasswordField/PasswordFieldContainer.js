import { connect } from 'react-redux'
import { validatePassword } from 'actions/checkout'
import { getPasswordValue } from 'selectors/checkout'
import { PasswordField } from './PasswordField'

function mapStateToProps() {
  return (state) => ({
    passwordErrors: state.checkout.getIn(['passwordInfo', 'errorCodes']),
    passwordValue: getPasswordValue(state),
  })
}

const mapDispatchToProps = {
  validatePassword,
}

const PasswordFieldContainer = connect(mapStateToProps(), mapDispatchToProps)(PasswordField)

export { PasswordFieldContainer }
