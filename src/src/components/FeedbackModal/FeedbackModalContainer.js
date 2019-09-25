import { connect } from 'react-redux'
import { shortlistFeedbackDismissTracking, shortlistFeedbackSubmit, shortlistFeedbackViewed } from 'actions/shortlist'
import { FeedbackModal } from './FeedbackModal'

const mapDispatchToProps = ({
  shortlistFeedbackDismissTracking,
  shortlistFeedbackSubmit,
  shortlistFeedbackViewed
})

const FeedbackModalContainer = connect(null, mapDispatchToProps)(FeedbackModal)

export { FeedbackModalContainer }
