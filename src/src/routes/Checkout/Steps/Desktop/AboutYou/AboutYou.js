import React, { PropTypes } from 'react'

import userRules from 'validations/user'
import userAsyncValidation from 'validations/userAsync'
import { addPrefix } from 'validations/util'
import formContainer from '../../../Components/formContainer'

import CheckoutButton from '../../../Components/CheckoutButton'

import AboutYouContainer, { addInitialValues } from '../../../Components/AboutYou'

const sectionName = 'aboutyou'

const AboutYouSection = AboutYouContainer(sectionName)

const AboutYouStep = ({ submit, userProspect, nextStepName, receiveRef, checkoutValid }) => {
  const handleSubmit = () => {
    if (checkoutValid) {
      userProspect()
    }
    submit()
  }

  return (
		<div>
			<AboutYouSection receiveRef={receiveRef} />
			<CheckoutButton
			  onClick={handleSubmit}
			  stepName={`next: ${nextStepName}`}
			/>
		</div>
  )
}

AboutYouStep.propTypes = {
  submit: PropTypes.func.isRequired,
  userProspect: PropTypes.func,
  receiveRef: PropTypes.func,
  nextStepName: PropTypes.string,
  checkoutValid: PropTypes.bool,
}

AboutYouStep.defaultProps = {
  userProspect: () => {},
  checkoutValid: false,
}

const AboutYouForm = formContainer(AboutYouStep, addPrefix(sectionName, userRules), sectionName, {}, {}, userAsyncValidation, ['aboutyou.password']) // eslint-disable-line import/no-mutable-exports

export default addInitialValues(AboutYouForm, { sectionName })
