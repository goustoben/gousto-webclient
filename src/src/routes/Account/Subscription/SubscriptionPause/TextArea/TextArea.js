import PropTypes from 'prop-types'
import React from 'react'

import { Button } from 'goustouicomponents'
import css from './TextArea.css'

const propTypes = {
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  minLengthValidationMessage: PropTypes.string,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
}

const defaultProps = {
  onSubmit: () => {},
  maxLength: 255,
  minLength: 1,
  minLengthValidationMessage: 'Please enter some information about why you\'d like to pause',
  placeholder: 'Enter other reason here',
}

class SubscriptionPauseTextArea extends React.PureComponent {
  state = {
    currentText: '',
    validationMessage: '',
  }

  shouldComponentUpdate() {
    const { disabled } = this.props

    return !disabled
  }

  handleChange = (ev) => {
    const { maxLength } = this.props
    if (ev.target.value.length < maxLength) {
      this.setState({
        currentText: ev.target.value,
        validationMessage: '',
      })
    } else {
      this.setState({
        currentText: ev.target.value.substring(0, maxLength),
        validationMessage: `Maximum length of ${maxLength} characters reached`,
      })
    }
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    const { minLength, minLengthValidationMessage, onSubmit } = this.props
    const { currentText } = this.state

    if (currentText.length < minLength) {
      this.setState({
        validationMessage: minLengthValidationMessage,
      })
    } else {
      onSubmit(currentText)
    }
  }

  render() {
    const { disabled, maxLength, placeholder } = this.props
    const { currentText, validationMessage } = this.state

    return (
      <div>
        <textarea
          className={css.textarea}
          disabled={disabled}
          maxLength={maxLength}
          onChange={this.handleChange}
          placeholder={placeholder}
          value={currentText}
        />

        {!!validationMessage.length
          && <small className={css.feedback}>{validationMessage}</small>}

        <div className={css.controls}>
          <Button onClick={this.handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    )
  }
}

SubscriptionPauseTextArea.propTypes = propTypes
SubscriptionPauseTextArea.defaultProps = defaultProps

export default SubscriptionPauseTextArea
