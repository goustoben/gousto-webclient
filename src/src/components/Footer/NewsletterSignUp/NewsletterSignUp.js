import React from 'react'
import css from './NewsletterSignUp.css'
import { Button, Segment } from 'goustouicomponents'

class NewsletterSignUp extends React.Component {

	static state = {
	  email: null,
	}

	static propTypes = {
	  onSignup: React.PropTypes.func.isRequired,
	  signup: React.PropTypes.object.isRequired,
	}

	handleChange = (event) => {
	  this.setState({ email: event.target.value })
	}

	handleSubmit = (e) => {
	  e.preventDefault()
	  const input = this.refs.email
	  if (!this.props.signup.get('pending') && input && input.checkValidity()) {
	    this.props.onSignup(this.state.email)
	  } else {
	    if (!input) {
	      this.props.onSignup(this.state.email)
	    }
	  }
	}

	render = () => (
		<form className={css.form} name="newsletterSignupForm" onSubmit={this.handleSubmit} ref={(ref => { this.formDOMNode = ref })}>
			<div className={css.formGroup}>
				<div className={css.label}>
					<span className={css.tasty}>Tasty Newsletter:</span>
				</div>
				<div className={css.inputContainer}>
					<input type="email" name="email" className={css.email} placeholder="Enter email address" required autoComplete="off" onChange={this.handleChange} ref="email" />
				</div>
				<div className={css.buttonContainer}>
					<Button pending={this.props.signup.get('pending')}>
						<Segment onClick={this.handleSubmit}>
							<span className={css.mobileHide}>Sign Up</span>
							<span className={css.desktopHide}>OK</span>
						</Segment>
					</Button>
				</div>
			</div>
			<label className={css.success}>{this.props.signup.get('success') ? 'Thank you for signing up to the Gousto newsletter!' : ''}</label>
			<label className={css.error}>{this.props.signup.get('error')}</label>
		</form>
	)
}

export default NewsletterSignUp
