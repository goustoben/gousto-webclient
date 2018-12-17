import { connect } from 'react-redux'
import { isValid } from 'redux-form'
import actions from 'actions'
import actionTypes from 'actions/actionTypes'
import AboutYou from './AboutYou'

function mapStateToProps(sectionName) {
  return state => ({
    sectionName,
    loginOpen: state.loginVisibility,
    isAuthenticated: state.auth && state.auth.get('isAuthenticated'),
    loginPending: state.pending && state.pending.get(actionTypes.USER_LOGIN),
  })
}

function connectComponent(sectionName) {
  const AboutYouContainer = connect(mapStateToProps(sectionName), {
    loginVisibilityChange: actions.loginVisibilityChange,
    clearErrors: actions.checkoutClearErrors,
  })(AboutYou)

  return AboutYouContainer
}

export default sectionName => connectComponent(sectionName)

export function addInitialValues(Component, { sectionName }) {
  return connect(
    (state, ownProps) => {
      const formName = state.request.get('browser') === 'mobile' ? 'yourDetails' : 'aboutyou'
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
