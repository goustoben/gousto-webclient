import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { isNodeInRoot } from 'utils/DOMhelper'
import Svg from 'Svg'
import CloseButton from 'Overlay/CloseButton'
import classnames from 'classnames'
import { modalContent } from './modalContent'
import css from './FeedbackModal.css'

class FeedbackModal extends PureComponent {
  state = {
    feedback: ''
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
    const { shortlistFeedbackSubmit, closeModal } = this.props
    const { feedback } = this.state
    shortlistFeedbackSubmit(feedback)
    closeModal()
  }

  setWrapperRef(node) {
    this.wrapperRef = node
  }

  render() {
    const { feedback } = this.state

    return (
      <div className={css.modalWrapper} ref={node => this.shortlistFeedbackRef = node}>
        <section>
          <div className={css.closeIcon}>
            <CloseButton onClose={this.dismissModal} />
          </div>
          <h1 className={css.modalTitle}>
            {modalContent.title}
            <Svg fileName={'icon_shortlist_heart_selected'} className={css.heartIcon} />
          </h1>
          <p className={css.modalText}>{modalContent.text}</p>
          <textarea className={css.modalTextarea} placeholder={modalContent.placeholder} value={feedback} onChange={this.changeFeedback} />
        </section>
        <button type="button" className={classnames(css.submitButton, { [css.submitButtonDisabled]: feedback.length < 1 })} disabled={feedback.length < 1} onClick={() => this.sendFeedback()}>
          {('send feedback').toUpperCase()}
        </button>
        <button type="button" className={css.dismissButton} onClick={() => this.dismissModal()}>{('no thanks').toUpperCase()}</button>
      </div >
    )
  }
}

FeedbackModal.propTypes = {
  shortlistFeedbackSubmit: PropTypes.func,
  shortlistFeedbackDismissTracking: PropTypes.func,
  closeModal: PropTypes.func,
  shortlistFeedbackViewed: PropTypes.func
}

export { FeedbackModal }
