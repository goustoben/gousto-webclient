import { connect } from 'react-redux'
import { isValid } from 'redux-form'
import { userProspect } from 'actions/user'
import { actionTypes } from 'actions/actionTypes'
import { trackCheckoutButtonPressed, validatePassword, checkoutClearErrors } from 'actions/checkout'
import { trackUTMAndPromoCode } from 'actions/tracking'
import { getIsGoustoOnDemandEnabled } from 'selectors/features'
import { accountFormName, getPasswordValue } from 'selectors/checkout'
import * as stateUtils from 'routes/Checkout/utils/state'
import { AboutYou } from './AboutYou'

export function mapStateToProps(sectionName) {
  return (state) => ({
    sectionName,
    loginPending: state.pending && state.pending.get(actionTypes.USER_LOGIN),
    submitting: stateUtils.isSubmitting(state),
    passwordErrors: state.checkout.getIn(['passwordInfo', 'errorCodes']),
    passwordValue: getPasswordValue(state),
    isMobile: state.request.get('browser') === 'mobile',
    isGoustoOnDemandEnabled: getIsGoustoOnDemandEnabled(state),
  })
}

function connectComponent(sectionName) {
  return connect(mapStateToProps(sectionName), {
    clearErrors: checkoutClearErrors,
    trackCheckoutButtonPressed,
    trackUTMAndPromoCode,
    validatePassword,
    userProspect,
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
