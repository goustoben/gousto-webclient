import PropTypes from 'prop-types'
import React from 'react'
import { Button, Segment } from 'goustouicomponents'
import css from './NewsletterSignUp.css'

const propTypes = {
  onSignup: PropTypes.func.isRequired,
  signup: PropTypes.object.isRequired,
}

class NewsletterSignUp extends React.Component {
  static state = {
    email: null,
  }

  handleChange = (event) => {
    this.setState({ email: event.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const input = this.refs.email
    const { signup, onSignup } = this.props
    const { email } = this.state
    if (!signup.get('pending') && input && input.checkValidity()) {
      onSignup(email)
    } else if (!input) {
      onSignup(email)
    }
  }

  render = () => {
    const { signup } = this.props

    return (
      <form className={css.form} name="newsletterSignupForm" onSubmit={this.handleSubmit} ref={(ref => { this.formDOMNode = ref })}>
        <div className={css.formGroup}>
          <div className={css.label}>
            <span className={css.tasty}>Tasty Newsletter:</span>
          </div>
          <div className={css.inputContainer}>
            <input type="email" name="email" className={css.email} placeholder="Enter email address" required autoComplete="off" onChange={this.handleChange} ref="email" />
          </div>
          <div className={css.buttonContainer}>
            <Button pending={signup.get('pending')}>
              <Segment onClick={this.handleSubmit}>
                <span className={css.mobileHide}>Sign Up</span>
                <span className={css.desktopHide}>OK</span>
              </Segment>
            </Button>
          </div>
        </div>
        <label className={css.success}>{signup.get('success') ? 'Thank you for signing up to the Gousto newsletter!' : ''}</label>
        <label className={css.error}>{signup.get('error')}</label>
      </form>
    )
  }
}

NewsletterSignUp.propTypes = propTypes

export default NewsletterSignUp
