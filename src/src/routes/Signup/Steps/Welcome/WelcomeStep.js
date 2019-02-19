import PropTypes from 'prop-types'
import React from 'react'
import Image from '../../Image'
import Button from "../../Button"
import css from '../../Signup.css'

const WelcomeStep = ({ next }) => (
	<span className={css.stepContainer} data-testing="signupWelcomeStep">
		<div className={css.fullWidth}>
			<div className={css.regularHeader}>
				<Image name="get-started" />
			</div>
			<div className={css.body}>
				<h1 className={css.heading}>Let's build your perfect recipe box.</h1>
				<p className={css.bodyText}>Just a few quick questions...</p>
			</div>
		</div>
		<div className={css.footer}>
			<div className={css.inputContainer}>
				<Button
				  data-testing="signupWelcomeStepCTA"
				  fill
				  onClick={next}
				  width="full"
				/>
			</div>
		</div>
	</span>
)

WelcomeStep.propTypes = {
  next: PropTypes.func,
  stepNumber: PropTypes.number.isRequired,
}

export default WelcomeStep
