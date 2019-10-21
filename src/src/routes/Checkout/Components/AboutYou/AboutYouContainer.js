import { connect } from 'react-redux'
import { isValid } from 'redux-form'
import actions from 'actions'
import actionTypes from 'actions/actionTypes'
import { trackCheckoutButtonPressed } from 'actions/checkout'
import { getAboutYouFormName } from 'selectors/checkout'
import AboutYou from './AboutYou'

function mapStateToProps(sectionName) {
  return state => ({
    sectionName,
    loginOpen: state.loginVisibility,
    isAuthenticated: state.auth && state.auth.get('isAuthenticated'),
    loginPending: state.pending && state.pending.get(actionTypes.USER_LOGIN),
    isMobile: state.request.get('browser') === 'mobile'
  })
}

function connectComponent(sectionName) {
  const AboutYouContainer = connect(mapStateToProps(sectionName), {
    loginVisibilityChange: actions.loginVisibilityChange,
    clearErrors: actions.checkoutClearErrors,
    trackCheckoutButtonPressed,
  })(AboutYou)

  return AboutYouContainer
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
            allowEmail: true,
            allowThirdPartyEmail: false,
          },
        },
      }
    }
    , { userProspect: actions.userProspect })(Component)
}
