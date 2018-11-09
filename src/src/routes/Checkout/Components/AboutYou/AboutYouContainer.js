import { connect } from 'react-redux'
import { isValid } from 'redux-form'
import AboutYou from './AboutYou'
import actions from 'actions'
import actionTypes from 'actions/actionTypes'

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
      const { checkout } = state.form
      const initialValues = checkout && checkout.initial ? checkout.initial : {}

      return {
        checkoutValid: isValid('checkout')(state),
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
