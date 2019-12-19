import PropTypes from 'prop-types'
import React from 'react'

import { Button } from 'goustouicomponents'
import css from './TextArea.css'

class SubscriptionPauseTextArea extends React.PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    maxLength: PropTypes.number,
    minLength: PropTypes.number,
    minLengthValidationMessage: PropTypes.string,
    onSubmit: PropTypes.func,
    placeholder: PropTypes.string,
  }

  static defaultProps = {
    onSubmit: () => {},
    maxLength: 255,
    minLength: 1,
    minLengthValidationMessage: 'Please enter some information about why you\'d like to pause',
    placeholder: 'Enter other reason here',
  }

  state = {
    currentText: '',
    validationMessage: '',
  }

  shouldComponentUpdate() {
    return !this.props.disabled
  }

  handleChange = (ev) => {
    if (ev.target.value.length < this.props.maxLength) {
      this.setState({
        currentText: ev.target.value,
        validationMessage: '',
      })
    } else {
      this.setState({
        currentText: ev.target.value.substring(0, this.props.maxLength),
        validationMessage: `Maximum length of ${this.props.maxLength} characters reached`,
      })
    }
  }

  handleSubmit = (ev) => {
    ev.preventDefault()

    if (this.state.currentText.length < this.props.minLength) {
      this.setState({
        validationMessage: this.props.minLengthValidationMessage,
      })
    } else {
      this.props.onSubmit(this.state.currentText)
    }
  }

  render() {
    return (
      <div>
        <textarea
          className={css.textarea}
          disabled={this.props.disabled}
          maxLength={this.props.maxLength}
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          value={this.state.currentText}
        />

        {!!this.state.validationMessage.length &&
          <small className={css.feedback}>{this.state.validationMessage}</small>
        }

        <div className={css.controls}>
          <Button onClick={this.handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    )
  }
}

export default SubscriptionPauseTextArea
