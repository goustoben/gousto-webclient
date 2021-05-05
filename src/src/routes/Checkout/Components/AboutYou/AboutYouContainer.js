import { connect } from 'react-redux'
import { isValid } from 'redux-form'
import actions from 'actions'
import { actionTypes } from 'actions/actionTypes'
import { trackCheckoutButtonPressed } from 'actions/checkout'
import { trackUTMAndPromoCode } from 'actions/tracking'
import { accountFormName } from 'selectors/checkout'
import { getIsPassStrengthEnabled } from 'selectors/features'
import * as stateUtils from 'routes/Checkout/utils/state'
import { AboutYou } from './AboutYou'

export function mapStateToProps(sectionName) {
  return (state) => {
    const formName = state.form.account

    return {
      sectionName,
      loginPending: state.pending && state.pending.get(actionTypes.USER_LOGIN),
      submitting: stateUtils.isSubmitting(state),
      isPassStrengthEnabled: getIsPassStrengthEnabled(state),
      passwordErrors:
        formName &&
        formName.syncErrors &&
        formName.syncErrors.account &&
        formName.syncErrors.account.password,
      passwordValue: formName && formName.values.account && formName.values.account.password,
      isMobile: state.request.get('browser') === 'mobile',
    }
  }
}

function connectComponent(sectionName) {
  return connect(mapStateToProps(sectionName), {
    clearErrors: actions.checkoutClearErrors,
    trackCheckoutButtonPressed,
    trackUTMAndPromoCode,
  })(AboutYou)
}

const mapDispatchToProps = {
  trackUTMAndPromoCode,
}

export const AboutYouContainer = (sectionName) => connectComponent(sectionName)

export function addInitialValues(Component, { sectionName }) {
  return connect((state, ownProps) => {
    const account = state.form[accountFormName]
    const initialValues = account && account.initial ? account.initial : {}

    return {
      checkoutValid: isValid(accountFormName)(state),
      initialValues: {
        ...ownProps.initialValues,
        ...initialValues,
        [sectionName]: {
          allowEmail: true,
        },
      },
    }
  }, mapDispatchToProps)(Component)
}
