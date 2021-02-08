import { connect } from 'react-redux'
import { isValid } from 'redux-form'
import actions from 'actions'
import { actionTypes } from 'actions/actionTypes'
import { trackCheckoutButtonPressed } from 'actions/checkout'
import { trackUTMAndPromoCode } from 'actions/tracking'
import { getAboutYouFormName } from 'selectors/checkout'
import { getIsCheckoutOverhaulEnabled } from 'selectors/features'
import * as stateUtils from 'routes/Checkout/utils/state'
import { AboutYou } from './AboutYou'

function mapStateToProps(sectionName) {
  return state => ({
    sectionName,
    loginPending: state.pending && state.pending.get(actionTypes.USER_LOGIN),
    isCheckoutOverhaulEnabled: getIsCheckoutOverhaulEnabled(state),
    submitting: stateUtils.isSubmitting(state),
    createAccountValues: state.form.aboutyou && state.form.aboutyou.values.aboutyou,
  })
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

export default sectionName => connectComponent(sectionName)

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
            allowEmail: !getIsCheckoutOverhaulEnabled(state),
          },
        },
      }
    },
    mapDispatchToProps)(Component)
}
