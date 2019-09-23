import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Svg from 'Svg'
import CloseButton from 'Overlay/CloseButton'
import classnames from 'classnames'
import { modalContent } from './modalContent'
import css from './FeedbackModal.css'

class FeedbackModal extends PureComponent {
  state = {
    feedback: ''
  }

  changeFeedback = (e) => {
    const { value } = e.target
    this.setState({
      feedback: value
    })
  }

  render() {
    const { onSubmit, dismissModal } = this.props
    const { feedback } = this.state

    return (
      <div className={css.modalWrapper}>
        <section>
          <div className={css.closeIcon}>
            <CloseButton onClose={dismissModal} />
          </div>
          <h1 className={css.modalTitle}>
            {modalContent.title}
            <Svg fileName={'icon_shortlist_heart_selected'} className={css.heartIcon} />
          </h1>
          <p className={css.modalText}>{modalContent.text}</p>
          <textarea className={css.modalTextarea} placeholder={modalContent.placeholder} value={feedback} onChange={this.changeFeedback} />
        </section>
        <button type="button" className={classnames(css.submitButton, { [css.submitButtonDisabled]: feedback.length < 1 })} disabled={feedback.length < 1} onClick={() => onSubmit()}>
          SEND FEEDBACK
        </button>
        <button type="button" className={css.dismissButton} onClick={() => dismissModal()}>NO THANKS</button>
      </div >
    )
  }
}

FeedbackModal.propTypes = {
  onSubmit: PropTypes.func,
  dismissModal: PropTypes.func
}

export { FeedbackModal }
