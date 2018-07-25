import { connect } from 'react-redux'
import redirectAction from 'actions/redirect'
import InYourBox from './InYourBox'

const InYourBoxContainer = connect(() => ({}), { redirect: redirectAction.redirect })(InYourBox)

export default InYourBoxContainer
