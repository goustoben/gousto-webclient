import { connect } from 'react-redux'

import actionTypes from 'actions/actionTypes'
import userActions from 'actions/user'
import Unsubscribe from './Unsubscribe'

const mapStateToProps = (state) => ({
  error: state.error.get(actionTypes.UNSUBSCRIBED_USER, ''),
  pending: state.pending.get(actionTypes.UNSUBSCRIBED_USER, false),
  isUserUnsubscribed: state.user.get('unsubscribedFromEmail'),
  copy: {
    confirmHeader: state.content.get('unsubscribeHeaderUnsubscribeConfirmheader')
      || 'Is it really over? We\'ll miss you!',
    unsubscribedHeader: state.content.get('unsubscribeHeaderUnsubscribeUnsubscribedheader')
      || 'You have been successfully unsubscribed.',
    defaultError: state.content.get('unsubscribeBodyConfirmDefaulterror')
      || 'Sorry. An error occurred, please try again later.',
    body1: state.content.get('unsubscribeBodyConfirmBody1')
      || `To confirm you no longer want to receive any delicious marketing
      from Gousto click the unsubscribe button below.`,
    body2: state.content.get('unsubscribeBodyConfirmBody2')
      || '(We will still send you messages on orders)',
    link: state.content.get('unsubscribeBodyUnsubscribedLink')
      || 'Go to Gousto\'s website ',
    button: state.content.get('unsubscribeBodyConfirmButton')
      || 'Unsubscribe',
  },
})

const UnsubscribeContainer = connect(mapStateToProps, {
  userUnsubscribeAction: userActions.userUnsubscribe,
})(Unsubscribe)

export default UnsubscribeContainer
