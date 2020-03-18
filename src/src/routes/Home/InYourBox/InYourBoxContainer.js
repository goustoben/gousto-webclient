import { connect } from 'react-redux'
import redirectAction from 'actions/redirect'
import { trackGetStarted } from 'actions/tracking'
import { InYourBox } from './InYourBox'

const InYourBoxContainer = connect(() => ({}), {
  redirect: redirectAction.redirect,
  trackGetStarted
})(InYourBox)

export { InYourBoxContainer }
