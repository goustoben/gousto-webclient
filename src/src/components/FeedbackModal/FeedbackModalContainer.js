import { connect } from 'react-redux'
import { shortlistFeedbackDismissTracking, shortlistFeedbackSubmit, shortlistFeedbackViewed, shortlistFeedbackTestConsent } from 'actions/shortlist'
import { FeedbackModal } from './FeedbackModal'

const mapDispatchToProps = ({
  shortlistFeedbackDismissTracking,
  shortlistFeedbackSubmit,
  shortlistFeedbackViewed,
  shortlistFeedbackTestConsent
})

const FeedbackModalContainer = connect(null, mapDispatchToProps)(FeedbackModal)

export { FeedbackModalContainer }
