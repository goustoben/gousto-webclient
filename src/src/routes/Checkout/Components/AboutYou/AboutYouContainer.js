import { connect } from 'react-redux'
import { isValid } from 'redux-form'
import actions from 'actions'
import { actionTypes } from 'actions/actionTypes'
import { trackCheckoutButtonPressed } from 'actions/checkout'
import { trackUTMAndPromoCode } from 'actions/tracking'
import { getAboutYouFormName } from 'selectors/checkout'
import { getIsCheckoutOverhaulEnabled, getIsPassStrengthEnabled } from 'selectors/features'
import * as stateUtils from 'routes/Checkout/utils/state'
import { AboutYou } from './AboutYou'

export function mapStateToProps(sectionName) {
  return state => {
    const formName = state.form.aboutyou || state.form.yourdetails

    return ({
      sectionName,
      loginPending: state.pending && state.pending.get(actionTypes.USER_LOGIN),
      isCheckoutOverhaulEnabled: getIsCheckoutOverhaulEnabled(state),
      submitting: stateUtils.isSubmitting(state),
      createAccountValues: state.form.aboutyou && state.form.aboutyou.values.aboutyou,
      isPassStrengthEnabled: getIsPassStrengthEnabled(state),
      passwordErrors: formName && formName.syncErrors && formName.syncErrors.aboutyou && formName.syncErrors.aboutyou.password,
      passwordValue: formName && formName.values.aboutyou && formName.values.aboutyou.password,
      isMobile: state.request.get('browser') === 'mobile',
    })
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
  userProspect: actions.userProspect,
  trackUTMAndPromoCode,
}

export const AboutYouContainer = sectionName => connectComponent(sectionName)

export function addInitialValues(Component, { sectionName }) {
  return connect(
    (state, ownProps) => {
      const formName = getAboutYouFormName(state)
      const aboutyou = state.form[formName]
      const initialValues = aboutyou && aboutyou.initial ? aboutyou.initial : {}

      return {
        checkoutValid: isValid(formName)(state),
        initialValues: {
          ...ownProps.initialValues,
          ...initialValues,
          [sectionName]: {
            title: 'miss',
            allowEmail: true,
          },
        },
      }
    },
    mapDispatchToProps)(Component)
}
