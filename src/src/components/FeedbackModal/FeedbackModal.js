import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { isNodeInRoot } from 'utils/DOMhelper'
import Svg from 'Svg'
import CloseButton from 'Overlay/CloseButton'
import { modalContent, confirmationContent } from './modalContent'
import css from './FeedbackModal.css'

class FeedbackModal extends PureComponent {
  state = {
    feedback: '',
    feedbackSent: false
  }

  componentDidMount() {
    const { shortlistFeedbackViewed } = this.props
    shortlistFeedbackViewed()
    document.addEventListener('mousedown', this.handleMouseClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleMouseClickOutside)
  }

  handleMouseClickOutside = (e) => {
    e.stopPropagation()
    if (!isNodeInRoot(e.target, this.shortlistFeedbackRef)) {
      this.dismissModal()
    }
  }

  changeFeedback = (e) => {
    const { value } = e.target
    this.setState({
      feedback: value
    })
  }

  dismissModal = () => {
    const { closeModal, shortlistFeedbackDismissTracking } = this.props
    shortlistFeedbackDismissTracking()
    closeModal()
  }

  sendFeedback = () => {
    const { shortlistFeedbackSubmit, shortlistFeedbackTestConsent, closeModal } = this.props
    const { feedback, feedbackSent } = this.state

    if (feedbackSent) {
      shortlistFeedbackTestConsent()
      closeModal()
    } else {
      shortlistFeedbackSubmit(feedback)
      this.setState((prevState) => ({
        ...prevState,
        feedbackSent: true
      }))
    }
  }

  setWrapperRef(node) {
    this.wrapperRef = node
  }

  getSubmitText = () => {
    const { feedbackSent } = this.state

    return feedbackSent ? 'Yes, that is fine' : 'Send feedback'
  }

  render() {
    const { feedback, feedbackSent } = this.state

    return (
      <div className={css.modalWrapper} ref={node => this.shortlistFeedbackRef = node}>
        <section>
          <div className={css.closeIcon}>
            <CloseButton onClose={this.dismissModal} />
          </div>
          <h1 className={css.modalTitle}>
            {feedbackSent ? confirmationContent.title : modalContent.title}
            <Svg fileName={'icon_shortlist_heart_selected'} className={css.heartIcon} />
          </h1>
          <p className={css.modalText}>{feedbackSent ? confirmationContent.text : modalContent.text}</p>
          {!feedbackSent && <textarea className={css.modalTextarea} placeholder={modalContent.placeholder} value={feedback} onChange={this.changeFeedback} />}
        </section>
        <button type="button" className={css.submitButton} disabled={feedback.length < 1 && !feedbackSent} onClick={() => this.sendFeedback()}>
          {this.getSubmitText()}
        </button>
        <button type="button" className={css.dismissButton} onClick={() => this.dismissModal()}>No thanks</button>
      </div >
    )
  }
}

FeedbackModal.propTypes = {
  shortlistFeedbackSubmit: PropTypes.func,
  shortlistFeedbackDismissTracking: PropTypes.func,
  closeModal: PropTypes.func,
  shortlistFeedbackViewed: PropTypes.func,
  shortlistFeedbackTestConsent: PropTypes.func
}

export { FeedbackModal }
